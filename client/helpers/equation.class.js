Equation = function( a, b ){
    this.a = a;
    this.b = b;

    this.toY( x ){
        return a * x + b;
    }
}
