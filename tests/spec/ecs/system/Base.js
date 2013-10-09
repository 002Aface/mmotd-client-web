define(
    [
        'ecs/system/Base'
    ],
    function(Entity){
        describe('The Base E/C system', function(){

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

            it("should have no child entities when instantiated", function(){
                expect(true).toBe(false);
            });

            it("should have a non-empty 'identifier' property for use with Systems Manager", function(){
                expect(typeof instance.identifier).toEqual("string");
            });

            it("should allow entities to be registered", function(){
                expect(true).toBe(false);
            });

            it("should allow entities to be unregisters", function(){
                expect(true).toBe(false);
            });

            it("should error if an already registered entity is registered", function(){
                expect(true).toBe(false);
            });

            it("should error if attempting to unregister an entity that was not registered", function(){
                expect(true).toBe(false);
            });

        });
    }
);