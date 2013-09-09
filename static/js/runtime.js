/**
  * runtime.js
  *
  *
  **/
define(
    // Name
    'runtime',
    // Dependencies
    ['ui', 'mapgen'],
    // Object
    function ( UIManager, MapGen ) {
        var RuntimeContext = {

            initialize : function( Game ) {

                this.Game = Game;
                this.UIManager = new UIManager (this.Game);
                this.MapGen = new MapGen(200, 'testseed');

                this.render();
                this.UIManager.loadEvents();

            },

            loadData : function () {

                var data = {
                    tstamp : 1378668434795,
                    plots  :    []
                };

                data.plots = this.MapGen.getPlotData();

                data.plots[4][4].attrs = {
                    role : 'defender',
                    team : 0
                };
                data.plots[5][6].attrs = {
                    role : 'defender',
                    team : 0
                };
                data.plots[5][7].attrs = {
                    role : 'attacker',
                    team : 0
                };
                data.plots[7][8].attrs = {
                    role : 'attacker',
                    team : 1
                };

                return data;
            },

            render : function () {
                var self  = this,
                    frame = 0;

                    self.Game.setData(self.loadData());

					(function animloop(){
						requestAnimFrame(animloop);

						//self.Game.setData(self.loadData());

						if (frame%2==0) {
							// UPDATE PLOTS
							self.UIManager.updatePlots();
						}

						frame++;
					})();
            }
        };

        return function( Game ) {
            _.extend(this,this);
            RuntimeContext.initialize( Game );
            return RuntimeContext;
        }
    }
);