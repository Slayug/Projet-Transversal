Meteor.publish('indicators', function(){
	return Indicators.find({}, {limit:5});
})
