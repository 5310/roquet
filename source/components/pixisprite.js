(function () {

    Crafty.c(
        "PixiSprite",
        {
            init: function() {

                var blankTexture = new PIXI.RenderTexture(0, 0);

                this.PixiSprite = new PIXI.Sprite(blankTexture);
                this.PixiSprite.anchor.x = 0.5;
                this.PixiSprite.anchor.y = 0.5;

            }
        }
    );

}());
