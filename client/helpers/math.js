/**
*   @param firstPoint
*   typeof Point
*   @param secondPoint
*   typeof Point
**/
distanceEuclidienne = function( firstPoint, secondPoint ){
    var distanceX = Math.pow( firstPoint.getX() - secondPoint.getX(), 2);
    var distanceY = Math.pow( firstPoint.getY() - secondPoint.getY(), 2);
}
/**
*   @param point
*   typeof array Point
**/
covariance = function( point ){

    var cov = 0;
    //array of double
    var x = [];
    //array of double
    var y = [];

    for (var p = 0; p < point.length; p++) {
        x.push( point[p].getX() );
        y.push( point[p].getY() );
    }

    for (var p = 0; p < point.length; p++) {
        cov += (x[p] - moyenne(x)) * (y[p] - moyenne(y));
    }
    return arrondi(cov / point.length, 2);
}
/**
* @param a
* Nombre a arrondir
* @param n
* Nombre de decimales apres la virgule
* @return
*/
arrondi = function( a, n ) {
    return ( parseInt(a * Math.pow(10, n)) / Math.pow(10, n) );
}
/**
* @param list
*            Liste des elements
* @return moyenne de la liste
*/
moyenne = function( list ) {

    var sigma = 0.0;
    for (var i = 0; i < list.length; i++) {
        sigma += list[i];
    }
    return arrondi(sigma / list.length, 2);
}
/**
*
* @param list
*            Liste des elements
* @return ecart-type
*/
ecartType = function( list ) {

    var sigma = 0;

    for (var i = 0; i < list.length; i++) {
        sigma += Math.pow(list[i], 2);
    }
    return arrondi(Math.sqrt(sigma / list.length - Math.pow(moyenne( list ), 2)), 2);
}
/**
*   @param list
*            Liste des elements
**/
variance = function( list ){
    return Math.pow( ecartType( list ), 2 );
}
/**
*   retourne une Equation
*   typeof Equation
*   @param list
*   list de points
*/
moindresCarrees = function( list ){
    var listX = [];
    var listY = [];
    //on crée la liste des points en x et y
    for(var x = 0; x < list.length; x++){
        listX.push( list[x].getX() );
        listY.push( list[y].getY() );
    }
    var a = covariance( list ) / variance( listX );
    var b = moyenne( listY ) - a * moyenne( listX );
    return new Equation(a, b);
}
