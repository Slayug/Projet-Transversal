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
    functionsClassement: function( ){
        return sortFunction;
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
Template.functionClassement.helpers({
    equals: function( a, b ){
        return a === b;
    }
});
Template.manageIndicator.events({
	"submit .add-indicator": function(event){
		event.preventDefault();
		var text = event.target.text.value;
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
	},
	"click .toast":function(){
		Meteor.call('testIndicator');
	},
    "click .functionClassement":function(){
        Meteor.call('importFunctions');
    },
    'click .calculateSimilarity': function(){
            Meteor.call( 'calculateSimilarity' );
    },
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
	},
    'change .select-function': function( e ){
        var idFunction = $(event.target).find( 'option:selected' ).val( );
        console.log( idFunction );
        Indicators.update( this._id, {
            $set: {id_function: idFunction }
        });
        console.log( Indicators.find( { _id: this._id } ).fetch( ) );
    }
})
