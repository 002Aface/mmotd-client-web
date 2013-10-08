define(
    ['graphics/Spritemap'],
    function(Spritemap){
        describe('The Spritesheet class', function(){

            var instance;

            beforeEach(function(){
                instance = new Spritemap('test_assets/imgs/spritesheet.png', 60, 60);
            });

            afterEach(function(){
                instance = undefined;
            });

        });
    }
);