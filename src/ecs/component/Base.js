define(
    [
        "underscore",
        "EventEmitter",
        'ecs/SystemsManager'
    ],
    function(_, EventEmitter, SystemsManager){

        var defaultOptions = {
            autoRegister: true,
            system: "BaseSystem"
        };

        var BaseComponent = function(opts){

            EventEmitter.call(this);

            this.systemsManager = new SystemsManager();
            this.entity = null;
            this.opts = _.extend(defaultOptions, opts);
        };

        BaseComponent.prototype = Object.create(EventEmitter.prototype);

        BaseComponent.prototype.register = function(){
            var system = this.systemsManager.getSystem(this.opts.system);
            system.register(this);
            system.on('updated', _.bind(this.emit, this));
        };

        BaseComponent.prototype.onAdd = function(entity){
            this.entity = entity;
            if(this.opts.autoRegister){
                this.register();
            }
        };

        BaseComponent.prototype.onRemove = function(){
            this.entity = null;
        };

        return BaseComponent;
    }
);