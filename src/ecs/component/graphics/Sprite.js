define(
    [
        "underscore",
        "ecs/component/Base",
        "ecs/component/core/Transform",
        'ecs/SystemsManager'
    ],
    function(_, BaseComponent, TransformComponent, SystemsManager){

        var defaultOptions = {
            autoRegister: true,
            system: "CanvasRenderSystem",
            source: null,
        };

        var SpriteComponent = function(opts){

            BaseComponent.call(this, opts);
            this.opts = _.extend(defaultOptions, opts);

            this.graphic = new Image();
            this.graphic.onload = _.bind(this.onLoad, this);
            this.graphic.src = this.opts.source;
        };

        SpriteComponent.prototype = Object.create(BaseComponent.prototype);

        SpriteComponent.prototype.onLoad = function(){
            this.emit('graphicLoaded');
        };

        SpriteComponent.prototype.onAdd = function(entity){
            var hasTransform = false;
            for(var i = 0; i < entity.components.length; i++){
                if(entity.components[i] instanceof TransformComponent){
                    hasTransform = true;
                    this.transform = entity.components[i];
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