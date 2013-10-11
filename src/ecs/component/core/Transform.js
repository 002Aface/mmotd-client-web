define(
    [
        "underscore",
        "ecs/component/Base",
        'ecs/SystemsManager'
    ],
    function(_, BaseComponent, SystemsManager){

        var TransformComponent = function(opts){

            var defaults = {
                autoRegister: false,
                system: null,
                source: null,
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };

            BaseComponent.call(this, opts);
            this.opts = _.extend(defaults, opts);

            this.x = this.opts.x;
            this.y = this.opts.y;
            this.width = this.opts.width;
            this.height = this.opts.height;
        };


        TransformComponent.prototype = Object.create(BaseComponent.prototype);

        return TransformComponent;
    }
);