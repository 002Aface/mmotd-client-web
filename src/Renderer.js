define(
    ['underscore'],
    function(_){

        var Renderer = function(opts){
            this.canvas = document.createElement('canvas');
        };

        return Renderer;
    }
);