

Template.importIndicator.helpers({
	countries: function(){
		return Country.find({}, {sort: {id: 1}});
	},
	indicators: function(){
		var ind = Indicators.find({});
		console.log(ind);
		return ind;
	}
});
Template.importIndicator.events({
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
	"submit .add-indicator": function(event){
		event.preventDefault();
		var text = event.target.text.value;
		//TODO test si y'a plusieurs lignes de lien si c'est le cas appelé plusieurs fois importIndicator
		Meteor.call('importIndicator', text);
	}
});
