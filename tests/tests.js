require.config({
    baseUrl: '../src',
    paths: {
        'underscore': 'lib/underscore',
        'jquery': 'lib/jquery-1.10.2.min'
    }
});

require(
    [
        "../tests/spec/EventEmitter",

        "../tests/spec/ecs/SystemsManager",
        "../tests/spec/ecs/entity/Base",
        "../tests/spec/ecs/component/Base",
        "../tests/spec/ecs/system/Base",

        "../tests/spec/utils/Timer",

        "../tests/spec/graphics/Drawable",
        "../tests/spec/graphics/Sprite",
        "../tests/spec/graphics/Spritemap",
        "../tests/spec/graphics/Scene",

        "../tests/spec/Renderer"
    ],
    function(){
        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;

        var htmlReporter = new jasmine.HtmlReporter();

        jasmineEnv.addReporter(htmlReporter);

        jasmineEnv.specFilter = function(spec) {
            return htmlReporter.specFilter(spec);
        };
        
        jasmineEnv.execute();
    }
);