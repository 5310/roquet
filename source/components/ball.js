(function () {

    // Base radius.
    var radius = 16;

    // Array of shape overlay routines.
    var shapeOverlays = [];
    shapeOverlays[Crafty.COURT.teams.QUAD] = function(shape, self) {
        var radius = self.Ball._radius;
        shape.beginFill(0x000000);
        var squareWidth = radius;
        shape.drawRect(-0.5*squareWidth, -0.5*squareWidth, squareWidth, squareWidth);
        shape.endFill();
    };
    shapeOverlays[Crafty.COURT.teams.TRI] = function(shape, self) {
        var radius = self.Ball._radius;
        shape.beginFill(0x000000);
        var triSpoke = radius*0.8;
        shape.moveTo(0, -triSpoke);
        shape.lineTo(
            Math.cos(Math.PI/6)*triSpoke,
            Math.sin(Math.PI/6)*triSpoke
        );
        shape.lineTo(
            -Math.cos(Math.PI/6)*triSpoke,
            Math.sin(Math.PI/6)*triSpoke
        );
        shape.endFill();
    };
    shapeOverlays[Crafty.COURT.teams.STAR] = function(shape, self) {
        var radius = self.Ball._radius;
        shape.beginFill(0x000000);
        var starSpoke = radius*0.75;
        var starCrease = 0.6;
        shape.moveTo(0, -starSpoke);
        shape.lineTo(
            Math.cos(Crafty.math.degToRad(18+36))*starSpoke*starCrease,
            -Math.sin(Crafty.math.degToRad(18+36))*starSpoke*starCrease
        );
        shape.lineTo(
            Math.cos(Crafty.math.degToRad(18))*starSpoke,
            -Math.sin(Crafty.math.degToRad(18))*starSpoke
        );
        shape.lineTo(
            Math.cos(Crafty.math.degToRad(54-36))*starSpoke*starCrease,
            Math.sin(Crafty.math.degToRad(54-36))*starSpoke*starCrease
        );
        shape.lineTo(
            Math.cos(Crafty.math.degToRad(54))*starSpoke,
            Math.sin(Crafty.math.degToRad(54))*starSpoke
        );
        shape.lineTo(
            0,
            starSpoke*starCrease
        );
        shape.lineTo(
            -Math.cos(Crafty.math.degToRad(54))*starSpoke,
            Math.sin(Crafty.math.degToRad(54))*starSpoke
        );
        shape.lineTo(
            -Math.cos(Crafty.math.degToRad(54-36))*starSpoke*starCrease,
            Math.sin(Crafty.math.degToRad(54-36))*starSpoke*starCrease
        );
        shape.lineTo(
            -Math.cos(Crafty.math.degToRad(18))*starSpoke,
            -Math.sin(Crafty.math.degToRad(18))*starSpoke
        );
        shape.lineTo(
            -Math.cos(Crafty.math.degToRad(18+36))*starSpoke*starCrease,
            -Math.sin(Crafty.math.degToRad(18+36))*starSpoke*starCrease
        );
        shape.endFill();
    };
    shapeOverlays[Crafty.COURT.teams.HEX] = function(shape, self) {
        var radius = self.Ball._radius;
        shape.beginFill(0x000000);
        var hexSpoke = radius*0.7;
        shape.moveTo(0, -hexSpoke);
        shape.lineTo(Math.cos(Math.PI/6)*hexSpoke, -Math.sin(Math.PI/6)*hexSpoke);
        shape.lineTo(Math.cos(Math.PI/6)*hexSpoke, Math.sin(Math.PI/6)*hexSpoke);
        shape.lineTo(0, hexSpoke);
        shape.lineTo(-Math.cos(Math.PI/6)*hexSpoke, Math.sin(Math.PI/6)*hexSpoke);
        shape.lineTo(-Math.cos(Math.PI/6)*hexSpoke, -Math.sin(Math.PI/6)*hexSpoke);
        shape.endFill();
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
                    self.Ball.setTeam(self.Ball.team);
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
                    self.Ball.team = team | Crafty.COURT.teams.NONE;
                    self.PhysicsSprite.addOverlay(shapeOverlays[self.Ball.team]);
                    return self;
                };
                self.Ball.setTeam(Crafty.COURT.teams.NONE);

            }
        }
    );

}());
