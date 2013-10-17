define(
    [
        "underscore",
        "ecs/component/graphics/Spritemap"
    ],
    function(_, SpritemapComponent){
        var AnimatedSpriteComponent = function(opts){

            var defaults = {

            };

            SpritemapComponent.call(this, opts);
            this.opts = _.extend(defaults, opts);

            this._animations = {};
            this._animInterval = 0;
        };

        AnimatedSpriteComponent.prototype = Object.create(SpritemapComponent.prototype);

        AnimatedSpriteComponent.prototype.addAnimation = function(name, opts){
            this._animations[name] = opts;
        };

        AnimatedSpriteComponent.prototype.play = function(name){
            this._currentAnimation = name;
            this._currentAnimationFrame = 0;
            this.currentFrame = this._animations[this._currentAnimation].frames[0];

            clearInterval(this._animInterval);
            this._animInterval = setInterval(
                    _.bind(this._nextFrame, this),
                    1000 / this._animations[this._currentAnimation].rate
            );
        };


        AnimatedSpriteComponent.prototype._nextFrame = function(){
            var anim = this._animations[this._currentAnimation];
            if (this._currentAnimationFrame + 1 >= anim.frames.length){
                if(anim.loop){
                    this._currentAnimationFrame = 0;
                } else {
                    clearInterval(this._animInterval);
                    return;
                }
            } else {
                this._currentAnimationFrame++;
            }
            this.currentFrame = anim.frames[this._currentAnimationFrame];
        };

        return AnimatedSpriteComponent;
    }
);
