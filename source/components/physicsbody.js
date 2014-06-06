(function () {

    Crafty.c(
        "PhysicsBody",
        {
            PhysicsBody: undefined,
            PhysicsBodySet: function(name, options) {

                options = options ? options : {};

                // Create new body and add back-reference.
                var body = Physics.body(name, options);
                body.entity = this;

                // Remove preexisting body.
                if (this.PhysicsBody) {
                    Crafty.trigger("PhysicsSimulationBodyRemoval", {body: this.PhysicsBody});
                    Crafty.PHYSICSSIMULATOR.world.remove(this.PhysicsBody);
                    this.trigger("PhysicsBodyRemoval");
                }

                // Add new body.
                this.PhysicsBody = body;
                Crafty.trigger("PhysicsSimulationBodyAddition", {body: this.PhysicsBody});
                Crafty.PHYSICSSIMULATOR.world.add( this.PhysicsBody );
                this.trigger("PhysicsBodyAddition");

                return this;

            },
            PhysicsBodyPosition: function( x, y ) {
                if (x !== undefined ) {
                    this.PhysicsBody.state.pos.x = x;
                    this.PhysicsBody.state.old.pos.x = x;
                    this.PhysicsBody.state.pos.y = y;
                    this.PhysicsBody.state.old.pos.y = y;
                    return this;
                } else {
                    return this.PhysicsBody.state.pos;
                }
            },
            PhysicsBodyRotation: function( angle ) {
                if (angle !== undefined ) {
                    this.PhysicsBody.state.angular.pos = angle;
                    this.PhysicsBody.state.old.angular.pos = angle;
                    return this;
                } else {
                    return this.PhysicsBody.state.angular.pos;
                }
            }
        }
    );

}());
