Meteor.publish('countries', function(){
	return Countries.find({}, {limit:250});
})
