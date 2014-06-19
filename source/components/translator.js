(function () {

    Crafty.c(
        "Translator",
        {
            init: function() {

                this.requires("PixiSprite, Color2, PhysicsBody, PhysicsSprite, PhysicsFieldTranslator");

                var self = this;

                self.Translator = {};

                self.Translator._radius = 24;
                self.Translator._margin = 0;

                self.Translator._setRadius = function(radius, margin) {
                    self.Translator._radius = radius;
                    if ( margin !== undefined ) self.Translator._margin = margin;
                    //TODO: Change body in-place, keeping all of state.
                    self.Translator._setPhysicsBody();
                };

                self.Translator._setPhysicsBody = function() {
                    self.PhysicsBodySet('circle', {
                        treatment: 'static',
                        radius: self.Translator._radius
                    })
                    .Color2Set(Crafty.COLOR2_COLORS.DGRAY)
                    .then(function() {
                        this.PhysicsFieldTranslator.strength = 0.005;
                        this.PhysicsFieldTranslator.order = 0;
                    });
                };
                self.Translator._setPhysicsBody();

                self.PhysicsSprite.addOverlay(function(shape, self) { //NOTE: Remember to call .PhysicsSprite.generateSprite() after altering direction.
                    if ( self.Translator._margin > 0 ) {
                        shape.beginFill(0xffffff);
                        shape.drawCircle(0, 0, self.Translator._radius+self.Translator._margin);
                        shape.endFill();
                    }
                    shape.beginFill(0x000000, 0);
                    shape.lineStyle(2, 0x000000);
                    Crafty.COURT.graphicRoutines.shapes.arrow(
                        shape, self,
                        (self.Translator._radius+self.Translator._margin)/2,
                        self.PhysicsFieldTranslator.direction.angle()*Math.sign(self.PhysicsFieldTranslator.strength)
                    );
                    shape.endFill();
                });

            }
        }
    );

}());
