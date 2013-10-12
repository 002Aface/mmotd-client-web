define(
    [
        'underscore',
        'graphics/Drawable'
    ],
    function(_, Drawable){
        var Spritemap = function(source, tileWidth, tileHeight, onMapComplete){
            var me = this;
            Drawable.call(me);
            me.height = tileHeight;
            me.width = tileWidth;
            me._frameRects = [];
            me._bufferCanvas = document.createElement('canvas');
            me._bufferCanvas.width = tileWidth;
            me._bufferCanvas.height = tileHeight;
            me._buffer = me._bufferCanvas.getContext('2d');
            me.currentFrame = 0;
            me.rawImage = new Image();
            me.rawImage.onload = function(evt){
                me.generateMap(evt);
            };
            me.rawImage.src = source;
            me.onMapComplete = onMapComplete;
        };

        Spritemap.prototype = Object.create(Drawable.prototype);

        Spritemap.prototype.generateMap = function(e){
            var me = this;
            for(var y = 0; y < me.rawImage.height / me.height; y++){
                for(var x = 0; x < me.rawImage.width / me.width; x++){
                    me._frameRects.push({
                        x: x * me.width,
                        y: y * me.height,
                        width: me.width,
                        height: me.height
                    });
                }
            }
            me.onMapComplete();
        };

        Spritemap.prototype.render = function(){
            var me = this;
            me._buffer.clearRect(0, 0, me.width, me.height);
            me._buffer.drawImage(
                me.rawImage,
                me._frameRects[me.currentFrame].x,
                me._frameRects[me.currentFrame].y,
                me._frameRects[me.currentFrame].width,
                me._frameRects[me.currentFrame].height,
                0,
                0,
                me._frameRects[me.currentFrame].width,
                me._frameRects[me.currentFrame].height
            );
            return me._bufferCanvas;
        };

        return Spritemap;
    }
);