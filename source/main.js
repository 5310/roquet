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



    /* Initialize the court. */

    // Initialize the system.
    Crafty.COURT.init( Crafty.COURT.schemes.basic );

    // Add color filter.
    Crafty.COURT._effectsContainer.filterArea = new PIXI.Rectangle(0,0,800,480); // Reset filter area.
    Crafty.COURT._effectsContainer.filters = [color]; // Apply color filter to effects too.


};

