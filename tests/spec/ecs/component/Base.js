define(
    [
        'ecs/component/Base',
        'ecs/system/Base',
        'ecs/SystemsManager'
    ],
    function(BaseComponent, BaseSystem, SystemsManager){
        describe("The Base E/C component", function(){

            var instance;
            var system;
            var manager;

            beforeEach(function(){
                instance = new BaseComponent({autoRegister: false, system: "BaseSystem"});
                manager = new SystemsManager();
                manager.unregisterAll();
                system = new BaseSystem({autoRegister: true, autoStart: false});
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

            it("should be able to register itself with the configured system", function(){
                expect(system.components.length).toEqual(0);
                instance.register();
                expect(system.components.length).toEqual(1);
                expect(system.components[0]).toBe(instance);
            });

            it("should register itself automatically in the constructor if autoRegister is true", function(){
                expect(system.components.length).toEqual(0);

                var regInstance = new BaseComponent({autoRegister: true, system: "BaseSystem"});

                expect(system.components.length).toEqual(1);
                expect(system.components[0]).toBe(regInstance);
            });

            it("should not register itself automatically if autoRegister is false", function(){
                expect(system.components.length).toEqual(0);

                var regInstance = new BaseComponent({autoRegister: false, system: "BaseSystem"});

                expect(system.components.length).toEqual(0);
            });

            it("should emit 'updated' when its registered system updates", function(){
                instance.register();
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('updated', cbSpy);
                expect(cbSpy).not.toHaveBeenCalled();
                system.update();
                expect(cbSpy).toHaveBeenCalled();
            });

        });
    }
);