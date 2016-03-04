Session.set( "countries", [ { name: "France", code: 'FR'},
                            { name: "Espagne", code: 'ES' } ] );
//indices: tableaux des codes indices.
Session.set( "indices", [ "SE.ENR.PRSC.FM.ZS", "SL.UEM.LTRM.FE.ZS" ] );

Template.showIndicator.helpers({
    createChart: function(){
        //Récupére les indices sélectionés
        var indices = Indicators.find( { code: { $in: Session.get( "indices" ) } } )
                               .fetch( );

        var datas = []

        //Parcourt les indices sélectionés
        indices.forEach( function( indice ) {
            //Sélectionne les valeurs des pays pour l'indice
            var countries = indice.countries;

            //Récupére les pays sélectionnés
            var countriesSelected = Session.get( "countries" );

            //Parcours les pays sélectionés, récupére les valeurs pour ce pays et les ajoute à datas
            countriesSelected.forEach( function( country ){
                var countryYears = countries[ country.code ].years ;

                //Récupére les valeurs de chaque année
                //Ajoute les valeurs dans dataCountry sous la forme [ [ year1, value1 ], [ year2, value2] ]
                var dataCountry = [];
                for( var year in countryYears ){
                    var year = parseInt( year );
                    var value = parseFloat( countryYears[ year ] );
                    dataCountry.push( new Array( year, value ) );
                }

                //Ajoute les donnée dans datas
                datas.push( {
                    name: country.name,
                    data: dataCountry
                } );
            });
        });

        //When everything else is finished, draw the graph
        Meteor.defer( function( ){
            //Call the Highcharts functions
            Highcharts.chart( 'chart', {
                //Title of the chart
                title: {
                    text: 'The Test'
                },
                //Set the y Axis
                yAxis: {
                    //Title of the y Axis
                    title:{
                        text: 'yTest'
                    }
                },
                //Set the layout and the legend of the chart
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                //Datas
                series: datas
            });
        });
    }
});
