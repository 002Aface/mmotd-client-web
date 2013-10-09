define(
    [
        'underscore',
        'graphics/Drawable'
    ],
    function(_, Drawable){
        var Sprite = function(source, width, height, onload){
            var me = this;
            Drawable.call(me);
            me.image = new Image();
            me.image.onload = onload;
            me.image.src = source;
            me.width = width;
            me.height = height;
        };

        Sprite.prototype = Object.create(Drawable.prototype);

        Sprite.prototype.render = function(){
            return this.image;
        };

        return Sprite;
    }
);