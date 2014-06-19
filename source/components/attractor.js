(function () {

    Crafty.c(
        "Attractor",
        {
            init: function() {

                this.requires("PixiSprite, Color2, PhysicsBody, PhysicsSprite, PhysicsFieldAttractor");

                var self = this;

                self.Attractor = {};

                self.Attractor._radius = 24;
                self.Attractor._margin = 0;

                self.Attractor._setRadius = function(radius, margin) {
                    self.Attractor._radius = radius;
                    if ( margin !== undefined ) self.Attractor._margin = margin;
                    //TODO: Change body in-place, keeping all of state.
                    self.Attractor._setPhysicsBody();
                };

                self.Attractor._setPhysicsBody = function() {
                    self.PhysicsBodySet('circle', {
                        treatment: 'static',
                        radius: self.Attractor._radius
                    })
                    .Color2Set(Crafty.COLOR2_COLORS.DGRAY)
                    .then(function() {
                        this.PhysicsFieldAttractor.strength = 0.01;
                        this.PhysicsFieldAttractor.order = 0.5;
                        this.PhysicsFieldAttractor.friction = 0.995;
                    });
                };
                self.Attractor._setPhysicsBody();

                self.PhysicsSprite.addOverlay(function(shape, self) { //NOTE: Remember to call .PhysicsSprite.generateSprite() after altering direction.
                    if ( self.Attractor._margin > 0 ) {
                        shape.beginFill(0xffffff);
                        shape.drawCircle(0, 0, self.Attractor._radius+self.Attractor._margin);
                        shape.endFill();
                    }
                    shape.beginFill(0x000000, 0);
                    shape.lineStyle(2, 0x000000);
                    //TODO:
                    var angle = Math.PI/4;
                    for (var i = 0; i < 4; i++ ) {
                        angle = i*Math.PI/2;
                        var x = Math.cos(angle)*(self.Attractor._radius+self.Attractor._margin)*0.6;
                        var y = Math.sin(angle)*(self.Attractor._radius+self.Attractor._margin)*0.6;
                        Crafty.COURT.graphicRoutines.shapes.arrow(
                            shape, self,
                            (self.Attractor._radius+self.Attractor._margin)/3,
                            (angle+Math.PI)*Math.sign(self.PhysicsFieldAttractor.strength),
                            x, y);
                    }
                    shape.endFill();
                });

            }
        }
    );

}());
