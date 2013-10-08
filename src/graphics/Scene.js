define(
    ['./Drawable'],
    function(Drawable){
        var Scene = function(width, height){
            this.children = [];
            this.canvas = document.createElement('canvas');
            this.canvas.width = width;
            this.canvas.height = height;
            this.context = this.canvas.getContext('2d');
        };

        Scene.prototype = Object.create(Drawable.prototype);

        Scene.prototype.render = function(){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            var childRendered;
            for(var idx = 0; idx < this.children.length; idx++){
                childRendered = this.children[idx].render();
                if(childRendered){
                    this.context.drawImage(
                        childRendered,
                        this.children[idx].x,
                        this.children[idx].y,
                        this.children[idx].width,
                        this.children[idx].height
                    );
                }
            }
            return this.canvas;
        };

        Scene.prototype.addChild = function(child){
            for(var idx = 0; idx < this.children.length; idx++){
                if (this.children[idx] == child){
                    return null;
                }
            }
            this.children.push(child);
            child.onAdd(this);
            return this;
        };
        return Scene;
    }
);