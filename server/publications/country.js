Meteor.publish('country', function(){
	return Country.find({}, {limit:250});
})
