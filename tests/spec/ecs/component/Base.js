define(
    [
        'ecs/component/Base',
        'ecs/system/Base',
        'ecs/entity/Base',
        'ecs/SystemsManager'
    ],
    function(BaseComponent, BaseSystem, BaseEntity, SystemsManager){
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

            it("should have property 'entity' set to null when not attached to an entity", function(){
                expect(instance.entity).toBeDefined();
                expect(instance.entity).toBeNull();
            });

            it("should be able to register itself with the configured system", function(){
                expect(system.components.length).toEqual(0);
                instance.register();
                expect(system.components.length).toEqual(1);
                expect(system.components[0]).toBe(instance);
            });

            it("should update the 'entity' property when attached to an entity", function(){
                var entity = new BaseEntity();
                expect(instance.entity).toBeNull();
                entity.addComponent(instance);
                expect(instance.entity).toBe(entity);
            });

            it("should null the 'entity' property when removed from an entity", function(){
                var entity = new BaseEntity();
                entity.addComponent(instance);
                expect(instance.entity).toBe(entity);
                entity.removeComponent(instance);
                expect(instance.entity).toBeNull();
            });

            it("should register itself automatically when attached to an entity if autoRegister is true", function(){
                var regInstance = new BaseComponent({autoRegister: true, system: "BaseSystem"});
                var entity = new BaseEntity();
                spyOn(regInstance, 'register');

                expect(regInstance.register).not.toHaveBeenCalled();
                entity.addComponent(regInstance);
                expect(regInstance.register).toHaveBeenCalled();
            });

            it("should not register itself automatically if autoRegister is false", function(){
                var regInstance = new BaseComponent({autoRegister: false, system: "BaseSystem"});
                var entity = new BaseEntity();
                spyOn(regInstance, 'register');

                expect(regInstance.register).not.toHaveBeenCalled();
                entity.addComponent(regInstance);
                expect(regInstance.register).not.toHaveBeenCalled();
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