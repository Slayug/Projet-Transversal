

Template.manageCountries.helpers({
	countries: function(){
		return Countries.find({}, {sort: {name_fr: 1}});
	}
});
Template.manageCountries.events({
	"click .import": function(){
		Meteor.call('importFromWorldBank');
	}
});
