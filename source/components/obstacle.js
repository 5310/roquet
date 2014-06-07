(function () {

    Crafty.c(
        "Obstacle",
        {
            init: function() {

                this.requires("PixiSprite, Color2, PhysicsBody, PhysicsSprite");
                //NOTE: As obstacles will need to be spawned in custom shapes and positions, it makes little sense to do it in init.
                //However, note that it's been preliminarily tested that the default mass, cof, and restitution functions are fine.

            }
        }
    );

}());
