(function () {

    var field = function(data) {

        var body = data.body;

        // clone the position
        var acc = this.PhysicsBody.state.pos.clone();
        acc.vsub( body.state.pos );

        // get the distance
        var norm = acc.norm();

        // get the g
        var g = this.PhysicsFieldAttractor.strength / Math.pow(norm, this.PhysicsFieldAttractor.order);

        // apply acceleration
        body.accelerate( acc.normalize().mult( g ) );

    };

    Crafty.c(
        "PhysicsFieldAttractor",
        {
            init: function() {

                this.requires("PhysicsBody");

                this.PhysicsFieldAttractor = {};

                this.PhysicsFieldAttractor.strength = 1;
                this.PhysicsFieldAttractor.order = 2;

                this.bind("PhysicsField", field.bind(this));
            },

        }
    );

}());
