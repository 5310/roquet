    Physics.behavior( 'roquet-angular-damp', function(parent) {

        var defaults = {
            factor: 1
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
                world.on( 'integrate:positions', this.damp, this );
            },

            // extended
            disconnect: function( world ){
                world.off( 'integrate:positions', this.damp );
            },

            damp: function(data) {
                var bodies = data.bodies;
                for ( var i = 0; i < bodies.length; i++ ) {
                    var body = bodies[i];
                    body.state.angular.vel *= this.options.factor;
                }
            },

        };

    });
