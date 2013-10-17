define(
    [
        'ecs/component/graphics/AnimatedSprite'
    ],
    function(AnimatedSpriteComponent){
        describe("The Animated Sprite component", function(){

            var instance;

            beforeEach(function(){
                jasmine.Clock.useMock();
                instance = new AnimatedSpriteComponent({
                    autoRegister: false,
                    system: "CanvasRenderSystem",
                    source: "test_assets/imgs/spritesheet.png",
                    frameHeight: 60,
                    frameWidth: 60
                });
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should have an empty array _animations after instantiation", function(){
                expect(instance._animations).toBeDefined();
                expect(Object.keys(instance._animations).length).toEqual(0);
            });

            it("should allow animations to be specified with a name, keyframes and a framerate", function(){
                expect(instance.addAnimation).toBeDefined();
                instance.addAnimation("default", {
                    frames: [0, 1, 2],
                    loop: true,
                    rate: 15  // frames per second
                });
                expect(Object.keys(instance._animations).length).toEqual(1);
                expect(instance._animations['default'].frames).toEqual([0, 1, 2]);
                expect(instance._animations['default'].rate).toEqual(15);
            });

            it("should allow animations to be set using the play function", function(){
                instance.addAnimation("testPlay", {
                    frames: [6, 7, 8, 9, 10],
                    loop: true,
                    rate: 20
                });
                expect(instance.play).toBeDefined();
                instance.play('testPlay');
                expect(instance.currentFrame).toEqual(6);
            });

            it("should change frames at the specified rate when playing", function(){
                instance.addAnimation("testRate", {
                    frames: [6, 7, 8, 9, 10],
                    loop: true,
                    rate: 20
                });
                instance.play('testRate');
                expect(instance.currentFrame).toEqual(6);
                jasmine.Clock.tick(51);
                expect(instance.currentFrame).toEqual(7);
                jasmine.Clock.tick(51);
                expect(instance.currentFrame).toEqual(8);
            });

            it("should loop animation if specified", function(){
                instance.addAnimation("testLoop", {
                    frames: [11, 12, 13],
                    loop: true,
                    rate: 10
                });
                instance.play('testLoop');
                expect(instance.currentFrame).toEqual(11);
                jasmine.Clock.tick(101);
                expect(instance.currentFrame).toEqual(12);
                jasmine.Clock.tick(101);
                expect(instance.currentFrame).toEqual(13);
                jasmine.Clock.tick(101);
                expect(instance.currentFrame).toEqual(11);
            });

            it("should not loop if loop is false", function(){
                instance.addAnimation("testNoLoop", {
                    frames: [11, 12, 13],
                    loop: false,
                    rate: 10
                });
                instance.play('testNoLoop');
                expect(instance.currentFrame).toEqual(11);
                jasmine.Clock.tick(101);
                expect(instance.currentFrame).toEqual(12);
                jasmine.Clock.tick(101);
                expect(instance.currentFrame).toEqual(13);
                jasmine.Clock.tick(101);
                expect(instance.currentFrame).toEqual(13);
    
            });
        });
    }
);
