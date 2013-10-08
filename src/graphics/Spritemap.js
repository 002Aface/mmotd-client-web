define(
    [
        'underscore',
        'graphics/Drawable'
    ],
    function(_, Drawable){
        var Spritemap = function(source, tileWidth, tileHeight){
            var me = this;
            Drawable.call(me);
            me.rawImage = new Image();
            me.rawImage.onLoad = _.bind(me.generateMapping, me);
            me.rawImage.src = source;
        };

        Spritemap.prototype = Object.create(Drawable.prototype);

        Spritemap.prototype.generateMapping = function(e){
            console.log(e);
        };

        return Spritemap;
    }
);