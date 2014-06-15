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
        acc: { x : 0, y: 0.0001 } // this is the default
    }) );

    // Set integrator and drag.
    world.add( Physics.integrator('verlet', {drag: 0.001}) );

    // Add a maximum velocity clamp.
    world.add( Physics.behavior('roquet-velocity-clamp', { max: 1.5 }) );

    // Add an angular velocity damper.
    world.add( Physics.behavior('roquet-angular-damp', { factor: 0.99 }) );

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

    // Add field behavior.
    world.add( Physics.behavior('roquet-collision-field') );

    // Add custom renderer.
    world.add( Physics.renderer('pixi-sprite-updater'));
    world.on('step', function(){
        world.render();
    });

//    // Test for hit-test.
//    Crafty.bind("HammerTap", function(data) {
//        console.log(Crafty.PHYSICSSIMULATOR.hitTest(data.point.x, data.point.y));
//    });



    /* Initialize the court. */
    Crafty.COURT.init( [Crafty.COURT.teams.TRI, Crafty.COURT.teams.STAR, Crafty.COURT.teams.HEX] );



    /* Add demo entities. */

    redBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.COURT.teams.TRI)
        .Color2Set(Crafty.COLOR2_COLORS.RED)
        .PhysicsBodyPosition(100-50, 100);
    greenBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.COURT.teams.STAR)
        .Color2Set(Crafty.COLOR2_COLORS.GREEN)
        .PhysicsBodyPosition(100, 100);
    blueBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.COURT.teams.HEX)
        .Color2Set(Crafty.COLOR2_COLORS.BLUE)
        .PhysicsBodyPosition(100+50, 100);
    yellowBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.COURT.teams.TRI)
        .Color2Set(Crafty.COLOR2_COLORS.YELLOW)
        .PhysicsBodyPosition(100-50+20, 100+50);
    cyanBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.COURT.teams.STAR)
        .Color2Set(Crafty.COLOR2_COLORS.CYAN)
        .PhysicsBodyPosition(100+20, 100+50);
    magentaBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.COURT.teams.HEX)
        .Color2Set(Crafty.COLOR2_COLORS.MAGENTA)
        .PhysicsBodyPosition(100+50+20, 100+50);

    attractor = Crafty.e("Thennable", "Goal")
        .PhysicsBodyPosition(150, 240);

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

