Template.home.rendered = function() {

};
Template.home.helpers({
	categories: function(){
		return Categories.find().fetch();
	}
});
Template.homeCategory.helpers({
	indicesOf: function(idCategory){
		return Indicators.find( { id_category: { $in: [idCategory]} } );
	}
});
