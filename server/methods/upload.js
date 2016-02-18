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
		'getJson': function () {
			console.log("calling..");
			// Construct the API URL
			var apiUrl = 'http://api.worldbank.org/fr/countries/indicators/1.0.PGap.1.25usd?per_page=30&date=1960:2016&format=json';
			// query the API
			this.unblock();
			return Meteor.http.call("GET", apiUrl);
			//var response = HTTP.get(apiUrl).get.content;

			//return response;
		}
	})
