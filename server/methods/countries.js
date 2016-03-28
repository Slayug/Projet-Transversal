var apiCall = function (apiUrl, callback) {
	// try…catch allows you to handle errors
	try {
		var response = Meteor.http.call("GET", apiUrl).data;
		// A successful API call returns no error
		// but the contents from the JSON response
		callback(null, response);
	} catch (error) {
		// If the API responded with an error message and a payload
		if (error.response) {
			var errorCode = error.response.data.code;
			var errorMessage = error.response.data.message;
			// Otherwise use a generic error message
		} else {
			var errorCode = 500;
			var errorMessage = 'Cannot access the API';
		}
		// Create an Error object and return it via callback
		var myError = new Meteor.Error(errorCode, errorMessage);
		callback(myError, null);
	}
}
/**
*   retourne vrai si la list
*   contient un element plus grand
*   la liste est contient des CountryDistance
**/
function hasBiggerElement( list, elem){
    for(var l = 0; l < list.length; l++){
        if( list[l].distance > elem){
            return true;
        }
    }
    if(list.length == 0){
        return true;
    }
    return false;
}
/**
*   represent a distance with a country
**/
var CountryDistance = function( codeCountry, distance ){
    this.code = codeCountry;
    this.distance = distance;
}
/**
* parse and insert every country founded
**/
function parseJsonCountries(jsonFR, jsonEN){
    for(var key in jsonFR){
        for(var inKey in jsonFR[key]){
	        var _id_country = jsonFR[key][inKey]["id"];
            var _code = jsonFR[key][inKey]["iso2Code"];
			//value necessary for autocomplete
			var _value = jsonFR[key][inKey]["name"];
            var _name_fr = jsonFR[key][inKey]["name"];
            var _name_en = jsonEN[key][inKey]["name"];
            var _capital_fr = jsonFR[key][inKey]["capitalCity"];
            var _capital_en = jsonEN[key][inKey]["capitalCity"];
            var _longitude = jsonFR[key][inKey]["longitude"];
            var _latitude = jsonFR[key][inKey]["latitude"];
            var _region_id = -1;
            var _region_name_fr = "";
            var _region_name_en = "";
            var _income_level_id = "";
            if(jsonFR[key][inKey]["region"] != undefined){
                _region_id = jsonFR[key][inKey]["region"]["id"];
                _region_name_fr = jsonFR[key][inKey]["region"]["value"];
                _region_name_en = jsonEN[key][inKey]["region"]["value"];
            }
            if(jsonFR[key][inKey]["incomeLevel"] != undefined){
                _income_level_id = jsonFR[key][inKey]["incomeLevel"]["id"];
            }
            Countries.insert({
							id: _id_country,
                            code: _code,
							value: _value,
                            name_fr: _name_fr,
                            name_en: _name_en,
                            capital_fr: _capital_fr,
                            capital_en: _capital_en,
                            longitude: _longitude,
                            latitude: _latitude,
                            region_name_fr: _region_name_fr,
                            region_name_en: _region_name_en,
                            region_id: _region_id,
                            income_level_id: _income_level_id});
        }
    }
}

Meteor.methods({
	'importFromWorldBank': function(){
		var urlFR = "http://api.worldbank.org/fr/country?per_page=300&format=json";
		var urlEN = "http://api.worldbank.org/en/country?per_page=300&format=json";

		var jsonFR = Meteor.wrapAsync(apiCall)(urlFR);
		var jsonEN = Meteor.wrapAsync(apiCall)(urlEN);

		parseJsonCountries(jsonFR, jsonEN);
	},
    /**
    *   calculate all similiraty for each
    *   countries, for each indicators
    *   countries and indicators must be implemented
    **/
    'calculateSimilarity': function(){
        //load indicators
        var indicators = Indicators.find().fetch();
        //load countries
        var countries = Countries.find();

        //seulement si on a un seul indice
        //et un seul pays
        for(var i = 0; i < indicators.length; i++){
            //selection de l'indice concerné
            //moindresCarrees pour les pays selectionnés
            //l'indice sera le code du pays
            var indicator = indicators[i];
            var listMoindresCarrees = [];
            var current = i + 1;
            console.log("============> "+current+"/"+indicators.length);
            console.log("============> "+indicators[i].code);
            for(var countryCode in indicator.countries){
                if(indicator.countries[ countryCode ].similarities != undefined){
                    if(indicator.countries[ countryCode ].similarities.length > 0){
                        //continue;
                    }
                }
                var countryYears = indicator.countries[ countryCode ].years;
                var pointsByCountry = [];
                //on parcours les années pour determiner l'ensemble
                //de point qui servira aux moindres carrees
                for( var year in countryYears ){
                    //x: year
                    //y: value pour l'année
                    pointsByCountry.push( new Point( parseInt( year ), arrondi( countryYears[ year ], 6 ) ) );
                }
                if(pointsByCountry.length > 1){
                    listMoindresCarrees[countryCode] = moindresCarrees( pointsByCountry );
                }
            }
            //on calcul la distance euclidienne entre chaque pays
            //et si un pays a une distance plus petit on l'ajoute
            for(var firstCountryCode in indicator.countries){
                var similarList = [];
                var countryYears = indicator.countries[ firstCountryCode ].years;
                var firstCarrees = listMoindresCarrees[ firstCountryCode ];
                for(var secondCountryCode in indicator.countries){
                    //pour chaque année
                    //pour ensuite faire la moyenne
                    var secondCarrees = listMoindresCarrees[ secondCountryCode ];
                    var distanceByYear = [];
                    for( var year in countryYears ){
                        if(secondCarrees != undefined &&
                            firstCarrees != undefined){
                            var distanceEuc = distanceEuclidienne( new Point(year, firstCarrees.a * parseInt( year ) + firstCarrees.b),
                                                    new Point(year, secondCarrees.a * parseInt( year ) + secondCarrees.b ) );
                            distanceByYear.push( distanceEuc );
                        }
                    }
                    if(distanceByYear.length == 0){
                        continue;
                    }
                    var otherDistance = moyenne( distanceByYear );
                    //si la nouvelle distance est plus petite
                    if( hasBiggerElement( similarList, otherDistance ) ){
                        similarList.push( new CountryDistance( secondCountryCode, otherDistance ) );
                        //si la liste a plus de 5 element on enlève le plus grand
                        if(similarList.length > 5){
                            var indexOfBigger = 0;
                            for(var b = 1; b < similarList.length; b++){
                                if(similarList[b].distance > similarList[indexOfBigger].distance){
                                    indexOfBigger = b;
                                }
                            }
                            similarList.splice(indexOfBigger, 1);
                        }
                    }
                }
                //on sort la list
                var tmpDistance = [];
                for(var t = 0; t < similarList.length; t++){
                    tmpDistance.push( similarList[t].distance );
                }
                //on tri en croissant
                triRapide(tmpDistance, 0, tmpDistance.length - 1);
                //on fait la correspondance avec les codes pays
                var saveList = [];
                //console.log(tmpDistance.join(', '));
                for(var t = 0; t < tmpDistance.length; t++){
                    for(var s = 0; s < similarList.length; s++){
                        if(similarList[s].distance == tmpDistance[t]){
                            //on ajoute
                            saveList.push( similarList[s].code );
                            //console.log(similarList[s].code+ ' : '+similarList[s].distance);
                            //on supprime de l'ancienne liste
                            similarList.splice(s, 1);
                            break;
                        }
                    }
                }
                //console.log("=============================");
                //on save seulement les codes
                indicator.countries[ firstCountryCode ].similarities = saveList;
                //on save en bd les 5 pays les plus cohérents
                Indicators.update(indicator._id, {
                    $set: {countries: indicator.countries }
                });
                //console.log('update similarities for '+indicator.code+' '+indicator.countries[ firstCountryCode ].name);
            }

        }
        console.log('DONE: calculate similarities..');
    }
});
