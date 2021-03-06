/**
  * main.js
  *
  *
  **/
define(
    // Dependencies
    ['game','runtime'],
    // Object
    function( Game, Runtime) {
        var App = {

            initialize : function() {

                this.Game = new Game({
                    domContainer : document.getElementById('game') || document.createElement('div'),
                    frameAttrs : {
                        height : window.innerHeight,
                        width  : window.innerWidth
                    }
                });

                if (this.Game.ready()) {
                    this.beginSession();
                }

            },

            beginSession : function() {
                this.session = new Runtime( this.Game );
            },

            endSession : function() {
                this.session.end();
            }

        };
        App.initialize();
    }
);