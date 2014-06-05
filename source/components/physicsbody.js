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
                    Crafty.trigger("PhysicsBodyRemoval", {body: this.PhysicsBody});
                    Crafty.PIXIRENDERER.world.remove(this.PhysicsBody);
                }

                // Add new body.
                this.PhysicsBody = body;
                Crafty.trigger("PhysicsBodyAddition", {body: this.PhysicsBody});
                Crafty.PHYSICSSIMULATOR.world.add( this.PhysicsBody );

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
