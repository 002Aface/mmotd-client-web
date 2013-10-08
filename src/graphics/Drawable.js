define(
    [],
    function(){
        var Drawable = function(){
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        };

        Drawable.prototype.render = function(){
            return new Image();
        };

        Drawable.prototype.onAdd = function(parent){
            this.parent = parent;
            return this;
        };

        return Drawable;
    }
);