Session.set( "countries", [ ] );
//indices: tableaux des codes indices.
Session.setDefault( "indicators", [] );

Template.showIndicator.helpers({
    createChart: function(){
        //Récupére les indices sélectionés
        var indicators = Indicators.find( { code: { $in: Session.get( "indicators" ) } } )
                               .fetch( );

        var datas = []

        //Parcourt les indices sélectionés
        indicators.forEach( function( indice ) {
            //Sélectionne les valeurs des pays pour l'indice
            var countries = indice.countries;
            //Récupére les pays sélectionnés
            var countriesSelected = Session.get( "countries" );
            console.log(indice);

            //Parcours les pays sélectionés, récupére les valeurs pour ce pays et les ajoute à datas
            countriesSelected.forEach( function( country ){
                var countryYears = countries[ country.code ].years ;

                //Récupére les valeurs de chaque année
                //Ajoute les valeurs dans dataCountry sous la forme [ [ year1, value1 ], [ year2, value2] ]
                var dataCountry = [];
                for( var year in countryYears ){
                    var year = parseInt( year );
                    var timestamp = Date.UTC( year, 0, 1 );
                    var value = parseFloat( countryYears[ year ] );
                    dataCountry.push( new Array( timestamp, value ) );
                }

                //Ajoute les donnée dans datas
                datas.push( {
                    name: "[" + country.name_fr + "]<br>" + indice.name,
                    data: dataCountry
                } );
            });
        });

        //When everything else is finished, draw the graph
        Meteor.defer( function( ){
            $('#chart').highcharts('StockChart', {

                rangeSelector : {
                    inputDateFormat: "%Y",
                    inputEditDateFormat: "%Y",
                    buttons: [
                        {
                            type: 'year',
                            count: 1,
                            text: '1a'
                        },
                        {
                            type: 'year',
                            count: 5,
                            text: '5a'
                        },
                        {
                            type: 'year',
                            count: 10,
                            text: '10a'
                        },
                        {
                            type: 'all',
                            text: 'Tout'
                        },
                    ]
                },

                plotOptions: {
                    series: {
                        pointInterval: 1,
                        pointIntervalUnit: 'year'
                    }
                },

                series : datas
            });
        });
    }
});
