(function () {

    var field = function(data) {

        var body = data.body;

        if ( !body.entity.PhysicsFieldCollision ) {
            return;
        }

        // clone the position
        var acc = this.PhysicsBody.state.pos.clone();
        acc.vsub( body.state.pos );

        // get the distance
        var norm = acc.norm();

        // get the rotation factor
        var f = body.mass * this.PhysicsFieldRotator.strength * Math.pow(norm, this.PhysicsFieldRotator.order);

        // dampen the body
        body.state.vel.mult(this.PhysicsFieldAttractor.friction);

        // apply rotational acceleration
        if ( this.PhysicsFieldRotator.orbital ) { // if field set to orbital rotation, rotate around center of field
            body.accelerate( acc.rotate(-Math.PI/2).normalize().mult(f) );
        } else { // if not, just rotate the body
            body.state.vel.rotate(f*Math.PI*10);
        }

        // apply rotation
        body.entity.PhysicsBodyRotation(body.entity.PhysicsBodyRotation()+f*Math.PI*10);

    };

    Crafty.c(
        "PhysicsFieldRotator",
        {
            init: function() {

                this.requires("PhysicsBody");

                this.PhysicsFieldRotator = {};

                this.PhysicsFieldRotator.strength = 1; // Positive for clockwise.
                this.PhysicsFieldRotator.order = -2;
                this.PhysicsFieldRotator.friction = 1;
                this.PhysicsFieldRotator.orbital = false;

                this.bind("PhysicsField", field.bind(this));
            },

        }
    );

}());
