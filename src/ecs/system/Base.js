define(
    [
        "underscore",
        "EventEmitter",
        "ecs/SystemsManager"
    ],
    function(_, EventEmitter, SystemsManager){

        var defaultOptions = {
            autoRegister: true,
            autoStart: true,
            updateInterval: 16
        };

        var BaseSystem = function BaseSystem(opts){

            EventEmitter.call(this);
            this.identifier = this.identifier || "BaseSystem";  // allow overriding by derived 
            this.components = [];
            this.opts = _.extend(defaultOptions, opts);
            if(this.opts.autoStart){
                this.start();
            }

            if (this.opts.autoRegister){
                var manager = new SystemsManager();
                manager.register(this);
            }
        };

        BaseSystem.prototype = Object.create(EventEmitter.prototype);

        BaseSystem.prototype.register = function(component){

            for (var i = 0; i < this.components.length; i++){
                if (this.components[i] == component){
                    throw new Error("Component has already been registered");
                }
            }
            this.components.push(component);
            this.emit('componentRegistered', component);
        };

        BaseSystem.prototype.unregister = function(component){

            for (var i = 0; i < this.components.length; i++){
                if (this.components[i] == component){
                    break;
                }
            }
            if(i < this.components.length){
                this.components.splice(i, 1);
                this.emit('componentUnregistered', component);
            } else {
                throw new Error("Component has not been registered");
            }
        };

        BaseSystem.prototype.start = function(){
            this.updateLoop = setInterval(_.bind(this.update, this), this.opts.updateInterval);
        };

        BaseSystem.prototype.update = function(){
            this.emit('updated');
        };

        return BaseSystem;
    }
);