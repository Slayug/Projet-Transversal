
Session.setDefault( "similarCountries", [] );
Template.leftColumn.rendered = function() {
    //inject typeahead
    Meteor.typeahead.inject();
};
Template.homeCategory.helpers({
    indicatorOf: function( idCategory ){
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
    },
    similarCountries: function(){
        return Session.get( "similarCountries" );
    }
});
var addCountryFromSearch = function(){
    var countryName = $("#input-country").val();
    var country = Countries.find( { name_fr: { $in: [countryName] }} ).fetch()[0];
    if(country === undefined){
        return;
    }
    //Get the countries. It's an array
    var countries = Session.get( "countries" );

    //Determine if the country is already checked
    //Is so, index check equal the index country in countries
    var indexCheck = -1;
    for( var i = 0; i < countries.length; ++i ){
        if( countries[ i ].code === country.code ){
            indexCheck = i;
            i = countries.length
        }
    }
    //If the country become checked
    if( indexCheck == -1){
        //Add the country to the indicators
        countries.push( { name_fr: country.name_fr, code: country.code, name_en: country.name_en} );
        //empty the field
        $("#input-country").val("");
        //Update the session
        Session.set( "countries", countries );
        $('.typeahead').typeahead('close');
        //update similar countries
        calculateSimilarCountries( );
    }
}
var addIndicatorFromSearch = function(){
    var indicatorName = $("#input-indicator").val();
    var indicator = Indicators.find( { name: { $in: [indicatorName] }} ).fetch()[0];
    if(indicator === undefined){
        return;
    }
    //Get the indicators. It's an array
    var indicators = Session.get( "indicators" );

    //Determine if the indicator is already checked
    //Is so, index check equal the index country in indicators
    if( !indicators.includes( indicator.code ) ){
        //Add the indice to the indicators
        indicators.push( indicator.code );
        //empty the form
        $("#input-indicator").val("");
        //Update the session
        Session.set( "indicators", indicators );
        $('.typeahead').typeahead('close');
    }
}
/**
*   Determines the similar countries
*   from a list of countries
*
**/
var calculateSimilarCountries = function( ){
    var countries = Session.get( "similarCountries" );
    //TODO calcule similar
    countries.push( { name_fr: "France" } );
    Session.set( "similarCountries", countries );
}
Template.leftColumn.events({
    'keyup .search-country': function( event ){
        //key enter was pressed
        //for selected one country
        if(event.keyCode == 13){
            addCountryFromSearch();
        }
    },
    'click .submit-country': function( event ){
        addCountryFromSearch();
    },
    'keyup .search-indicator': function( event ){
        //key enter was pressed
        //for selected one indicator
        if(event.keyCode == 13){
            addIndicatorFromSearch();
        }
    },
    'click .submit-indicator': function( event ){
        addIndicatorFromSearch();
    }
});
