    // Define custom behavior for roquet collisions
    Physics.behavior( 'roquet-collision-filter', function(parent) {

        return {

            // extended
            init: function( options ) {
                parent.init.call( this );
            },

            // extended
            connect: function( world ){
                world.on( 'collisions:detected', this.filter, this );
            },

            // extended
            disconnect: function( world ){
                world.off( 'collisions:detected', this.filter );
            },

            filter: function(data) {
                var collisions = [];
                for ( var i = 0; i < data.collisions.length; i++ ) {
                    var collision = data.collisions[i];
                    //NOTE: Inelegant, but works. Ideally, you should be checking for entity and then if it has the Color2 component.
                    try {
                        if ( collision.bodyA.entity.Color2 & collision.bodyB.entity.Color2 ) {
                            collisions.push(collision);
                        }
                    } catch (e) {}
                }
                if ( collisions.length ) {
                    this._world.emit( 'roquet:collisions:detected', {
                        collisions: collisions
                    });
                    Crafty.trigger("RoquetCollision", data);
                }
            },

        };

    });
