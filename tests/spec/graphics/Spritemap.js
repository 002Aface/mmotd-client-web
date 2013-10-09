define(
    ['graphics/Spritemap'],
    function(Spritemap){
        describe('The Spritesheet class', function(){

            var instance, loadSpy;

            beforeEach(function(){
                loadSpy = jasmine.createSpy('loadSpy');
                instance = new Spritemap('test_assets/imgs/spritesheet.png', 60, 60, loadSpy);
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should have its generateMap() function called during initialisation", function(){
                spyOn(instance, 'generateMap');
                waitsFor(function(){
                    return instance.generateMap.calls.length == 1;
                }, "spritemap to call generateMap", 500);
            });

            it("should call the passed onload() function after the map has been generated from source image", function(){
                waitsFor(function(){
                    return loadSpy.calls.length == 1;
                }, 'sprite map to be generated from source image', 500);
            });

            it("should create an internal map of rects represting each frame of the specified size", function(){
                waitsFor(function(){
                    return loadSpy.calls.length == 1;
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

            it("should return the spritesheet clipped to the currentFrame rect when render() is called", function(){
                waitsFor(function(){
                    return loadSpy.calls.length == 1;
                }, 'sprite map to be generated from source image', 500);
                
                runs(function(){
                    var canvas = document.createElement('canvas');
                    canvas.width = 60;
                    canvas.height = 60;
                    var blankState = canvas.toDataURL();

                    var frame0 = instance.render().toDataURL();
                    expect(blankState).not.toEqual(frame0);

                    instance.currentFrame++;

                    var frame1 = instance.render().toDataURL();
                    expect(blankState).not.toEqual(frame1);
                    expect(frame0).not.toEqual(frame1);

                    var ctx = canvas.getContext('2d');
                    console.log(instance._frameRects[instance.currentFrame]);
                    ctx.drawImage(instance.rawImage, 60, 0, 60, 60, 0, 0, 60, 60);
                    expect(frame1).toEqual(canvas.toDataURL());
                });
            });

        });
    }
);