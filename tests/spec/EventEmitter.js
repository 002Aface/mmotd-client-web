define(
    [
        'EventEmitter'
    ],
    function(EventEmitter){
        describe("The Event Emitter", function(){

            var instance;

            beforeEach(function(){
                instance = new EventEmitter();
            });

            afterEach(function(){
                instance = undefined;
            });

            it("should have no registered listeners when instantiated", function(){
                expect(Object.keys(instance.listeners).length).toEqual(0);
            });

            it("should have callable on, off and emit functions", function(){
                expect(instance.on).toBeDefined();
                expect(instance.on instanceof Function).toEqual(true);
                expect(instance.off).toBeDefined();
                expect(instance.off instanceof Function).toEqual(true);
                expect(instance.emit).toBeDefined();
                expect(instance.emit instanceof Function).toEqual(true);
            });

            it("should allow callbacks to be registered for events", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('event', cbSpy);
                expect(instance.listeners.hasOwnProperty('event')).toBe(true);
                expect(instance.listeners['event'].length).toEqual(1);
                expect(instance.listeners['event'][0]).toEqual(cbSpy);
            });

            it("should allow registered callbacks to be unregistered", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('event', cbSpy);
                expect(instance.listeners['event'][0]).toEqual(cbSpy);
                instance.off('event', cbSpy);
                expect(instance.listeners['event'].length).toEqual(0);
            });

            it("should allow all callbacks to be unregistered for a specific event", function(){
                var cbSpy1 = jasmine.createSpy('cbSpy1');
                var cbSpy2 = jasmine.createSpy('cbSpy2');
                instance.on('event', cbSpy1);
                instance.on('event', cbSpy2);
                expect(instance.listeners['event'].length).toEqual(2);
                instance.off('event');
                expect(instance.listeners['event'].length).toEqual(0);
            });

            it("should allow a callback to be unregistered from all events", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('event1', cbSpy);
                instance.on('event2', cbSpy);
                expect(instance.listeners['event1'][0]).toEqual(cbSpy);
                expect(instance.listeners['event2'][0]).toEqual(cbSpy);
                instance.off(cbSpy);
                expect(instance.listeners['event1'].length).toEqual(0);
                expect(instance.listeners['event2'].length).toEqual(0);
            });

            it("should execute registered callbacks when event is emitted", function(){
                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('event', cbSpy);
                expect(cbSpy).not.toHaveBeenCalled();
                instance.emit('event');
                expect(cbSpy).toHaveBeenCalled();
            });

            it("should continue executing registered callbacks if one throws an error", function(){
                var errorFunc = jasmine.createSpy('errorFunc').andCallFake(function(){ throw Error(); });
                instance.on('event', errorFunc);
                expect(errorFunc).not.toHaveBeenCalled();

                var cbSpy = jasmine.createSpy('cbSpy');
                instance.on('event', cbSpy);
                expect(cbSpy).not.toHaveBeenCalled();

                instance.emit('event');
                expect(errorFunc).toHaveBeenCalled();
                expect(cbSpy).toHaveBeenCalled();
            });

        });
    }
);