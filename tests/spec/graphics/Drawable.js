define(
    ['graphics/Drawable'],
    function(Drawable){
        describe("The Drawable class", function(){

            var instance;

            beforeEach(function(){
                instance = new Drawable();
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should have position and dimension properties", function(){
                expect(instance.x).toBeDefined();
                expect(instance.y).toBeDefined();
                expect(instance.width).toBeDefined();
                expect(instance.height).toBeDefined();
            });

            it("should have a callable render() function", function(){
                expect(instance.render).toBeDefined();
                expect(instance.render instanceof Function).toEqual(true);
            });

            it("should return a drawable object when render() is called", function(){
                var returnValue = instance.render();
                var isImage = returnValue instanceof Image;
                var isCanvas = returnValue instanceof HTMLElement && returnValue.nodeName.toLowerCase() === "canvas";
                expect(isImage || isCanvas).toEqual(true);
            });

        });
    }
);