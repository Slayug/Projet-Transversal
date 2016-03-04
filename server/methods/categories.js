Meteor.methods({
	'createCategories': function(){
		//test si elles y sont déjà
		var categories = Categories.find().fetch();
		if(categories.length == 0){
			//creation
			Categories.insert({name: 'Éduction'});
			Categories.insert({name: 'Éducation / Parité'});
			Categories.insert({name: 'Sciences et Technologies'});
			Categories.insert({name: 'Parité'});
			Categories.insert({name: 'Autre'});
		}
	}
});
