    // Define custom behavior for roquet collisions
    Physics.behavior( 'roquet-collision-field', function(parent) {

        return {

            // extended
            init: function( options ) {
                parent.init.call( this );
            },

            // extended
            connect: function( world ){
                world.on( 'collisions:detected', this.applyFields, this );
            },

            // extended
            disconnect: function( world ){
                world.off( 'collisions:detected', this.applyFields );
            },

            applyFields: function(data) {
                for ( var i = 0; i < data.collisions.length; i++ ) {
                    var collision = data.collisions[i];
                    //NOTE: Inelegant, but works. Ideally, you should be checking for entity and then if it has the Color2 component.
                    try {
                        collision.bodyA.entity.trigger("PhysicsField", {body: collision.bodyB});
                        collision.bodyB.entity.trigger("PhysicsField", {body: collision.bodyA});
                    } catch (e) {}
                }
            },

        };

    });
