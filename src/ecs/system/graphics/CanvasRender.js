define(
    [
        "underscore",
        "ecs/component/core/Transform",
        "ecs/system/Base",
        "ecs/SystemsManager"
    ],
    function(_, TransformComponent, BaseSystem, SystemsManager){

        var defaultOptions = {
            autoRegister: true,
            autoStart: true,
            updateInterval: 16,
            viewCanvas: null
        };

        var CanvasRenderSystem = function(opts){

            this.identifier = this.identifier || "CanvasRenderSystem";  // allow overriding by derived 
            BaseSystem.call(this, opts);
            this.opts = _.extend(defaultOptions, opts);

            if(this.opts.viewCanvas === null){
                this.view = document.createElement('canvas');
            } else {
                this.view = this.opts.viewCanvas;
            }
            this._context = this.view.getContext('2d');
        };

        CanvasRenderSystem.prototype = Object.create(BaseSystem.prototype);

        CanvasRenderSystem.prototype.register = function(component){
            if(!component.hasOwnProperty('graphic') || !component.graphic){
                throw new Error("Component is not renderable, missing 'graphic' property");
            }

            BaseSystem.prototype.register.call(this, component);
        };

        CanvasRenderSystem.prototype.update = function(){
            BaseSystem.prototype.update.call(this);
            var ctx = this.view.getContext('2d');
            ctx.clearRect(0, 0, this.view.width, this.view.height);
            for(var i = 0; i < this.components.length; i++){
                ctx.drawImage(
                    this.components[i].graphic, 10, 10
                );
            }
        };

        return CanvasRenderSystem;
    }
);