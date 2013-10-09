define(
    [
        'ecs/system/Base',
        'ecs/component/Base'
    ],
    function(BaseSystem, BaseComponent){
        describe('The Base E/C system', function(){

            var instance;

            beforeEach(function(){
                instance = new BaseSystem();
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

            it("should have no child components when instantiated", function(){
                expect(instance.components.length).toEqual(0);
            });

            it("should have a non-empty 'identifier' property for use with Systems Manager", function(){
                expect(typeof instance.identifier).toEqual("string");
            });

            it("should allow components to be registered", function(){
                var component = new BaseComponent({ autoRegister: false });
                instance.register(component);
                expect(instance.components.length).toEqual(1);
                expect(instance.components[0]).toBe(component);
            });

            it("should emit 'componentRegistered' when a component is registered", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('componentRegistered', cbSpy);

                var component = new BaseComponent({ autoRegister: false });
                expect(cbSpy).not.toHaveBeenCalled();
                instance.register(component);
                expect(cbSpy).toHaveBeenCalledWith('componentRegistered', component);
            });

            it("should allow components to be unregistered", function(){
                var component = new BaseComponent({ autoRegister: false });
                instance.register(component);
                expect(instance.components.length).toEqual(1);
                instance.unregister(component);
                expect(instance.components.length).toEqual(0);
            });

            it("should emit 'componentUnregistered' when a component is unregistered", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('componentUnregistered', cbSpy);

                var component = new BaseComponent({ autoRegister: false });
                instance.register(component);
                expect(cbSpy).not.toHaveBeenCalled();
                instance.unregister(component);
                expect(cbSpy).toHaveBeenCalledWith('componentUnregistered', component);
            });

            it("should error if an already registered component is registered", function(){
                var component = new BaseComponent({ autoRegister: false });
                instance.register(component);
                expect(function(){
                    instance.register(component)
                }).toThrow(new Error('Component has already been registered'));
            });

            it("should error if attempting to unregister an component that was not registered", function(){
                var component = new BaseComponent({ autoRegister: false });
                expect(function(){
                    instance.unregister(component)
                }).toThrow(new Error('Component has not been registered'));
            });

        });
    }
);