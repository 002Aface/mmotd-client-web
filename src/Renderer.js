define(
    ['underscore'],
    function(_){

        var defaults = {
            width: 480,
            height: 360,
            background: '#333333'
        };

        var Renderer = function(opts){
            this.opts = _.extend(defaults, opts);
            this.canvas = document.createElement('canvas');
            this.canvas.width = this.opts.width;
            this.canvas.height = this.opts.height;
            this.context = this.canvas.getContext('2d');
            this._activeScene = null;

            this.context.fillStyle = this.opts.background;
            this.context.fillRect(0, 0, this.opts.width, this.opts.height);
        };

        Renderer.prototype.setScene = function(scene){
            this._activeScene = scene;
            scene.onAdd(this);
        };

        Renderer.prototype.render = function(){
            if(this._activeScene){
                var sceneRender = this._activeScene.render();
                if(sceneRender){
                    this.context.drawImage(sceneRender, 0, 0);
                }
            }
        };

        return Renderer;
    }
);