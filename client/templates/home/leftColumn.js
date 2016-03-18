Session.setDefault("indicators", []);
Template.leftColumn.rendered = function() {
	//inject typeahead
	Meteor.typeahead.inject();
};
Template.homeCategory.helpers({
	indicatorOf: function(idCategory){
		return Indicators.find( { id_category: { $in: [idCategory]} } );
	}
});

Template.homeIndicator.helpers({
	//return if the indice
	//was selected by user on list
	isSelected: function(){
		var indicators = Session.get( "indicators" );
		if(indicators.indexOf(this.code) > -1){
			return true;
		}else{
			return false;
		}
	}
});
Template.leftColumn.helpers({
	categories: function(){
		return Categories.find().fetch();
	},
	countries: function(){
		return Countries.find().fetch();
	},
	autoCompleteIndicator: function(){
		return Indicators.find().fetch().map(function(it){
			return it.name;
		});
	}
});
Template.leftColumn.events({
	'keyup .search-country': function( event ){
		if(event.keyCode == 13){
			console.log($(".country-selectable").text);
			console.log(this);
		}
	}
});
