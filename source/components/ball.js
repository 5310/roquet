(function () {

    // Base radius.
    var radius = 16;

    // Array of shape overlay routines.
    var shapeOverlays = [];
    shapeOverlays[Crafty.COURT.teams.QUAD] = function(shape, self) {
        var radius = self.Ball._radius;
        Crafty.COURT.shapes.QUAD(shape, self, radius);
    };
    shapeOverlays[Crafty.COURT.teams.TRI] = function(shape, self) {
        var radius = self.Ball._radius;
        Crafty.COURT.shapes.TRI(shape, self, radius);
    };
    shapeOverlays[Crafty.COURT.teams.STAR] = function(shape, self) {
        var radius = self.Ball._radius;
        Crafty.COURT.shapes.STAR(shape, self, radius);
    };
    shapeOverlays[Crafty.COURT.teams.HEX] = function(shape, self) {
        var radius = self.Ball._radius;
        Crafty.COURT.shapes.HEX(shape, self, radius);
    };


    Crafty.c(
        "Ball",
        {
            init: function() {

                this.requires("PixiSprite, Color2, PhysicsBody, Color2Collision, PhysicsSprite, PhysicsFieldCollision");

                var self = this;

                self.Ball = {};

                self.Ball._radius = 16;

                self.Ball.team = 1;
                self.Ball.nextGoal = 1; // Number of the next goal the ball should be go. <= 0 for done!

                self.Ball._setRadius = function(radius) {
                    self.Ball.radius = radius;
                    //TODO: Change body in-place, keeping all of state.
                    self.Ball._setPhysicsBody();
                    self.PhysicsSprite.generateSprite();
                    return self;
                };

                self.Ball._setPhysicsBody = function() {
                    self.PhysicsBodySet('circle', {
                        restitution: 0.9,
                        mass: 0.01,
                        radius: self.Ball._radius
                    });
                };
                self.Ball._setPhysicsBody();
                //NOTE: The above properties have been prelimianarily balanced to have the most suitable feel
                //in terms of movement and collisions with default Obstacle entities.
                //With it, a suitable region of force has been tested to be applied for putting the Balls of that mass. It's around 0.002.

                self.Ball.setTeam = function ( team ) {
                    if ( team != self.Ball.team ) {
                        self.PhysicsSprite.removeOverlay(shapeOverlays[self.Ball.team], false);
                        self.PhysicsSprite.overlays.pop();
                        self.Ball.team = team | Crafty.COURT.teams.NONE;
                        self.PhysicsSprite.addOverlay(shapeOverlays[self.Ball.team], false);
                        self.PhysicsSprite.generateSprite();
                    }
                    return self;
                };
                self.Ball.setTeam(Crafty.COURT.teams.NONE);

            }
        }
    );

}());
