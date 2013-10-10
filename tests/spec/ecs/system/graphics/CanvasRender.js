define(
    [
        'ecs/system/graphics/CanvasRender',
        'ecs/entity/Base',
        'ecs/component/Base',
        'ecs/component/core/Transform',
        'ecs/component/graphics/Sprite'
    ],
    function(CanvasRenderSystem, BaseEntity, BaseComponent, TransformComponent, SpriteComponent){
        describe('The Canvas Render system', function(){

            var instance;

            beforeEach(function(){
                jasmine.Clock.useMock();
                instance = new CanvasRenderSystem({ updateInterval: 100, autoStart:false, autoRegister: false, viewCanvas: null });
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

            it("should error when registering components without a 'graphic' property", function(){
                var baseComponent = new BaseComponent({ autoRegister: false });
                expect(function(){
                    instance.register(baseComponent);
                }).toThrow(new Error("Component is not renderable, missing 'graphic' property"));
            });

            it("should allow components that have a 'graphic' property to be registered", function(){
                var spriteComponent = new SpriteComponent({ graphic: 'test_assets/imgs/sprite.png', autoRegister: false });
                var entity = new BaseEntity({
                    components: [
                        new TransformComponent({ autoRegister: false }),
                        spriteComponent
                    ]
                });
                instance.register(spriteComponent);
                expect(instance.components.length).toEqual(1);
                expect(instance.components[0]).toBe(spriteComponent);
            });

            it("should draw components 'graphic' property to 'view' canvas on update", function(){
                instance.update();
                var beforeData = instance.view.toDataURL();
                var img = new Image();
                img.src = beforeData;

                var cbSpy = jasmine.createSpy('cbSpy');
                var spriteComponent = new SpriteComponent({ source: 'test_assets/imgs/sprite.png', autoRegister: false });
                spriteComponent.on('graphicLoaded', cbSpy);

                waitsFor(function(){
                    return cbSpy.calls.length == 1;
                }, 'sprite graphic to be loaded', 2000);
                runs(function(){
                    var entity = new BaseEntity({
                        components: [
                            new TransformComponent({ autoRegister: false }),
                            spriteComponent
                        ]
                    });
                    instance.register(spriteComponent);

                    instance.update();
                    var afterData = instance.view.toDataURL();
                    img = new Image();
                    img.src = afterData;

                    expect(beforeData).not.toEqual(afterData);
                });
            });

        });
    }
);