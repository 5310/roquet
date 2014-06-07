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
        restitution: 0.8,
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

    // Test for hit-test.
    Crafty.bind("HammerTap", function(data) {
        console.log(Crafty.PHYSICSSIMULATOR.hitTest(data.point.x, data.point.y));
    });



    /* Add entities. */

    redBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.BALL_TEAMS.TRI)
        .Color2Set(Crafty.COLOR2_COLORS.RED)
        .PhysicsBodyPosition(100-50, 100);
    greenBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.BALL_TEAMS.STAR)
        .Color2Set(Crafty.COLOR2_COLORS.GREEN)
        .PhysicsBodyPosition(100, 100);
    blueBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.BALL_TEAMS.HEX)
        .Color2Set(Crafty.COLOR2_COLORS.BLUE)
        .PhysicsBodyPosition(100+50, 100);

    box = Crafty.e("Thennable", "Obstacle")
        .PhysicsBodySet('convex-polygon', {
            x: 400,
            y: 200,
            vertices: [
                { x: 0, y: 0 },
                { x: 0, y: 50 },
                { x: 100, y: 50 },
                { x: 100, y: 0 }
            ],
        });

    floor = Crafty.e("Thennable", "Obstacle")
        .PhysicsBodySet('convex-polygon', {
            x: 400,
            y: 400,
            vertices: [
                { x: -400, y: -30 },
                { x: -400, y: 30 },
                { x: 400, y: 30 },
//                { x: 400, y: -30 },
            ]
        });

};

