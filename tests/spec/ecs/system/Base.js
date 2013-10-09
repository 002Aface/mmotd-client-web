define(
    [
        'ecs/system/Base',
        'ecs/component/Base',
        'ecs/SystemsManager'
    ],
    function(BaseSystem, BaseComponent, SystemsManager){
        describe('The Base E/C system', function(){

            var instance;
            var manager;

            beforeEach(function(){
                jasmine.Clock.useMock();
                instance = new BaseSystem({updateInterval: 100, autoStart:false, autoRegister: false});
                manager = new SystemsManager();
                manager.unregisterAll();
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

            it("should automatically register itself with the SystemsManager if autoRegister is true", function(){
                var regInstance = new BaseSystem({autoRegister: true});
                expect(manager.getSystem("BaseSystem")).toBe(regInstance);
            });

            it("should not automatically register itself with the SystemsManager if autoRegister is false", function(){
                var manager = new SystemsManager();
                manager.unregisterAll();
                var regInstance = new BaseSystem({autoRegister: false});
                expect(manager.getSystem("BaseSystem")).toBeNull();
            });

            it("should have a non-empty 'identifier' property for use with Systems Manager", function(){
                expect(typeof instance.identifier).toEqual("string");
                expect(instance.identifier).toEqual("BaseSystem");
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
                    instance.register(component);
                }).toThrow(new Error('Component has already been registered'));
            });

            it("should error if attempting to unregister an component that was not registered", function(){
                var component = new BaseComponent({ autoRegister: false });
                expect(function(){
                    instance.unregister(component);
                }).toThrow(new Error('Component has not been registered'));
            });

            it("should have an update function that is called at the specified interval", function(){
                expect(instance.update).toBeDefined();
                expect(instance.update instanceof Function).toBe(true);
                spyOn(instance, 'update');

                instance.start();

                expect(instance.update).not.toHaveBeenCalled();
                jasmine.Clock.tick(101);
                expect(instance.update).toHaveBeenCalled();
                expect(instance.update.calls.length).toEqual(1);
                jasmine.Clock.tick(101);
                expect(instance.update.calls.length).toEqual(2);
            });

            it("should emit 'updated' upon each update", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('updated', cbSpy);

                instance.start();
                expect(cbSpy).not.toHaveBeenCalled();
                jasmine.Clock.tick(101);
                expect(cbSpy).toHaveBeenCalled();
                expect(cbSpy.calls.length).toEqual(1);
                jasmine.Clock.tick(101);
                expect(cbSpy.calls.length).toEqual(2);
            });

        });
    }
);