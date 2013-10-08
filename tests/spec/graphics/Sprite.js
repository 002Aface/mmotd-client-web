define(
    ['graphics/Sprite'],
    function(Sprite){
        describe('The Sprite class', function(){

            beforeEach(function(){
                instance = new Sprite('test_assets/imgs/sprite.png', 32, 32);
            });

            afterEach(function(){
                instance = undefined;
            });

        });
    }
);