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

    // Demo graphics.

    var spriteGraphics = new PIXI.Graphics();
    spriteGraphics.beginFill(0xFFFFFF);
    spriteGraphics.drawCircle(0, 0, 20, 20);
    spriteGraphics.endFill();
    spriteGraphics.beginFill(0x000000);
    spriteGraphics.drawRect(-8, -8, 16, 16);
    spriteGraphics.endFill();

    var redBall = Crafty.e("PixiSprite");
    redBall.PixiSprite.setTexture(spriteGraphics.generateTexture());
    Crafty.PIXIRENDERER.container.addChild(redBall.PixiSprite);
    redBall.PixiSprite.x -= 12;
    redBall.PixiSprite.blendMode = PIXI.blendModes.ADD;
    redBall.PixiSprite.tint = 0xFF0000;
    redBall.PixiSprite.rotation = 3.14/3;

    var greenBall = Crafty.e("PixiSprite");
    greenBall.PixiSprite.setTexture(spriteGraphics.generateTexture());
    Crafty.PIXIRENDERER.container.addChild(greenBall.PixiSprite);
    greenBall.PixiSprite.y += 20;
    greenBall.PixiSprite.blendMode = PIXI.blendModes.ADD;
    greenBall.PixiSprite.tint = 0x00FF00;
    redBall.PixiSprite.rotation = 3.14*2/3;

    var blueBall = Crafty.e("PixiSprite");
    blueBall.PixiSprite.setTexture(spriteGraphics.generateTexture());
    Crafty.PIXIRENDERER.container.addChild(blueBall.PixiSprite);
    blueBall.PixiSprite.x += 12;
    blueBall.PixiSprite.blendMode = PIXI.blendModes.ADD;
    blueBall.PixiSprite.tint = 0x0000FF;
    blueBall.PixiSprite.rotation = 1;

};

