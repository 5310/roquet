    // Define custom behavior for roquet collisions
    Physics.behavior( 'roquet-velocity-clamp', function(parent) {

        var defaults = {
            max: 1
        };

        return {

            // extended
            init: function( options ) {
                parent.init.call( this );
                this.options.defaults( defaults );
                this.options( options );
            },

            // extended
            connect: function( world ){
                world.on( 'integrate:positions', this.clamp, this );
                //TODO: This only invokes _after_ a force has been applied for one tick, making the shape jump. Unacceptable.
            },

            // extended
            disconnect: function( world ){
                world.off( 'integrate:positions', this.clamp );
            },

            clamp: function(data) {
                var bodies = data.bodies;
                var max = this.options.max;
                for ( var i = 0; i < bodies.length; i++ ) {
                    var body = bodies[i];
                    var vel = body.state.vel;
                    var norm = vel.norm();
                    if (norm > max) {
                        vel.normalize().mult(max);
                    }
                }
            },

        };

    });
