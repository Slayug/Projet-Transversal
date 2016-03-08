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

Template.homeIndicator.events({
    "click .checkIndicator": function( ){
        //Get the indices. It's an array
        var indices = Session.get( "indices" );

        //If the indice is already checked
        if( indices.includes( this.code ) ){
            //Remove the indice from the indices
            indices.splice( indices.indexOf( this.code ), 1 );
            //Update the session
            Session.set( "indices", indices );
        }
        //If the indice have been just checked
        else{
            //Add the indice to the indices
            indices.push( this.code );
            //Update the session
            Session.set( "indices", indices );
        }
    }
});
