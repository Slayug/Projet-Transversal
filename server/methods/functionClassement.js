Meteor.methods({
    "importFunctions": function( ){
        var nbFunctions = FunctionClassement.count( );
        if( nbFunctions == 0 ){
            FunctionClassement.insert({
                id: 0,
                name: "procheDeN",
                classement: function( elem1, elem2, n){
                    var float_elem1 = parseFloat( elem1 );
                    var float_elem2 = parseFloat( elem2 );

                    var dist_elem1 = float_elem1 - n;
                    if( dist_elem1 < 0 ){
                        dist_elem1 = -dist_elem1;
                    }

                    var dist_elem2 = float_elem2 - n;
                    if( dist_elem2 < 0 ){
                        dist_elem2 = -dist_elem2;
                    }

                    return dist_elem1 <= dist_elem2;
                }
            });
            FunctionClassement.insert({
                id: 1,
                name: "loinDeN",
                classement: function( elem1, elem2, n ){
                        var float_elem1 = parseFloat( elem1 );
                        var float_elem2 = parseFloat( elem2 );

                        var dist_elem1 = float_elem1 - n;
                        if( dist_elem1 < 0 ){
                            dist_elem1 = -dist_elem1;
                        }

                        var dist_elem2 = float_elem2 - n;
                        if( dist_elem2 < 0 ){
                            dist_elem2 = -dist_elem2;
                        }

                        return dist_elem2 <= dist_elem1;
                }
            });
            FunctionClassement.insert({
                id: 2,
                name: "plusGrand",
                classement: function( elem1, elem2 ){
                    var float_elem1 = parseFloat( elem1 );
                    var float_elem2 = parseFloat( elem2 );

                    return float_elem1 >= float_elem2;
                }
            });
            FunctionClassement.insert({
                id: 3,
                name: "plusPetit",
                classement: function( elem1, elem2 ){
                    var float_elem1 = parseFloat( elem1 );
                    var float_elem2 = parseFloat( elem2 );

                    return float_elem1 <= float_elem2;
                }
            });
        }
    }
});
