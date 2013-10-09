define(
    [
        'entity/Base',
        'component/Base'
    ],
    function(Entity, Base){
        describe("The Base E/C entity", function(){

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

            it("should have no components when instantiated", function(){
                expect(instance.components.length).toEqual(0);
            });

            it("should allow components to be added to itself", function(){
                var component = new Base();
                instance.addComponent(component);

                expect(instance.components.length).toEqual(1);
                expect(instance.components[0]).toBe(component);
            });

            it("should emit 'componentAdded' event when component added", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('componentAdded', cbSpy);
                expect(cbSpy).not.toHaveBeenCalled();

                var component = new Base();
                instance.addComponent(component);
                expect(cbSpy).toHaveBeenCalledWith('componentAdded', component);
            });

            it("should allow added components to be removed", function(){
                var component = new Base();
                instance.addComponent(component);
                expect(instance.components.length).toEqual(1);

                instance.removeComponent(component);
                expect(instance.components.length).toEqual(0);
            });

            it("should emit 'componentRemoved' event when component removed", function(){
                var component = new Base();
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
                var component = new Base();
                instance.addComponent(component);
                expect(instance.components.length).toEqual(1);

                expect(function(){ instance.addComponent(component); }).toThrow(new Error('Component already exists'));
            });

            it("should error if attempting to remove a component that has not been added", function(){
                var component = new Base();
                expect(instance.components.length).toEqual(0);

                expect(function(){ instance.removeComponent(component); }).toThrow(new Error('Component does not exist'));
            });

        });
    }
);