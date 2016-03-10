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
					Countries.insert({
						'name_en':row[0],
						'code':row[1],
						'region_en':row[2],
						'name_fr':row[3],
						'region_fr':row[4]
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
		}
	})
