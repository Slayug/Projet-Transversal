Session.set( "countries", { France: 'FR', Espagne: 'ES' } );

Template.showIndicator.helpers({
    createChart: function(){
        var indice = Indicators.find( { } ).fetch( )[0];
        var years = [];

        var countries = Session.get( "countries" );
        var dataCountries = [];

        for( var country in countries ){
            //Ajoute le pays et récupere l'index du pays dans le tableaux dataCountries.
            var indexCountry = dataCountries.push({ 
                name: country,
                code: countries[ country ]
            }) - 1;

            //ajoute les années du pays actuel à l'axe des abscisse du graphe
            var countryYears = indice.countries[ countries[ country ] ].years ;
            for( var year in countryYears )
                //Si l'année n'est pas présente dans l'axe des abscisse du graphe
                if( years.indexOf( year ) === -1 )
                    years.push( year );
        }
        //Tri les années par ordre chronologique
        years.sort( function( a, b ){
            return a - b;
        });

        var France = indice.countries[ Session.get( "countries" )[ "France" ] ];
        var Espagne = indice.countries[ Session.get( "countries" )[ "Espagne" ] ] ;

        var a1 = [] ;
        var a2 = [] ;
        var b1 = [] ;

        for( var year in France.years ){
            a2.push( year );
        }
        for( var year in Espagne.years ){
            if( a2.indexOf( year ) === -1 ){
                a2.push( year );
            }
        }
        a2.sort( function( a, b ){
            return a - b;
        } );
        for( var i = 0; i < a2.length; ++i ){
        }

        for( var i = 0; i < a2.length; ++i ){
            //S'il n'y a pas de valeur pour cette année
            if( France.years[ a2[ i ] ] === undefined && i > 0 ){
                var value = France.years[ a2[ i - 1 ] ];
                a1.push( value / 2 * 100 );
            }
            //Si c'est la premiere année et qu'il n'y a pas de valeurs
            else if( France.years[ a2[ i ] ] === undefined ){
                a1.push( 0 );
            }
            else{
                var value = France.years[ a2[ i ] ];
                a1.push( value / 2 * 100 );
            }
            //S'il n'y a pas de valeur pour cette année
            if( Espagne.years[ a2[ i ] ] === undefined && i > 0 ){
                var value = Espagne.years[ a2[ i - 1 ] ];
                b1.push( value / 2 * 100 );
            }
            //Si c'est la premiere année et qu'il n'y a pas de valeurs
            else if( Espagne.years[ a2[ i ] ] === undefined ){
                b1.push( 0 );
            }
            else{
                var value = Espagne.years[ a2[ i ] ];
                b1.push( value / 2 * 100 );
            }
        }
        

        //When everything else is finished, draw the graph
        Meteor.defer( function( ){

            //Call the Highcharts functions
            Highcharts.chart( 'chart', {
                //Title of the chart
                title: {
                    text: 'The Test'
                },
                //Set the x Axis
                xAxis: {
                    categories: a2
                },
                //Set the y Axis
                yAxis: {
                    //Title of the y Axis
                    title:{
                        text: 'yTest'
                    },
                    //Define y axis lines in the background
                    plotLines: [{
                        value: 50,
                        width: 2,
                        color: '#808080'
                    }]
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                //Data
                series: [{
                    name: 'France',
                    data: a1
                },{ 
                    name: 'Espagne',
                    data: b1
                }]
            });
        });
    }
})
