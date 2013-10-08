define(
    [
        'graphics/Sprite',
        'graphics/Scene'
    ],
    function(Sprite, Scene){
        describe("The Scene class", function(){

            var instance;

            beforeEach(function(){
                runs(function(){
                    instance = new Scene(300, 300);
                });
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should allow Drawable instances to be added as children", function(){
                var child = new Sprite('test_assets/imgs/sprite.png', 32, 32);
                expect(instance.children.length).toEqual(0);
                instance.addChild(child);
                expect(instance.children.length).toEqual(1);
            });

            it("should call the onAdd() function of children when they are added", function(){
                var child = new Sprite('test_assets/imgs/sprite.png', 32, 32);
                spyOn(child, 'onAdd');
                instance.addChild(child);
                expect(child.onAdd).toHaveBeenCalledWith(instance);
            });

            it("should call the render() function of its children when rendering", function(){
                var child = new Sprite('test_assets/imgs/sprite.png', 32, 32);
                spyOn(child, 'render');
                instance.addChild(child);
                instance.render();
                expect(child.render).toHaveBeenCalled();
            });

            it("should draw the output of childs render function to its own canvas", function(){
                var child = new Sprite('test_assets/imgs/sprite.png', 32, 32);
                spyOn(child.image, 'onload');
                waitsFor(function(){
                    return child.image.onload.calls.length == 1;
                }, "image onload to be trigger", 1000);
                var beforeState = instance.render().toDataURL();
                instance.addChild(child);
                var afterState = instance.render().toDataURL();
                expect(beforeState).not.toEqual(afterState);
            });
        });
    }
);