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

    // Add custom renderer.
    world.add( Physics.renderer('pixi-sprite-updater'));
    world.on('step', function(){
        world.render();
    });

//    // Dummy floor for tests.
//    floor = Physics.body('convex-polygon', {
//        // place the centroid of the polygon at (300, 200)
//        x: 400,
//        y: 400,
//        width: 800,
//        height: 60,
//        restitution: 0.5,
//        // the centroid is automatically calculated and used to position the shape
//        vertices: [
//            { x: -400, y: -30 },
//            { x: -400, y: 30 },
//            { x: 400, y: 30 }
//        ],
//    });
//    world.add( floor );
//    floor.entity = {Color2: 0xFFFFFF};

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

//    box = Crafty.e("Thennable", "PhysicsSprite")
//        .PhysicsBodySet('convex-polygon', {
//            vertices: [
//                { x: -50, y: -50 },
//                { x: -50, y: 50 },
//                { x: 50, y: 50 },
//                { x: 50, y: -50 }
//            ],
//        })
//        .then(function(){
//            this.PhysicsBodyPosition(400, 200);
//        });

    floor = Crafty.e("Thennable", "PhysicsSprite")
        .PhysicsBodySet('convex-polygon', {
            restitution: 0.5,
            // the centroid is automatically calculated and used to position the shape
            vertices: [
                { x: -400, y: -30 },
                { x: -400, y: 30 },
                { x: 400, y: 30 },
//                { x: 400, y: -30 },
            ],
        })
        .then(function(){
            this.PhysicsBodyPosition(400, 400);
            this.PixiSprite.pivot.x = -134;
            this.PixiSprite.pivot.y = 10;
        });

};

