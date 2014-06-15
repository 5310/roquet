(function () {

    Crafty.extend({
        PHYSICSSIMULATOR: {

            world: undefined,

            paused: false,

            init: function (options) {

                options = options | {};

                Crafty.PHYSICSSIMULATOR.world = Physics(options);

                Physics.util.ticker.on(function( time ){
                    Crafty.PHYSICSSIMULATOR._tick( time );
                });
                Physics.util.ticker.start();

                Crafty.PHYSICSSIMULATOR.world.on('step', function(meta){
                    Crafty.trigger("PhysicsStep", meta);
                });

            },

            _tick: function (time) {
                if (!Crafty.PHYSICSSIMULATOR.paused) {
                    Crafty.PHYSICSSIMULATOR.world.step(time);
                }
            },

            hitTest: function(x, y) {

                var point = Physics.vector(x, y);

                var hitCandidates = Crafty.PHYSICSSIMULATOR.world.find({ $at: point });

                var hits = [];
                for (var i = 0; i < hitCandidates.length; i++ ) {
                    var hit = hitCandidates[i];
                    var contained = false;
                    switch(hit.geometry.name) {

                        //Note: the relative bit should go inside geometry as an inimplemented method called isPointInHull
                        //and body should also gain a wrapper that does the translation.

                        case "circle":
                            contained = point.dist(hit.state.pos) <= hit.radius;
                            break;

                        case "convex-polygon":
                            var translatedPoint = point.clone().vsub(hit.state.pos).rotate(hit.state.angular.pos); // note the v in vsub.
                            contained = Physics.geometry.isPointInPolygon(translatedPoint, hit.geometry.vertices);
                            break;

                        case "rectangle":
                            var translatedPoint = point.clone().vsub(hit.state.pos).rotate(hit.state.angular.pos); // note the v in vsub.
                            contained = Math.abs(translatedPoint.x) <= hit.width/2 && Math.abs(translatedPoint.y) <= hit.height/2;
                            break;

                         //Note: Shouldnot exist, point is supopsed to be the bare minimum
//                            case "point":
//                                var margin = 0.0001;
//                                container = point.dist(hit.state.pos) <= margin;
//                                break;

                    }
                    if (contained) {
                        hits.push(hit);
                    }
                }

                return hits;

            }

        }
    });

}());
