define(
    [
        'ecs/SystemsManager',
        'ecs/system/Base'
    ],
    function(SystemsManager, BaseSystem){

        describe("The Systems Manager", function(){

            var instance;

            beforeEach(function(){
                instance = new SystemsManager();
                instance.unregisterAll();
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should be a singleton", function(){
                var compareInstance = new SystemsManager();
                expect(compareInstance).toBe(instance);
            });

            it("should implement event handling functions on, off and emit", function(){
                expect(instance.on).toBeDefined();
                expect(instance.on instanceof Function).toBe(true);
                expect(instance.off).toBeDefined();
                expect(instance.off instanceof Function).toBe(true);
                expect(instance.emit).toBeDefined();
                expect(instance.emit instanceof Function).toBe(true);
            });

            it("should have no systems registered on first instantiation", function(){
                expect(Object.keys(instance._systems).length).toEqual(0);
            });

            it("should allows systems to be registered", function(){
                var system = new BaseSystem();
                instance.register(system);
                expect(instance._systems[system.identifier]).toBe(system);
            });

            it("should allow all systems to be unregistered and the manager reset", function(){
                var system = new BaseSystem();
                instance.register(system);
                expect(Object.keys(instance._systems).length).not.toEqual(0);
                instance.unregisterAll();
                expect(Object.keys(instance._systems).length).toEqual(0);
            });

            it("should emit 'systemRegistered' when registering a new system", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('systemRegistered', cbSpy);
                expect(cbSpy).not.toHaveBeenCalled();

                var system = new BaseSystem();
                instance.register(system);
                expect(cbSpy).toHaveBeenCalledWith('systemRegistered', system);
            });
            
            it("should allow systems to be unregistered by object reference", function(){
                var system = new BaseSystem();
                instance.register(system);
                expect(instance._systems[system.identifier]).toBe(system);
                instance.unregister(system);
                expect(instance._systems.hasOwnProperty(system.identifier)).toBe(false);
            });

            it("should allow systems to be unregistered by string name", function(){
                var system = new BaseSystem();
                instance.register(system);
                expect(instance._systems[system.identifier]).toBe(system);
                instance.unregister(system.identifier);
                expect(instance._systems.hasOwnProperty(system.identifier)).toBe(false);
            });

            it("should emit 'systemUnregistered' when a system is unregistered", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('systemUnregistered', cbSpy);

                var system = new BaseSystem();
                instance.register(system);
                expect(cbSpy).not.toHaveBeenCalled();
                instance.unregister(system);
                expect(cbSpy).toHaveBeenCalledWith('systemUnregistered', system);
            });

            it("should emit 'systemUnregistered' for all systems when unregisterAll is called", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('systemUnregistered', cbSpy);

                var system1 = new BaseSystem();
                instance.register(system1);

                var system2 = new BaseSystem();
                system2.identifier = "DerivedSystem";
                instance.register(system2);

                expect(cbSpy).not.toHaveBeenCalled();
                instance.unregisterAll();
                expect(cbSpy.calls.length).toEqual(2);
                expect(cbSpy.calls[0].args[1]).toBe(system1);
                expect(cbSpy.calls[1].args[1]).toBe(system2);
            });

            it("should allow systems to be retrieved by string name", function(){
                var system = new BaseSystem();
                instance.register(system);
                expect(instance._systems[system.identifier]).toBe(system);
                expect(instance.getSystem(system.identifier)).toBe(system);
            });

            it("should return null if system with string name not found", function(){
                var system = new BaseSystem();
                instance.register(system);
                expect(instance._systems[system.identifier]).toBe(system);
                expect(instance.getSystem("DoesNotExist")).toBe(null);
            });

            it("should throw an error when unregistering a system that has not been registered", function(){
                var system = new BaseSystem();
                expect(function(){
                    instance.unregister(system);
                }).toThrow(new Error('System has not been registered'));
            });

            it("should throw an error when registering a system that is already registered", function(){
                var system = new BaseSystem();
                instance.register(system);
                expect(instance._systems[system.identifier]).toBe(system);
                expect(function(){
                    instance.register(system);
                }).toThrow(new Error('System has already been registered'));
            });

        });
    }
);