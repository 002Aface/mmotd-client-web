define(
    [
        "underscore",
        "ecs/component/Base",
        "ecs/component/core/Transform",
        'ecs/SystemsManager'
    ],
    function(_, BaseComponent, TransformComponent, SystemsManager){
        var SpriteComponent = function(opts){

            var defaults = {
                autoRegister: true,
                system: "CanvasRenderSystem",
                source: "",
            };

            BaseComponent.call(this, opts);
            this.opts = _.extend(defaults, opts);

            this.graphic = new Image();
            this.graphic.onload = _.bind(this.onLoad, this);
            if(this.opts.source){
                this.graphic.src = this.opts.source;
            }
        };

        SpriteComponent.prototype = Object.create(BaseComponent.prototype);

        SpriteComponent.prototype.onLoad = function(evt){
            this.width = this.graphic.width;
            this.height = this.graphic.height;

            if (this.hasOwnProperty('transform')){
                if (this.transform.width === 0 && this.hasOwnProperty('width')){
                    this.transform.width = this.width;
                }
                
                if (this.transform.height === 0 && this.hasOwnProperty('height')){
                    this.transform.height = this.height;
                }
            }
            this.emit('graphicLoaded');
        };

        SpriteComponent.prototype.onAdd = function(entity){
            var hasTransform = false;
            for(var i = 0; i < entity.components.length; i++){
                if(entity.components[i] instanceof TransformComponent){
                    hasTransform = true;
                    this.transform = entity.components[i];

                    if (this.transform.width === 0 && this.hasOwnProperty('width')){
                        this.transform.width = this.width;
                    }
                    
                    if (this.transform.height === 0 && this.hasOwnProperty('height')){
                        this.transform.height = this.height;
                    }
                }
            }
            if(!hasTransform){
                throw new Error("Entity has no transform, cannot register component");
            }
            BaseComponent.prototype.onAdd.call(this, entity);
        };
        return SpriteComponent;
    }
);