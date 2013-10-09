define(
    [
        'component/Base'
    ],
    function(Entity){
        describe("The Base E/C component", function(){

            var instance;

            beforeEach(function(){
                instance = new Entity();
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should implement event handling functions on, off and emit", function(){
                expect(instance.on).toBeDefined();
                expect(instance.on instanceof Function).toBe(true);
                expect(instance.off).toBeDefined();
                expect(instance.off instanceof Function).toBe(true);
                expect(instance.emit).toBeDefined();
                expect(instance.emit instanceof Function).toBe(true);
            });

        });
    }
);