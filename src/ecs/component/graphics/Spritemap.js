define(
    [
        "underscore",
        "ecs/component/graphics/Sprite",
        "ecs/component/core/Transform",
        'ecs/SystemsManager'
    ],
    function(_, SpriteComponent, TransformComponent, SystemsManager){
        var SpritemapComponent = function(opts){

            var defaults = {

            };

            SpriteComponent.call(this, opts);
            this.opts = _.extend(defaults, opts);
            this.width = this.opts.frameWidth;
            this.height = this.opts.frameHeight;

            this._sourceImage = this.graphic;

            this.graphic = document.createElement('canvas');
            this.graphic.width = this.width;
            this.graphic.height = this.height;
            this._context = this.graphic.getContext('2d');

            this._frameRects = [];
            this.currentFrame = 0;
            this.isDirty = true;
        };

        SpritemapComponent.prototype = Object.create(SpriteComponent.prototype);

        SpritemapComponent.prototype.generateMap = function(){
            for(var y = 0; y < this._sourceImage.height / this.height; y++){
                for(var x = 0; x < this._sourceImage.width / this.width; x++){
                    this._frameRects.push({
                        x: x * this.width,
                        y: y * this.height,
                        width: this.width,
                        height: this.height
                    });
                }
            }
        };

        SpritemapComponent.prototype.onLoad = function(){
            SpriteComponent.prototype.onLoad.call(this);
            this.generateMap();
            if (this.isDirty){
                this.redraw();
            }
        };

        SpritemapComponent.prototype.redraw = function(){
            console.log(this._frameRects[this.currentFrame]);
            this._context.clearRect(0, 0, this.width, this.height);
            this._context.drawImage(
                this._sourceImage,
                this._frameRects[this.currentFrame].x,
                this._frameRects[this.currentFrame].y,
                this._frameRects[this.currentFrame].width,
                this._frameRects[this.currentFrame].height,
                0,
                0,
                this._frameRects[this.currentFrame].width,
                this._frameRects[this.currentFrame].height
            );

            this.isDirty = false;
        };

        return SpritemapComponent;
    }
);
