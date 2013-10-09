define(
    ['Renderer', 'graphics/Scene', 'graphics/Sprite'],
    function(Renderer, Scene, Sprite){
        describe("The default canvas renderer", function(){
            
            var instance;

            beforeEach(function(){
                instance = new Renderer({
                    height: 480,
                    width: 800,
                    background: '#000000'
                });
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should have an accessible canvas element after being initialised", function(){
                expect(instance.canvas).toBeDefined();
                expect(instance.canvas instanceof HTMLElement).toEqual(true);
                expect(instance.canvas.nodeName.toLowerCase() === "canvas").toEqual(true);
            });

            it("should set canvas dimensions to that passed in initialisation", function(){
                expect(instance.canvas.width).toEqual(800);
                expect(instance.canvas.height).toEqual(480);
            });

            it("should clear canvas to background colour passed in initialisation", function(){
                var compareCanvas = document.createElement('canvas');
                compareCanvas.width = 800;
                compareCanvas.height = 480;
                var ctx = compareCanvas.getContext('2d');
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, 800, 480);

                expect(instance.canvas.toDataURL()).toEqual(compareCanvas.toDataURL());
            });

            it("should have a setScene() function that updates the active scene", function(){
                var scene = new Scene(500, 500);
                instance.setScene(scene);
                expect(instance._activeScene).toEqual(scene);
            });

            it("should call a scenes onAdd() function when that scene is set as active", function(){
                var scene = new Scene(500, 500);
                spyOn(scene, 'onAdd');
                expect(scene.onAdd).not.toHaveBeenCalled();
                instance.setScene(scene);
                expect(scene.onAdd).toHaveBeenCalled();
            });

            it("should call a scenes render() function when rendering", function(){
                var scene = new Scene(500, 500);
                spyOn(scene, 'render');
                instance.setScene(scene);
                expect(scene.render).not.toHaveBeenCalled();
                instance.render();
                expect(scene.render).toHaveBeenCalled();
            });

            it("should draw the scene to its own canvas", function(){
                loadSpy = jasmine.createSpy('loadSpy');
                var sprite = new Sprite('test_assets/imgs/sprite.png', 32, 32, loadSpy);
                waitsFor(function(){
                    return loadSpy.calls.length == 1;
                }, "sprite source image to load", 500);
                runs(function(){
                    var blankData = instance.canvas.toDataURL();
                    var scene = new Scene(500, 500);
                    scene.addChild(sprite);
                    instance.setScene(scene);
                    instance.render();
                    expect(instance.canvas.toDataURL()).not.toEqual(blankData);
                });
            });

        });
    }
);