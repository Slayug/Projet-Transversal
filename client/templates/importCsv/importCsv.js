

Template.importCsv.helpers({
	countries: function(){
		return Country.find({}, {sort: {id: 1}});
	},
	json: function(){
		Meteor.call("getJson", function(error, results) {
			console.log(results.content); //results.data should be a JSON object
		});
	}
});
Template.importCsv.events({
	"change .myFileInput": function(evt, tmpl){
		FS.Utility.eachFile(event, function(file){
			var theFile = new FS.File(file);
			Uploads.insert(theFile, function(err, fileObj){
				if(!err){
					Meteor.call('uploadFile', fileObj._id, file.name);
				}
			})
		})
	},
	"submit .create": function(event){

	}
});
