define(
    [
        "underscore",
        "ecs/component/Base",
        'ecs/SystemsManager'
    ],
    function(_, BaseComponent, SystemsManager){

        var defaultOptions = {
            autoRegister: false,
            system: null,
            source: null,
        };

        var TransformComponent = function(opts){

            BaseComponent.call(this, opts);
            this.opts = _.extend(defaultOptions, opts);

            this.x = this.opts.x;
            this.y = this.opts.y;
            this.width = this.opts.width;
            this.height = this.opts.height;
        };

        TransformComponent.prototype = Object.create(BaseComponent.prototype);

        return TransformComponent;
    }
);