Meteor.publish('indicators', function(){
	return Indicators.find({}, {limit:5});
})
Meteor.publish( 'indicator', function( indicatorCode ){
    return Indicators.find( { code: indicatorCode } );
});
