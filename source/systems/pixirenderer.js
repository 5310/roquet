(function () {

    Crafty.extend({
        PIXIRENDERER: {

            stage: undefined,
            renderer: undefined,
            container: undefined,

            paused: false,

            init: function (width, height, color, parentElement) {

                width = width ? width : 800;
                height = height ? height : 480;
                color = color ? color : 0x222222;
                parentElement = parentElement ? parentElement : document.body;

                Crafty.PIXIRENDERER.stage = new PIXI.Stage(color);

                Crafty.PIXIRENDERER.renderer = PIXI.autoDetectRenderer(width, height);
                parentElement.appendChild(Crafty.PIXIRENDERER.renderer.view);

                Crafty.PIXIRENDERER.container = new PIXI.DisplayObjectContainer();
                Crafty.PIXIRENDERER.stage.addChild(Crafty.PIXIRENDERER.container);

                requestAnimFrame(Crafty.PIXIRENDERER.draw);

            },

            draw: function () {
                if (!Crafty.PIXIRENDERER.paused) {
                    Crafty.PIXIRENDERER.renderer.render(Crafty.PIXIRENDERER.stage);
                }
                requestAnimFrame(Crafty.PIXIRENDERER.draw);
            }

        }
    });

}());
