Country = function(name){
	this.name = name;
	this.years = {};
	this.addYear = function(year, value){
		this.years[year] = value;
	}
}
