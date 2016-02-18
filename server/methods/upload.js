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
		'importIndicator': function (url) {
			this.unblock();
			//get nombre de page

			var urlForPage = url + "?per_page=1&format=json";
			console.log(urlForPage);
			// asynchronous call to the dedicated API calling function
			var response = Meteor.wrapAsync(apiCall)(urlForPage);
			console.log(response);
			return response;
			//var response = HTTP.get(apiUrl).get.content;

			//return response;
		}
	})
