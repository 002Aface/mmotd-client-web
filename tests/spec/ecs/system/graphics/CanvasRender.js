define(
    [
        'ecs/system/graphics/CanvasRender',
        'ecs/entity/Base',
        'ecs/component/Base',
        'ecs/component/core/Transform',
        'ecs/component/graphics/Sprite',
        'ecs/SystemsManager'
    ],
    function(CanvasRenderSystem, BaseEntity, BaseComponent, TransformComponent, SpriteComponent, SystemsManager){
        describe('The Canvas Render system', function(){

            var instance;
            var manager;

            beforeEach(function(){
                jasmine.Clock.useMock();
                instance = new CanvasRenderSystem({ updateInterval: 100, autoStart:false, autoRegister: false, viewCanvas: null });
                manager = new SystemsManager();
                manager.unregisterAll();
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should have a non-empty 'identifier' property for use with Systems Manager", function(){
                expect(typeof instance.identifier).toEqual("string");
                expect(instance.identifier).toEqual("CanvasRenderSystem");
            });

            it("should provide a dom-ready canvas element via the 'view' property after instantiation", function(){
                expect(instance.view).toBeDefined();
                expect(instance.view instanceof HTMLElement).toEqual(true);
                expect(instance.view.nodeName.toLowerCase() === "canvas").toEqual(true);
            });

            it("should allow the 'view' canvas element to be specified in its constructor", function(){
                var viewCanvas = document.createElement('canvas');
                var viewInstance = new CanvasRenderSystem({ updateInterval: 100, autoStart:false, autoRegister: false, viewCanvas: viewCanvas });
                expect(viewInstance.view).toBe(viewCanvas);
            });


            // TODO This is sanity here, this should really be checked when a component is added to an entity, but currently components are auto
            // registered on constructor. Perhaps auto registration should be moved to when a component is added to an entity?
            // This would make a lot more sense as a component should not be acted on by a system outside of an entity.
            it("should error when registering a component whose attached entity does not also have a TransformComponent", function(){
                var spriteComponent = new SpriteComponent({ graphic: 'test_assets/imgs/sprite.png', autoRegister: false });
                var entity = new BaseEntity({
                    components: [ spriteComponent ]
                });

                expect(function(){
                    instance.register(spriteComponent);
                }).toThrow(new Error("Attached entity has no transform, cannot register component"));
            });

            it("should error when registering components without a 'graphic' property", function(){
                var baseComponent = new BaseComponent({ autoRegister: false });
                expect(function(){
                    instance.register(baseComponent);
                }).toThrow(new Error("Component is not renderable, missing 'graphic' property"));
            });

            it("should allow components that have both a 'graphic' property and an associated transform component to be registered", function(){
                var spriteComponent = new SpriteComponent({ graphic: 'test_assets/imgs/sprite.png', autoRegister: false });
                var entity = new BaseEntity({
                    components: [
                        spriteComponent,
                        new TransformComponent({ autoRegister: false })
                    ]
                });
                instance.register(spriteComponent);
                expect(instance.components.length).toEqual(1);
                expect(instance.components[0]).toBe(spriteComponent);
            });

            it("should draw components 'graphic' property to 'view' canvas on update", function(){
                assert(false).toBe(true);
            });

        });
    }
);