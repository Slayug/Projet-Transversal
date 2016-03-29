/**
*   get the similar countries
*   from a list of countries
*
**/
updateSimilarCountries = function( ){
    var similarCountries = Session.get( "similarCountries" );
    var countriesSelected = Session.get( "countries" );
    var indicatorsSelected = Session.get( "indicators" );
    //seulement si on a un seul indice
    //et un seul pays
    similarCountries = [];
    if( indicatorsSelected.length == 1 &&
        countriesSelected.length > 0){
            var indicator = Indicators.find( { code: { $in: [ indicatorsSelected[0] ] }} ).fetch()[0];
            var codeCountry = countriesSelected[0].code;
            var similarities = indicator.countries[codeCountry].similarities;
            for(var s = 0; s < similarities.length; s++){
                similarCountries.push( Countries.find( { code: { $in: [ similarities[s] ] }} ).fetch()[0] );
            }

            Session.set( "similarCountries", similarCountries );
    }else{
        Session.set( "similarCountries", similarCountries );
    }
}
