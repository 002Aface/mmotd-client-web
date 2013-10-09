define(
    [
        "EventEmitter"
    ],
    function(EventEmitter){

        var BaseSystem = function(){

            EventEmitter.call(this);

        };

        BaseSystem.prototype = Object.create(EventEmitter.prototype);

        return BaseSystem;
    }
);