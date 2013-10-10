define(
    [
        'ecs/entity/Base',
        'ecs/component/Base'
    ],
    function(BaseEntity, BaseComponent){
        describe("The Base E/C entity", function(){

            var instance;

            beforeEach(function(){
                instance = new BaseEntity();
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

            it("should have no components when instantiated", function(){
                expect(instance.components.length).toEqual(0);
            });

            it("should allow components to be added to itself", function(){
                var component = new BaseComponent({ autoRegister: false });
                instance.addComponent(component);

                expect(instance.components.length).toEqual(1);
                expect(instance.components[0]).toBe(component);
            });

            it("should call the onAdd function of components when added", function(){
                var component = new BaseComponent({ autoRegister: false });
                spyOn(component, 'onAdd');
                expect(component.onAdd).not.toHaveBeenCalled();
                instance.addComponent(component);
                expect(component.onAdd).toHaveBeenCalledWith(instance);
            });

            it("should emit 'componentAdded' event when component added", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('componentAdded', cbSpy);
                expect(cbSpy).not.toHaveBeenCalled();

                var component = new BaseComponent({ autoRegister: false });
                instance.addComponent(component);
                expect(cbSpy).toHaveBeenCalledWith('componentAdded', component);
            });

            it("should allow added components to be removed", function(){
                var component = new BaseComponent({ autoRegister: false });
                instance.addComponent(component);
                expect(instance.components.length).toEqual(1);

                instance.removeComponent(component);
                expect(instance.components.length).toEqual(0);
            });

            it("should call the onRemove function of components when removed", function(){
                var component = new BaseComponent({ autoRegister: false });
                spyOn(component, 'onRemove');

                instance.addComponent(component);
                expect(component.onRemove).not.toHaveBeenCalled();
                instance.removeComponent(component);
                expect(component.onRemove).toHaveBeenCalled();
            });

            it("should emit 'componentRemoved' event when component removed", function(){
                var component = new BaseComponent({ autoRegister: false });
                instance.addComponent(component);
                expect(instance.components.length).toEqual(1);

                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('componentRemoved', cbSpy);
                expect(cbSpy).not.toHaveBeenCalled();

                instance.removeComponent(component);
                expect(instance.components.length).toEqual(0);
                expect(cbSpy).toHaveBeenCalledWith('componentRemoved', component);
            });

            it("should error if attempting to add an already added component", function(){
                var component = new BaseComponent({ autoRegister: false });
                instance.addComponent(component);
                expect(instance.components.length).toEqual(1);

                expect(function(){ instance.addComponent(component); }).toThrow(new Error('Component already exists'));
            });

            it("should error if attempting to remove a component that has not been added", function(){
                var component = new BaseComponent({ autoRegister: false });
                expect(instance.components.length).toEqual(0);

                expect(function(){ instance.removeComponent(component); }).toThrow(new Error('Component does not exist'));
            });

            it("should allow components to specified in constructor", function(){
                var component = new BaseComponent({ autoRegister: false });
                var compEntity = new BaseEntity({
                    components: [ component ]
                });
                expect(compEntity.components.length).toEqual(1);
                expect(compEntity.components[0]).toBe(component);
            });

        });
    }
);