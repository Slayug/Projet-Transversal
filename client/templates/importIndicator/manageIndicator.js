Template.manageIndicator.helpers({
	indicators: function(){
		var ind = Indicators.find().fetch();
		console.log(ind);
		return ind;
	}
});
Template.indicator.helpers({
	categories:function(){
		return Categories.find();
	}
});
Template.category.helpers({
	equals: function(a, b){
		console.log(a+' '+b);
		return a === b;
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
	},
	"click .cat":function(){
		Meteor.call('createCategories');
	}
});

Template.indicator.events({
	"click .delete": function( ){
		Meteor.call( 'deleteIndicator', this._id );
	},
	'change .select-category': function(e){
		var idCategory = $(event.target).find('option:selected').val();
		Categories.update(this._id, {
			$set: {id_category: idCategory}
		});
	}
})
