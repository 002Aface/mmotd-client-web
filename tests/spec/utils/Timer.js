define(
    ['utils/Timer'],
    function(Timer){
        describe(
            "The Timer utility",
            function(){

                var timerSpy;

                beforeEach(function(){
                    timerSpy = jasmine.createSpy('timerSpy');
                    Timer.start();
                });

                afterEach(function(){
                    Timer.stop();
                });

                it('should fire one-off events only after the specified period', function(){
                    runs(function(){
                        Timer.add(function(){
                            timerSpy();
                        }, 100);
                    });
                    waitsFor(function(){
                        return timerSpy.calls.length == 1;
                    }, "event to be triggered", 101);
                });

                it('should fire repeating events once per period and stop after specified number of times', function(){
                    runs(function(){
                        Timer.add(function(){
                            timerSpy();
                        }, 100, 3);
                    });
                    waitsFor(function(){
                        return timerSpy.calls.length == 1;
                    }, "event to be triggered one time", 101);
                    waitsFor(function(){
                        return timerSpy.calls.length == 2;
                    }, "event to be triggered two times", 101);
                    waitsFor(function(){
                        return timerSpy.calls.length == 3;
                    }, "event to be triggered three times", 101);
                    waits(101);
                    runs(function(){
                        expect(timerSpy.calls.length).toEqual(3);
                    });
                });

                it('should fire repeating events forever when specified (sanity check, forever is untestable :)', function(){
                    runs(function(){
                        Timer.add(function(){
                            timerSpy();
                        }, 100, -1);
                    });
                    waitsFor(function(){
                        return timerSpy.calls.length == 1;
                    }, "event to be triggered one time", 101);
                    waitsFor(function(){
                        return timerSpy.calls.length == 2;
                    }, "event to be triggered two times", 101);
                    waitsFor(function(){
                        return timerSpy.calls.length == 3;
                    }, "event to be triggered three times", 101);
                    waitsFor(function(){
                        return timerSpy.calls.length == 10;
                    }, "event to be triggered ten times", 1001);

                });

                it('should not fire one-off events if they were removed before period expires', function(){
                    var timerEvent;
                    runs(function(){
                        timerEvent = Timer.add(function(){
                            timerSpy();
                        }, 100);
                    });
                    waits(51);
                    runs(function(){
                        Timer.remove(timerEvent);
                    });
                    waits(51);
                    runs(function(){
                        expect(timerSpy).not.toHaveBeenCalled();
                    });
                });

                it('should stop firing repeating events after they are removed', function(){
                    var timerEvent;
                    runs(function(){
                        timerEvent = Timer.add(function(){
                            timerSpy();
                        }, 100, -1);
                    });
                    waitsFor(function(){
                        return timerSpy.calls.length == 1;
                    }, "event to be triggered one time", 101);
                    waitsFor(function(){
                        return timerSpy.calls.length == 2;
                    }, "event to be triggered two times", 101);
                    waitsFor(function(){
                        return timerSpy.calls.length == 3;
                    }, "event to be triggered three times", 101);
                    runs(function(){
                        Timer.remove(timerEvent);
                    });
                    waits(101);
                    runs(function(){
                        expect(timerSpy.calls.length).toEqual(3);
                    });

                });
            }
        );
    }
);