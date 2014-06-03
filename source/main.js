var init = function() {

    /* Initialize graphics. */

    // Initialize Pixi rendering system.
    Crafty.PIXIRENDERER.init(800, 480, 0x222222, document.getElementById('pixi-container'));

    // Center the container.
    Crafty.PIXIRENDERER.defaultContainer.x = 400;
    Crafty.PIXIRENDERER.defaultContainer.y = 240;

    // Add WebGL filter for more uniform color palette.
    var color = new PIXI.ColorMatrixFilter();
    color.matrix = [
        1, 0.3, 0.3, 0,
        0.2, 0.9, 0.3, 0,
        0.2, 0, 1, 0,
        0, 0, 0, 1
    ];
    Crafty.PIXIRENDERER.defaultContainer.filters = [color];

    // Demo balls.

    redBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.BALL_TEAMS.TRI)
        .Color2.setColor(Crafty.COLOR2_COLORS.RED)
        .then(function(){ this.PixiSprite.x -= 10; });
    greenBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.BALL_TEAMS.STAR)
        .Color2.setColor(Crafty.COLOR2_COLORS.GREEN);
    blueBall = Crafty.e("Thennable", "Ball")
        .Ball.setTeam(Crafty.BALL_TEAMS.HEX)
        .Color2.setColor(Crafty.COLOR2_COLORS.BLUE)
        .then(function(){ this.PixiSprite.x += 10; });

};

