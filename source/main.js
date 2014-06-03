var init = function() {

    /* Initialize graphics. */

    // Initialize Pixi rendering system.
    Crafty.PIXIRENDERER.init(800, 480, 0x222222, document.getElementById('pixi-container'));

    // Center the container.
    Crafty.PIXIRENDERER.container.x = 400;
    Crafty.PIXIRENDERER.container.y = 240;

    // Add WebGL filter for more uniform color palette.
    var color = new PIXI.ColorMatrixFilter();
    color.matrix = [
        1, 0.3, 0.3, 0,
        0.2, 0.9, 0.3, 0,
        0.2, 0, 1, 0,
        0, 0, 0, 1
    ];
    Crafty.PIXIRENDERER.container.filters = [color];

    // Demo balls.

    redBall = Crafty.e("Ball")
        .Ball.setTeam(Crafty.BALL_TEAMS.TRI)
        .Color2.setColor(Crafty.COLOR2_COLORS.RED);
    greenBall = Crafty.e("Ball")
        .Ball.setTeam(Crafty.BALL_TEAMS.STAR)
        .Color2.setColor(Crafty.COLOR2_COLORS.GREEN);
    blueBall = Crafty.e("Ball")
        .Ball.setTeam(Crafty.BALL_TEAMS.HEX)
        .Color2.setColor(Crafty.COLOR2_COLORS.BLUE);

};

