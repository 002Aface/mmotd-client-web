define(
    [
        'ecs/component/graphics/Sprite',
        'ecs/entity/Base',
        'ecs/component/core/Transform'
    ],
    function(SpriteComponent, BaseEntity, TransformComponent){
        describe("The Sprite component", function(){

            var instance;

            beforeEach(function(){
                instance = new SpriteComponent({autoRegister: false, system: "CanvasRenderSystem"});
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should have a graphic property when instantiated", function(){
                expect(instance.graphic).toBeDefined();
            });

            it("should have graphic set to an empty image if no source specified", function(){
                expect(instance.graphic instanceof Image).toBe(true);
                expect(instance.graphic.src).toEqual("");
            });

            it("should set graphic src to that provided in constructor", function(){
                var srcInstance = new SpriteComponent({autoRegister: false, system: "CanvasRenderSystem", source:"test_assets/imgs/sprite.png"});
                expect(srcInstance.graphic.src).toContain("test_assets/imgs/sprite.png");
            });

            it("should emit 'graphicLoaded' when source is specified in constructor", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                expect(cbSpy).not.toHaveBeenCalled();
                var srcInstance = new SpriteComponent({autoRegister: false, system: "CanvasRenderSystem", source:"test_assets/imgs/sprite.png"});
                srcInstance.on('graphicLoaded', cbSpy);
                waitsFor(function(){
                    return cbSpy.wasCalled;
                }, 'Sprite to load source image', 2000);
            });

            it("should emit 'graphicLoaded' when source is updated", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('graphicLoaded', cbSpy);
                expect(cbSpy).not.toHaveBeenCalled();
                instance.graphic.src = "test_assets/imgs/sprite.png";
                waitsFor(function(){
                    return cbSpy.wasCalled;
                }, 'Sprite to load source image', 2000);
                
            });

            it("should error when attaching to an entity if the entity does not have a Transform component", function(){
                var entity = new BaseEntity();
                expect(function(){
                    entity.addComponent(instance);
                }).toThrow(new Error('Entity has no transform, cannot register component'));
            });

            it("should successfully attach to an entity when the entity does have a Transform component", function(){
                var entity = new BaseEntity();
                entity.addComponent(new TransformComponent());

                expect(instance.entity).toBeNull();
                entity.addComponent(instance);
                expect(instance.entity).toBe(entity);
            });

            it("should be able to reference the associated transform component directly after being attached", function(){
                var entity = new BaseEntity();
                var transform = new TransformComponent();
                entity.addComponent(transform);

                expect(instance.transform).toBeUndefined();
                entity.addComponent(instance);
                expect(instance.transform).toBeDefined();
                expect(instance.transform).toBe(transform);
            });

        });
    }
);