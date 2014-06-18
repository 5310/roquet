(function () {

    var overlay = function(shape, self) {
        var radius = self.Ball._radius;
        var team = self.Ball.team;
        var nextGoal = self.Ball.nextGoal;
        if (!self.Ball.showNextGoal) {
            switch (team) {
                case 1:
                    shape.beginFill(0x000000);
                    Crafty.COURT.graphicRoutines.shapes.quad(shape, self, radius);
                    shape.endFill();
                    break;
                case 2:
                    shape.beginFill(0x000000);
                    Crafty.COURT.graphicRoutines.shapes.tri(shape, self, radius);
                    shape.endFill();
                    break;
                case 3:
                    shape.beginFill(0x000000);
                    Crafty.COURT.graphicRoutines.shapes.star(shape, self, radius);
                    shape.endFill();
                    break;
                case 4:
                    shape.beginFill(0x000000);
                    Crafty.COURT.graphicRoutines.shapes.hex(shape, self, radius);
                    shape.endFill();
                    break;
            }
        } else {
            Crafty.COURT.graphicRoutines.digit(shape, self, radius, nextGoal);
        }
    };

    Crafty.c(
        "Ball",
        {
            init: function() {

                this.requires("PixiSprite, Color2, PhysicsBody, Color2Collision, PhysicsSprite, PhysicsFieldCollision");

                var self = this;

                self.Ball = {};

                self.Ball.team = 0;
                self.Ball.setTeam = function ( team ) {
                    if ( team != self.Ball.team ) {
                        self.Ball.team = team | Crafty.COURT.teams.NONE;
                        self.PhysicsSprite.generateSprite();
                    }
                    return self;
                };

                self.Ball.nextGoal = 1; // Number of the next goal the ball should be go. <= 0 for done!
                self.Ball.setNextGoal = function(goal) {
                    self.Ball.nextGoal = goal;
                    self.PhysicsSprite.generateSprite();
                };
                self.Ball.showNextGoal = false;
                self.Ball.setShowGoal = function(flag) {
                    self.Ball.showNextGoal = flag;
                    self.PhysicsSprite.generateSprite();
                };

                self.Ball._radius = 16;
                self.Ball._setRadius = function(radius) {
                    if ( radius != self.Ball.radius ) {
                        self.Ball.radius = radius;
                        //TODO: Change body in-place, keeping all of state.
                        self.Ball._setPhysicsBody();
                        self.PhysicsSprite.generateSprite();
                    }
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

                self.PhysicsSprite.addOverlay(overlay);

            }
        }
    );

}());
