define(
    [
        'ecs/component/core/Transform'
    ],
    function(TransformComponent){
        describe("The Transform component", function(){

            var instance;

            beforeEach(function(){
                instance = new TransformComponent();
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should have geometry properties", function(){
                expect(instance.x).toBeDefined();
                expect(instance.y).toBeDefined();
                expect(instance.width).toBeDefined();
                expect(instance.height).toBeDefined();
                expect(instance.x).toEqual(0);
                expect(instance.y).toEqual(0);
                expect(instance.width).toEqual(0);
                expect(instance.height).toEqual(0);
            });

            it("should allow geometry properties to be set in constructor opts", function(){
                var regInstance = new TransformComponent({x:10, y: 10, width: 100, height: 100});
                expect(regInstance.x).toEqual(10);
                expect(regInstance.y).toEqual(10);
                expect(regInstance.width).toEqual(100);
                expect(regInstance.height).toEqual(100);
            });
        });
    }
);