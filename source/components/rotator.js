(function () {

    Crafty.c(
        "Rotator",
        {
            init: function() {

                this.requires("PixiSprite, Color2, PhysicsBody, PhysicsSprite, PhysicsFieldRotator");

                var self = this;

                self.Rotator = {};

                self.Rotator._radius = 24;

                self.Rotator._setRadius = function(radius) {
                    self.Rotator.radius = radius;
                    //TODO: Change body in-place, keeping all of state.
                    self.Rotator._setPhysicsBody();
                };

                self.Rotator._setPhysicsBody = function() {
                    self.PhysicsBodySet('circle', {
                        treatment: 'static',
                        radius: self.Rotator._radius
                    })
                    .Color2Set(Crafty.COLOR2_COLORS.DGRAY)
                    .then(function() {
                        this.PhysicsFieldRotator.strength = 0.05;
                        this.PhysicsFieldRotator.order = 0;
                    });
                };
                self.Rotator._setPhysicsBody();

                self.PhysicsSprite.addOverlay(function(shape, self) { //NOTE: Remember to call .PhysicsSprite.generateSprite() after altering direction.
                    shape.beginFill(0x000000, 0);
                    shape.lineStyle(2, 0x000000);
                    //TODO:
                    var angle = 0;
                    for (var i = 0; i < 6; i++ ) {
                        angle = i*Math.PI/3;
                        var x = Math.cos(angle)*self.Rotator._radius*0.6;
                        var y = Math.sin(angle)*self.Rotator._radius*0.6;
                        Crafty.COURT.graphicRoutines.shapes.arrow(
                            shape, self,
                            self.Rotator._radius/4,
                            (angle+Math.PI/2)*Math.sign(self.PhysicsFieldRotator.strength),
                            x, y);
                    }
                    shape.endFill();
                });

            }
        }
    );

}());
