define(
    [
        'ecs/component/graphics/Spritemap'
    ],
    function(SpritemapComponent){
        describe("The Spritemap component", function(){

            var instance;

            beforeEach(function(){
                instance = new SpritemapComponent({
                    autoRegister: false,
                    system: "CanvasRenderSystem",
                    source: "test_assets/imgs/spritesheet.png",
                    frameHeight: 60,
                    frameWidth: 60
                });
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should have its generateMap() function called during initialisation", function(){
                var loadSpy = jasmine.createSpy('loadSpy');
                instance.on('graphicLoaded', loadSpy);
                spyOn(instance, 'generateMap');
                expect(instance.generateMap).not.toHaveBeenCalled();
                waitsFor(function(){
                    return loadSpy.wasCalled;
                }, 'sprite map to be generated from source image', 500);

                runs(function(){
                    expect(instance.generateMap).toHaveBeenCalled();
                });
            });

            it("should emit 'graphicLoaded' after the map has been generated from source image", function(){
                var loadSpy = jasmine.createSpy('loadSpy');
                instance.on('graphicLoaded', loadSpy);
                waitsFor(function(){
                    return loadSpy.wasCalled;
                }, 'sprite map to be generated from source image', 500);
            });

            it("should create an internal map of rects represting each frame of the specified size", function(){
                var loadSpy = jasmine.createSpy('loadSpy');
                instance.on('graphicLoaded', loadSpy);
                waitsFor(function(){
                    return loadSpy.wasCalled;
                }, 'sprite map to be generated from source image', 500);

                runs(function(){
                    expect(instance._frameRects.length).toEqual(64);
                    var rect;
                    for(var y = 0; y < 8; y++){
                        for(var x = 0; x < 8; x++){
                            rect = instance._frameRects[y * 8 + x];
                            expect(rect.x).toEqual(x * 60);
                            expect(rect.y).toEqual(y * 60);
                            expect(rect.width).toEqual(60);
                            expect(rect.height).toEqual(60);
                        }
                    }
                });
            });

            it("should have a currentFrame property, initialising set to 0", function(){
                expect(instance.currentFrame).toBeDefined();
                expect(instance.currentFrame).toEqual(0);
            });

            it("should have the spritesheet clipped to the currentFrame rect available via the 'graphic' property", function(){
                var loadSpy = jasmine.createSpy('loadSpy');
                instance.on('graphicLoaded', loadSpy);
                waitsFor(function(){
                    return loadSpy.wasCalled;
                }, 'sprite map to be generated from source image', 500);
                
                runs(function(){
                    var canvas = document.createElement('canvas');
                    canvas.width = 60;
                    canvas.height = 60;
                    var blankState = canvas.toDataURL();

                    var frame0 = instance.graphic.toDataURL();
                    expect(blankState).not.toEqual(frame0);

                    instance.currentFrame++;
                    instance.redraw();

                    var frame1 = instance.graphic.toDataURL();
                    expect(blankState).not.toEqual(frame1);
                    expect(frame0).not.toEqual(frame1);

                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(instance._sourceImage, 60, 0, 60, 60, 0, 0, 60, 60);
                    expect(frame1).toEqual(canvas.toDataURL());
                });
            });

            it("should not change the spritesheet until redraw is called", function(){
                var loadSpy = jasmine.createSpy('loadSpy');
                instance.on('graphicLoaded', loadSpy);
                waitsFor(function(){
                    return loadSpy.wasCalled;
                }, 'sprite map to be generated from source image', 500);
                
                runs(function(){
                    var canvas = document.createElement('canvas');
                    canvas.width = 60;
                    canvas.height = 60;
                    var blankState = canvas.toDataURL();

                    var frame0 = instance.graphic.toDataURL();
                    expect(blankState).not.toEqual(frame0);

                    instance.currentFrame++;

                    var frame1 = instance.graphic.toDataURL();
                    expect(frame0).toEqual(frame1);

                    instance.redraw();
                    
                    frame1 = instance.graphic.toDataURL();
                    expect(blankState).not.toEqual(frame1);
                    expect(frame0).not.toEqual(frame1);

                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(instance._sourceImage, 60, 0, 60, 60, 0, 0, 60, 60);
                    expect(frame1).toEqual(canvas.toDataURL());
                });
            });

        });
    }
);