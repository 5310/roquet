(function () {

    // Team shape enum.
    Crafty.extend({
        BALL_TEAMS: {
            NONE: 0,
            QUAD: 1,
            TRI: 2,
            STAR: 3,
            HEX: 4
        }
    });

    // Array of shape graphics.
    var shapes = [
        new PIXI.Graphics(),
        new PIXI.Graphics(),
        new PIXI.Graphics(),
        new PIXI.Graphics(),
        new PIXI.Graphics()
    ];

    // Base radius.
    var radius = 16;

    // Base circle shaped graphic.
    shapes[0] = new PIXI.Graphics();
    shapes[0].beginFill(0xFFFFFF);
    shapes[0].drawCircle(0, 0, radius, radius);
    shapes[0].endFill();

    // Square shaped graphic.
    shapes[1] = new PIXI.Graphics();
    shapes[1].beginFill(0xFFFFFF);
    shapes[1].drawCircle(0, 0, radius, radius);
    shapes[1].endFill();
    shapes[1].beginFill(0x000000);
    var squareWidth = radius;
    shapes[1].drawRect(-0.5*squareWidth, -0.5*squareWidth, squareWidth, squareWidth);
    shapes[1].endFill();

    // Triangular graphic.
    shapes[2] = new PIXI.Graphics();
    shapes[2].beginFill(0xFFFFFF);
    shapes[2].drawCircle(0, 0, radius, radius);
    shapes[2].endFill();
    shapes[2].beginFill(0x000000);
    var triSpoke = radius*0.8;
    shapes[2].moveTo(0, -triSpoke);
    shapes[2].lineTo(
        Math.cos(Math.PI/6)*triSpoke,
        Math.sin(Math.PI/6)*triSpoke
    );
    shapes[2].lineTo(
        -Math.cos(Math.PI/6)*triSpoke,
        Math.sin(Math.PI/6)*triSpoke
    );
    shapes[2].endFill();

    // Star-shaped graphic.
    shapes[3] = new PIXI.Graphics();
    shapes[3].beginFill(0xFFFFFF);
    shapes[3].drawCircle(0, 0, radius, radius);
    shapes[3].endFill();
    shapes[3].beginFill(0x000000);
    var starSpoke = radius*0.75;
    var starCrease = 0.6;
    shapes[3].moveTo(0, -starSpoke);
    shapes[3].lineTo(
        Math.cos(Crafty.math.degToRad(18+36))*starSpoke*starCrease,
        -Math.sin(Crafty.math.degToRad(18+36))*starSpoke*starCrease
    );
    shapes[3].lineTo(
        Math.cos(Crafty.math.degToRad(18))*starSpoke,
        -Math.sin(Crafty.math.degToRad(18))*starSpoke
    );
    shapes[3].lineTo(
        Math.cos(Crafty.math.degToRad(54-36))*starSpoke*starCrease,
        Math.sin(Crafty.math.degToRad(54-36))*starSpoke*starCrease
    );
    shapes[3].lineTo(
        Math.cos(Crafty.math.degToRad(54))*starSpoke,
        Math.sin(Crafty.math.degToRad(54))*starSpoke
    );
    shapes[3].lineTo(
        0,
        starSpoke*starCrease
    );
    shapes[3].lineTo(
        -Math.cos(Crafty.math.degToRad(54))*starSpoke,
        Math.sin(Crafty.math.degToRad(54))*starSpoke
    );
    shapes[3].lineTo(
        -Math.cos(Crafty.math.degToRad(54-36))*starSpoke*starCrease,
        Math.sin(Crafty.math.degToRad(54-36))*starSpoke*starCrease
    );
    shapes[3].lineTo(
        -Math.cos(Crafty.math.degToRad(18))*starSpoke,
        -Math.sin(Crafty.math.degToRad(18))*starSpoke
    );
    shapes[3].lineTo(
        -Math.cos(Crafty.math.degToRad(18+36))*starSpoke*starCrease,
        -Math.sin(Crafty.math.degToRad(18+36))*starSpoke*starCrease
    );
    shapes[3].endFill();

    // Hexagonal graphic.
    shapes[4] = new PIXI.Graphics();
    shapes[4].beginFill(0xFFFFFF);
    shapes[4].drawCircle(0, 0, radius, radius);
    shapes[4].endFill();
    shapes[4].beginFill(0x000000);
    var hexSpoke = radius*0.7;
    shapes[4].moveTo(0, -hexSpoke);
    shapes[4].lineTo(Math.cos(Math.PI/6)*hexSpoke, -Math.sin(Math.PI/6)*hexSpoke);
    shapes[4].lineTo(Math.cos(Math.PI/6)*hexSpoke, Math.sin(Math.PI/6)*hexSpoke);
    shapes[4].lineTo(0, hexSpoke);
    shapes[4].lineTo(-Math.cos(Math.PI/6)*hexSpoke, Math.sin(Math.PI/6)*hexSpoke);
    shapes[4].lineTo(-Math.cos(Math.PI/6)*hexSpoke, -Math.sin(Math.PI/6)*hexSpoke);
    shapes[4].endFill();


    Crafty.c(
        "Ball",
        {
            init: function() {

                this.requires("PixiSprite, Color2, PhysicsBody");

                var self = this;

                self.Ball = {};

                self.Ball.team = 1;
                self.Ball.setTeam = function ( team ) {
                    self.Ball.team = team | Crafty.BALL_TEAMS.NONE;
                    self.PixiSprite.setTexture(shapes[self.Ball.team].generateTexture());
                    return self;
                };
                self.Ball.setTeam(Crafty.BALL_TEAMS.STAR);

                self.bind("Color2Change", function () {
                    this.PixiSprite.tint = this.Color2;
                });
                this.PixiSprite.tint = this.Color2;

                self.PixiSprite.blendMode = PIXI.blendModes.ADD;

                self.PhysicsBodySet('circle', {
                    restitution: 0.95,
                    mass: 0.05,
                    radius: radius
                });

            }
        }
    );

}());
