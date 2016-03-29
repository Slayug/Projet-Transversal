Template.classement.events({
    "click .Pays": function( ){
        countriesClassement.sort( function( a, b ){
            return b.name - a.name;
        });
    }
});
Template.classement.helpers({
    countriesClassement: function( ){
        //Get the indice
        var indice = Indicators.find( { code: Session.get( "indicatorSelected" ) } ).fetch( )[ 0 ];
        console.log( sortFunction[ indice.id_function ].sort );
        //Get the countries for this indice
        var indiceCountries = indice.countries;
        var res = [];
        //Broswe through the countries and 
        //get whose named and have a value for Session.get( "year" );
        for( country in indiceCountries ){
            var cntry = indiceCountries[ country ];
            if( cntry.name.length > 0 &&
                cntry.years[ "2010" ] !== undefined ){
                    res.push( indiceCountries[ country ] );
            }
        }
        //Sort the array by they're value
        res.sort( function( a, b ){
            return sortFunction[ indice.id_function ].sort( a.years[ "2010" ], b.years[ "2010" ] );
        } );
        for( var i = 0; i < res.length; ++i ){
            res[ i ][ "position" ] = i+1;
        }
        Session.set( "countriesClassement", res );
        return Session.get( "countriesClassement" );
    }
});

Template.countryClassement.helpers({
    value: function( ){
        return this.years[ "2010" ];
    }
});
