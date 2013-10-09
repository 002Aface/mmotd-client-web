define(
    [
        "EventEmitter"
    ],
    function(EventEmitter){

        var BaseSystem = function BaseSystem(){

            EventEmitter.call(this);
            this.identifier = "BaseSystem";
        };

        BaseSystem.prototype = Object.create(EventEmitter.prototype);

        return BaseSystem;
    }
);