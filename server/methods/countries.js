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
	}


});
