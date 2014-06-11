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

    Crafty.c(
        "Goal",
        {
            init: function() {

                this.requires("PixiSprite, Color2, PhysicsBody, PhysicsSprite, PhysicsFieldAttractor");

                var self = this;

                self.Goal = {};

                self.Goal._radius = 24;
                self.Goal._speedLimit = 0.001;

                self.Goal._setRadius = function(radius) {
                    self.Goal.radius = radius;
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
                        this.PhysicsFieldAttractor.friction = 0.99;
                    });
                };
                self.Goal._setPhysicsBody();

                this.bind("PhysicsField", field.bind(this));

            }
        }
    );

}());
