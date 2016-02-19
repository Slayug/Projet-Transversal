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
var Indicator = function(name, code){
	this.name = name;
	this.countries = {};
	this.code = code;
	this.type = "";
	this.addCountry = function(country, code){
		if(country instanceof Country){
			this.countries[code] = country;
		}else{
			console.log("error instanceof");
		}
	}
	this.hasCountry = function(code){
		if(this.countries[code] == undefined){
			return false;
		}
		return true;
	}
}

var Country = function(name){
	//this.code = code;
	this.name = name;
	this.years = {};
	this.addYear = function(year, value){
		this.years[year] = value;
	}
}

function parseJson(json, myOwnIndicator){
	for(var key in json){
		for(var inKey in json[key]){
			if(myOwnIndicator == undefined){
				var indicator = json[key][inKey]['indicator'];
				if(indicator != undefined){
					myOwnIndicator = new Indicator(indicator.value, indicator.id);
				}
			}

			var country = json[key][inKey]['country'];
			if(country != undefined){
				var myOwnCountry = new Country(country.value);
				if(!myOwnIndicator.hasCountry(country.id)){
					//on ajoute le pays qui n'a pas encore été ajouté
					myOwnIndicator.addCountry(myOwnCountry, country.id);
				}
				if(json[key][inKey]['value'] != null){
					//on ajoute l'année concernée si elle n'est pas null
					myOwnIndicator.countries[country.id].addYear(json[key][inKey]['date'], json[key][inKey]['value']);
				}
			}
		}
	}
	return myOwnIndicator;
}
Meteor.methods({
	'uploadFile':function(fileId, fileName){
		var fs = Meteor.npmRequire('fs');
		var file = Uploads.find({_id:fileId});
		Meteor.setTimeout(function(){
			var filePath = '/imports/uploads-' + fileId + '-' + fileName;
			CSV().from.stream(
				fs.createReadStream(filePath),
				{'escape':'\\'})
				.on('record', Meteor.bindEnvironment(function(row, index){
					Country.insert({
						'id':index,
						'name':row[0],
						'code':row[1],
					})
				}, function(error){
					console.log(error);
				}))
				.on('error', function(err){
					console.log(err);
				})
				.on('end', function(count){

				})
			}, 1000)
		},
		'createCollection': function(name){
			//var fs = Meteor.npmRequire('fs');
			console.log("name ==> "+name);
			//fs.writeFileSync(name + ".js", "contenu du fichier", "UTF-8");
		},
		'importIndicator': function (url, back) {
			this.unblock();

			//get nombre de page pour nbPerPage entrées par page
			var nbPerPage = 496*5;
			var urlForPage = url + "?per_page="+nbPerPage+"&date=1960:2016&format=json";
			// asynchronous call to the dedicated API calling function
			var response = Meteor.wrapAsync(apiCall)(urlForPage);
			var nbPage = 0;
			if(response[0] != undefined){
				if(response[0]['pages'] != undefined){
					nbPage = response[0]['pages'];
				}
			}
			//on traite d'abord la première page
			var indicator = undefined;
			indicator = parseJson(response, indicator);
			console.log("1/"+nbPage);
			//on va get ensuite chaque page
			for(var page = 2; page < nbPage + 1; page++){
				var url = urlForPage + "&page=" + page;
				response = Meteor.wrapAsync(apiCall)(url);
				indicator = parseJson(response, indicator);
				console.log(page+"/"+nbPage);
			}
			//console.log(indicator);
			Indicators.insert(indicator);
			console.log("new indicator added");
			return indicator;
			//var response = HTTP.get(apiUrl).get.content;

			//return response;
		}
	})
