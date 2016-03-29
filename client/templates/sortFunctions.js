sortFunction = [
            {
                name: "Plus grand",
                id: 0,
                sort: function( a, b){
                    return b - a;
                }
            },
            {
                name: "Plus petit",
                id: 1,
                sort: function( a, b){
                    return a - b;
                }
            },
            {
                name: "Plus proche de 1",
                id: 2,
                sort: function( a, b ){
                    var float_a = parseFloat( a );
                    var dist_float_a = float_a - 1;
                    if( dist_float_a < 0 ){
                        dist_float_a = -dist_float_a;
                    }
                    var float_b = parseFloat( b );
                    var dist_float_b = float_b - 1;
                    if( dist_float_b < 0 ){
                        dist_float_b = -dist_float_b;
                    }

                    return dist_float_b - dist_float_a;
                }
            },
            {
                name: "Plus loin de 1",
                id: 3,
                sort: function( a, b ){
                    var float_a = parseFloat( a );
                    var dist_float_a = float_a - 1;
                    if( dist_float_a < 0 ){
                        dist_float_a = -dist_float_a;
                    }
                    var float_b = parseFloat( b );
                    var dist_float_b = float_b - 1;
                    if( dist_float_b < 0 ){
                        dist_float_b = -dist_float_b;
                    }

                    return dist_float_a - dist_float_b;
                }
            }
        ];
