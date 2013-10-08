define(
    ['Renderer'],
    function(Renderer){
        describe("The default canvas renderer", function(){
            
            var instance;

            beforeEach(function(){
                instance = new Renderer();
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should be instantiable", function(){
                expect(instance).toBeDefined();
            });

            it("should have an accessible canvas element after being initialised", function(){
                expect(instance.canvas).toBeDefined();
                expect(instance.canvas instanceof HTMLElement).toEqual(true);
                expect(instance.canvas.nodeName.toLowerCase() === "canvas").toEqual(true);
            });

        });
    }
);