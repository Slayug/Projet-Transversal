

Template.importCsv.helpers({
	countries: function(){
		console.log(Countries.find({}));
		return Countries.find({}, {sort: {id: 1}});
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
		Meteor.call('createCollection', 'toast');
	}
});
