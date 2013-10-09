define(
    [
        "EventEmitter"
    ],
    function(EventEmitter){

        var BaseSystem = function BaseSystem(){

            EventEmitter.call(this);
            this.identifier = "BaseSystem";
            this.components = [];
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

        BaseSystem.prototype.update = function(component){

        };

        return BaseSystem;
    }
);