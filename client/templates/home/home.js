Session.setDefault("indicators", []);
Template.home.rendered = function() {
	//inject typeahead
	Meteor.typeahead.inject();
};
Template.home.helpers({
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
	},
	countriesSelected: function(){
		var countries = Session.get( "countries" );
		console.log("selected");
	},
	indicatorsSelected: function(){
		var indicators = Session.get( "indicators" );
		return Indicators.find({ code: { $in: indicators } } );
	}
});
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
Template.home.events({
	"click .checkIndicator": function( event, template ){
		//Get the indicators. It's an array
		var indicators = Session.get( "indicators" );
		//If the indice is already checked
		if( indicators.includes( this.code ) ){
			//Remove the indice from the indicators
			indicators.splice( indicators.indexOf( this.code ), 1 );
			//Update the session
			Session.set( "indicators", indicators );
		}
		//If the indice have been just checked
		else{
			//Add the indice to the indicators
			indicators.push( this.code );
			//Update the session
			Session.set( "indicators", indicators );
			//Session.set( "indicators", - Session.get( "indicators", ))
		}
	},
	"click .checkCountry": function( ){
		//Get the countries. It's an array
		var countries = Session.get( "countries" );
		//If the country is already checked
		if( countries.includes( this.code ) ){
			//Remove the country from the countries
			countries.splice( countries.indexOf( { name: this.name, code: this.code } ), 1 );
			//Update the session
			Session.set( "countries", countries );
		}
		//If the country have been just checked
		else{
			//Add the country to the indicators
			countries.push( { name: this.name, code: this.code } );
			//Update the session
			Session.set( "countries", countries );
		}
	},

	"click .country-selectable": function(){
		console.log("toto");
		console.log(event.target.text);
	},
	"click .submit-country": function(){
		console.log("submit");
	}
});
Template.body.events({
	"submit .search-country": function(){
		console.log("CICIICIC");

		var text = event.target.text.value;
	}
});

Template.home.events({
	"click .checkCountry": function( ){
		//Get the countries. It's an array
		var countries = Session.get( "countries" );

		//Determine if the country is already checked
		//Is so, index check equal the index country in countries
		var indexCheck = -1;
		for( var i = 0; i < countries.length; ++i ){
			if( countries[ i ].code === this.code ){
				indexCheck = i;
				i = countries.length
			}
		}
		//If the country is already checked
		if( indexCheck > -1 ){
			//Remove the country from the countries
			countries.splice( indexCheck, 1 );
			//Update the session
			Session.set( "countries", countries );
		}
		//If the country have been just checked
		else{
			//Add the country to the indicators
			countries.push( { name: this.name, code: this.code } );
			//Update the session
			Session.set( "countries", countries );
		}
		console.log( countries );
	}
});
