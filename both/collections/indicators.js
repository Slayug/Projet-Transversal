Indicators = new Mongo.Collection('indicators');

Indicators.helpers({
});
Indicators.allow({
	update:function(){
		return true;
	}
})
