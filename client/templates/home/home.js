Template.home.helpers({
	countriesSelected: function(){
		return Session.get( "countries" );
	},
	indicatorsSelected: function(){
		var indicators = Session.get( "indicators" );
		return Indicators.find({ code: { $in: indicators } } );
	}
});

Template.home.events({
	'click .removeCountrySelected': function(){
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
	},
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
	"click .country-selectable": function(){
	},
	"click .submit-country": function(){
		console.log("submit");
		console.log($("#input-country").val());
		//TODO ajouter à la session list des pays séléctionnés
	},
	"click .checkCountry": function( ){
		//replaced by keyup search-country in leftColumn
		//console.log( countries );
	}
});
