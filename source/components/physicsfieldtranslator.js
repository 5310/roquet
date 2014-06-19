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

        // get the translation factor
        var f = body.mass * this.PhysicsFieldTranslator.strength * Math.pow(norm, this.PhysicsFieldTranslator.order);

        // dampen the body
        body.state.vel.mult(this.PhysicsFieldAttractor.friction);

        // apply translational acceleration
        if ( this.PhysicsFieldTranslator.normalize ) {
            body.accelerate( this.PhysicsFieldTranslator.direction.clone().normalize().mult(f) );
        } else {
            body.accelerate( this.PhysicsFieldTranslator.direction.clone().mult(f) );
        }

    };

    Crafty.c(
        "PhysicsFieldTranslator",
        {
            init: function() {

                this.requires("PhysicsBody");

                this.PhysicsFieldTranslator = {};

                this.PhysicsFieldTranslator.strength = 1;
                this.PhysicsFieldTranslator.order = 0;
                this.PhysicsFieldTranslator.friction = 1;
                this.PhysicsFieldTranslator.direction = new Physics.vector(1,0);
                this.PhysicsFieldTranslator.normalize = false;

                this.bind("PhysicsField", field.bind(this));
            },

        }
    );

}());
