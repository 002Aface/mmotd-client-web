define(
    [
        "EventEmitter"
    ],
    function(EventEmitter){

        var BaseEntity = function(){

            EventEmitter.call(this);
            this.components = [];

        };

        BaseEntity.prototype = Object.create(EventEmitter.prototype);

        BaseEntity.prototype.addComponent = function(component){

            for (var i = 0; i <this.components.length; i++){
                if(this.components[i] == component){
                    throw new Error('Component already exists');
                }
            }

            this.components.push(component);
            this.emit('componentAdded', component);
        };

        BaseEntity.prototype.removeComponent = function(component){

            for (var i = 0; i < this.components.length; i++){
                if(this.components[i] == component){
                    break;
                }
            }
            if (i < this.components.length){
                this.components.splice(i, 1);
                this.emit('componentRemoved', component);
            } else {
                throw new Error('Component does not exist');
            }

        };

        return BaseEntity;
    }
);