Meteor.publish('countries', function(){

    //If there's nothing in the DB
    if( Countries.find().count( ) <= 0 ){
        //Get the first indicator
        var indicators = Indicators.find().fetch()[0];
        //Broswe through all countries code.
        Object.keys( indicators.countries ).forEach( function( codeCountrie ){
            //Insert the the countrie info into Countries
            Countries.insert( { name: indicators.countries[ codeCountrie ].name, code: codeCountrie } );
        });
    }

	return Countries.find({}, {limit:250});
})
