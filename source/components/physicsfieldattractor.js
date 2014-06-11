(function () {

    var field = function(data) {

        var body = data.body;

        // clone the position
        var acc = this.PhysicsBody.state.pos.clone();
        acc.vsub( body.state.pos );

        // get the distance
        var norm = acc.norm();

        // get the attraction factor
        var f = body.mass * this.PhysicsFieldAttractor.strength * Math.pow(norm, this.PhysicsFieldAttractor.order);

        // dampen the body
        body.state.vel.mult(this.PhysicsFieldAttractor.friction);

        // apply acceleration
        body.accelerate( acc.normalize().mult(f) );

    };

    Crafty.c(
        "PhysicsFieldAttractor",
        {
            init: function() {

                this.requires("PhysicsBody");

                this.PhysicsFieldAttractor = {};

                this.PhysicsFieldAttractor.strength = 0.01;
                this.PhysicsFieldAttractor.order = 0.5;
                this.PhysicsFieldAttractor.friction = 0.99;

                this.bind("PhysicsField", field.bind(this));
            },

        }
    );

}());
