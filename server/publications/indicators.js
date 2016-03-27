Meteor.publish('indicators', function(){
	return Indicators.find({} );
})
Meteor.publish('indicator', function( indicatorCode ){
    return Indicators.find( { code: indicatorCode } );
});
