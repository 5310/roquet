var init = function() {

    /* Initialize graphics. */

    // Initialize Pixi rendering system.
    Crafty.PIXIRENDERER.init(800, 480, 0x222222, document.getElementById('pixi-container'));

    // Add WebGL filter for more uniform color palette.
    var color = new PIXI.ColorMatrixFilter();
    color.matrix = [
        1, 0.3, 0.3, 0,
        0.2, 0.9, 0.3, 0,
        0.2, 0, 1, 0,
        0, 0, 0, 1
    ];
    Crafty.PIXIRENDERER.defaultContainer.filters = [color];



    /* Initialize physics. */

    // Initialize the base world.
    Crafty.PHYSICSSIMULATOR.init();

    // Alias world.
    world = Crafty.PHYSICSSIMULATOR.world;

    // Add gravity.
    world.add( Physics.behavior('constant-acceleration', {
        acc: { x : 0, y: 0.0004 } // this is the default
    }) );

    // Add basic collision detection
    world.add( Physics.behavior('sweep-prune') );
    world.add( Physics.behavior('body-collision-detection') );

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

    // Add roquet collision filters.
    world.add( Physics.behavior('edge-collision-detection', {
        aabb: Physics.aabb(0, 0, 800, 480),
        restitution: 0.2,
        cof: 0.8,
        channel: 'roquet:collisions:detected'
    }) );
    world.add( Physics.behavior('body-impulse-response', { check: 'roquet:collisions:detected' })  );

    // Add collision impulses only for roquet collisions.
    world.add( Physics.behavior('roquet-collision-filter') );

    //TODO: Custom renderer that updates entity.PixiSprite
    Crafty.bind("PixiEnterFrame", function(){
        var bodies = Crafty.PHYSICSSIMULATOR.world.getBodies();
        for ( var i = 0; i < bodies.length; i++ ) {
            var body = bodies[i];
            //NOTE: Inelegant, but works. Ideally, you should be checking for entity and then if it has the PixiSprite component.
            try {
                body.entity.PixiSprite.x = body.state.pos.x;
                body.entity.PixiSprite.y = body.state.pos.y;
                body.entity.PixiSprite.rotation = body.state.angular.pos;
            } catch (e) {}
        }
    });

    // Dummy floor for tests.
    floor = Physics.body('convex-polygon', {
        // place the centroid of the polygon at (300, 200)
        x: 400,
        y: 400,
        width: 800,
        height: 60,
        restitution: 0.5,
        // the centroid is automatically calculated and used to position the shape
        vertices: [
            { x: -400, y: -30 },
            { x: -400, y: 30 },
            { x: 400, y: 30 }
        ],
    });
    world.add( floor );
    floor.entity = {Color2: 0xFFFFFF};

    // Test for hit-test.
    Crafty.bind("HammerTap", function(data) {
        console.log(Crafty.PHYSICSSIMULATOR.hitTest(data.point.x, data.point.y));
    });


    /* Add entities. */

    redBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.BALL_TEAMS.TRI)
        .Color2Set(Crafty.COLOR2_COLORS.RED)
        .then(function(){ this.PhysicsBodyPosition(100-50, 100); });
    greenBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.BALL_TEAMS.STAR)
        .Color2Set(Crafty.COLOR2_COLORS.GREEN)
        .then(function(){ this.PhysicsBodyPosition(100, 100); });
    blueBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.BALL_TEAMS.HEX)
        .Color2Set(Crafty.COLOR2_COLORS.BLUE)
        .then(function(){ this.PhysicsBodyPosition(100+50, 100); });

};

