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
        "../tests/spec/ecs/component/graphics/Sprite",
        "../tests/spec/ecs/component/core/Transform",

        "../tests/spec/ecs/system/Base",
        "../tests/spec/ecs/system/graphics/CanvasRender",

        "../tests/spec/utils/Timer"
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