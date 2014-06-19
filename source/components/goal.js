(function () {

    var field = function(data) {

        var body = data.body;

        if ( !body.entity.Ball ) {
            return;
        }

        var speed = body.state.vel.clone().norm();

        var valid = false;

        if ( speed <= this.Goal._speedLimit ) {
            Crafty.trigger("CourtGoalCaught", {goal: this, entity: body.entity});
            this.trigger("GoalCaught", {body: body});
        }

    };

    var number = 1;

    Crafty.c(
        "Goal",
        {
            init: function() {

                this.requires("PixiSprite, Color2, PhysicsBody, PhysicsSprite, PhysicsFieldAttractor");

                var self = this;

                self.Goal = {};

                self.Goal._radius = 2;
                self.Goal._margin = 22;

                self.Goal._speedLimit = 0.001;

                self.Goal.number = number++;

                self.Goal._setRadius = function(radius, margin) {
                    self.Goal._radius = radius;
                    if ( margin !== undefined ) self.Goal._margin = margin;
                    //TODO: Change body in-place, keeping all of state.
                    self.Goal._setPhysicsBody();
                };

                self.Goal._setPhysicsBody = function() {
                    self.PhysicsBodySet('circle', {
                        treatment: 'static',
                        radius: self.Goal._radius
                    })
                    .Color2Set(Crafty.COLOR2_COLORS.DGRAY)
                    .then(function() {
                        this.PhysicsFieldAttractor.strength = 0.005;
                        this.PhysicsFieldAttractor.order = 0.5;
                        this.PhysicsFieldAttractor.friction = 0.98;
                    });
                };
                self.Goal._setPhysicsBody();

                self.PhysicsSprite.addOverlay(function(shape, self) {
                    if ( self.Goal._margin > 0 ) {
                        shape.beginFill(0xffffff);
                        shape.drawCircle(0, 0, self.Goal._radius+self.Goal._margin);
                        shape.endFill();
                    }
                    shape.beginFill(0x000000);
                    Crafty.COURT.graphicRoutines.digit(shape, self, self.Goal._radius+self.Goal._margin, self.Goal.number);
                    shape.endFill();
                });

                this.bind("PhysicsField", field.bind(this));

            }
        }
    );

}());
