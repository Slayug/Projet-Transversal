Template.manageIndicator.helpers({
	indicators: function(){
		var ind = Indicators.find().fetch();
		return ind;
	}
});
Template.indicator.helpers({
	categories:function(){
		return Categories.find();
	},
	equals: function(a, b){
		return a === b;
	}
});
Template.category.helpers({
	equals: function(a, b){
		return a === b;
	}
});
Template.manageIndicator.events({
	"submit .add-indicator": function(event){
		event.preventDefault();
		var text = event.target.text.value;
		//TODO test si y'a plusieurs lignes de lien si c'est le cas appelé plusieurs fois importIndicator
		var lines = [];
		if(/\r/.exec(text)){
			lines = text.split('\r');
		}else if(/\n/.exec(text)){
			lines = text.split('\n');
		}else{
			lines.push(text);
		}
		for(var l = 0; l < lines.length; l++){
			Meteor.call('importIndicator', 'http://api.worldbank.org/fr/countries/indicators/'+lines[l]);
		}
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
		Indicators.update(this._id, {
			$set: {id_category: idCategory}
		});
	}
})
