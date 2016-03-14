Indicator = function(name, code){
	this.name = name;
	this.countries = {};
	this.code = code;
	this.type = "";
	this.addCountry = function(country, code){
		if(country instanceof Country){
			this.countries[code] = country;
		}else{
			console.log("error instanceof");
		}
	}
	this.hasCountry = function(code){
		if(this.countries[code] == undefined){
			return false;
		}
		return true;
	}
}
