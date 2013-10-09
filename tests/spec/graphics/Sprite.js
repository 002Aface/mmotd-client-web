define(
    ['graphics/Sprite'],
    function(Sprite){
        describe('The Sprite class', function(){

            var instance, loadSpy;

            beforeEach(function(){
                loadSpy = jasmine.createSpy('loadSpy');
                instance = new Sprite('test_assets/imgs/sprite.png', 32, 32, loadSpy);
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should call the passed onload() function after source image is loaded", function(){
                waitsFor(function(){
                    return loadSpy.calls.length == 1;
                }, 'sprite source image to be loaded', 500);
            });

        });
    }
);