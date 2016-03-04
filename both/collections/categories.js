Categories = new Mongo.Collection('categories');

Categories.helpers({

});
Categories.allow({
	insert:function(){
		return true;
	},
	update:function(){
		return true;
	},
	remove:function(){
		return false;
	}
})
