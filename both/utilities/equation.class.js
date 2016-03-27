Equation = function( a, b ){
    this.a = a;
    this.b = b;

    this.toY = function( x ){
        return a * x + b;
    }
}
