
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
    indicatorSelected: function(){
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
Template.similarCountry.helpers({
    countrySelected: function(){
        var countries = Session.get( "countries" );
        console.log(this);
        for(var c = 0; c < countries.length; c++){
            if(countries[c].name_fr == this.name_fr){
                return true;
            }
        }
        return false;
    }
})
var addCountryFromName = function( countryName ){
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

        calculateSimilarCountries( );
    }
}
/**
*   Determines the similar countries
*   from a list of countries
*
**/
var calculateSimilarCountries = function( ){
    var similarCountries = Session.get( "similarCountries" );
    var countriesSelected = Session.get( "countries" );
    var indicatorsSelected = Session.get( "indicators" );
    //seulement si on a un seul indice
    if( indicatorsSelected.length == 1){
        //selection de l'indice concerné
        var indicator = Indicators.find( { code: { $in: [indicatorsSelected[0] ] }} ).fetch()[0];
        //moindresCarrees pour les pays selectionnés
        //l'indice sera le code du pays
        console.log(indicator);
        var listMoindresCarrees = [];
        for(var country in indicator.countries){
            var countryYears = country.years;

            var pointsByCountry = [];
            //on parcours les années pour determiner l'ensemble
            //de point qui servira aux moindres carrees
            for( var year in countryYears ){
                //x: year
                //y: value pour l'année
                pointsByCountry.push( new Point( year, countryYears[ year ] ) );
            }
            listMoindresCarrees.push( moindresCarrees( pointsByCountry ) );
        }
        for(var p = 0; p < listMoindresCarrees.length; p++){
            console.log("==> " +listMoindresCarrees[p].a+" "+listMoindresCarrees[p].b);
        }



        Session.set( "similarCountries", similarCountries );
    }
}
Template.leftColumn.events({
    'keyup .search-country': function( event ){
        //key enter was pressed
        //for selected one country
        if(event.keyCode == 13){
            addCountryFromName( $("#input-country").val() );
        }
    },
    'click .submit-country': function( event ){
        addCountryFromName( $("#input-country").val() );
    },
    'click .checkCountry': function(){
        addCountryFromName( this.name_fr );
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
