Point = function(x, y) {
    this.x = x;
    this.y = y;

    /**
    *   @param n
    *   typeof int
    **/
    this.multi = function(n) {
        return new Point(this.getX()*n, this.getY()*n);
    }
    /**
    *   @param p
    *   typeof Point
    **/
    this.add = function(p) {
        return new Point(this.getX()+p.getX(), this.getY()+p.getY());
    }
    /**
    *   @param n
    *   typeof int
    **/
    this.div = function(n) {
        return new Point((this.getX()/n), (this.getY()/n));
    }
    this.getX = function() {
        return this.x;
    }
    /**
    *   @param x
    *   typeof int
    **/
    this.setX = function(x) {
        this.x = x;
    }
    this.getY = function() {
        return this.y;
    }
    /**
    *   @param y
    *   typeof int
    **/
    this.setY = function(y) {
        this.y = y;
    }

}
