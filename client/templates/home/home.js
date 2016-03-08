Template.home.rendered = function() {

};
Template.home.helpers({
	categories: function(){
		return Categories.find().fetch();
	},
    countries: function(){
        return Countries.find().fetch();
    }
});
Template.homeCategory.helpers({
	indicesOf: function(idCategory){
		return Indicators.find( { id_category: { $in: [idCategory]} } );
	}
});

Template.homeIndicator.events({
    "click .checkIndicator": function( ){
        //Get the indices. It's an array
        var indices = Session.get( "indices" );
        //If the indice is already checked
        if( indices.includes( this.code ) ){
            //Remove the indice from the indices
            indices.splice( indices.indexOf( this.code ), 1 );
            //Update the session
            Session.set( "indices", indices );
        }
        //If the indice have been just checked
        else{
            //Add the indice to the indices
            indices.push( this.code );
            //Update the session
            Session.set( "indices", indices );
        }
    },
    "click .checkCountry": function( ){
        //Get the countries. It's an array
        console.log( "CLicked" );
        var countries = Session.get( "countries" );
        //If the country is already checked
        if( countries.includes( this.code ) ){
            //Remove the country from the countries
            countries.splice( countries.indexOf( { name: this.name, code: this.code } ), 1 );
            //Update the session
            console.log( "Dans countries : "+countries );
            Session.set( "countries", countries );
        }
        //If the country have been just checked
        else{
            //Add the country to the indices
            countries.push( { name: this.name, code: this.code } );
            //Update the session
            console.log( "Pas dans countries : "+countries );
            Session.set( "countries", countries );
        }
    },
    "click .test": function(){
        console.log( "Test click" );
    }
});
