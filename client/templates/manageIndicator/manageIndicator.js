Template.manageIndicator.helpers({
	indicators: function(){
		var ind = Indicators.find().fetch();
		return ind;
	}
});
Template.manageIndicator.events({
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

Template.indicator.events({
    "click .delete": function( ){
        Meteor.call( 'deleteIndicator', this._id );
    },
	"click .cat":function(){
		Meteor.call('createCategories');
	}
})
