Meteor.publish('indicators', function(){
	return Indicators.find({}, {limit:100});
})
Meteor.publish( 'indicator', function( indicatorCode ){
    return Indicators.find( { code: indicatorCode } );
});
