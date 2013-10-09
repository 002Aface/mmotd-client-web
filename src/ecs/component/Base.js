define(
    [
        "EventEmitter"
    ],
    function(EventEmitter){

        var BaseComponent = function(){

            EventEmitter.call(this);

        };

        BaseComponent.prototype = Object.create(EventEmitter.prototype);

        return BaseComponent;
    }
);