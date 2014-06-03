(function () {

    // BlankTexture need not be recreated every time.
    // But PIXI.RenderTextures cannot be created before a PIXI renderer is initialized.
    // So we have to monkeypatch this. :[
    var blankTexture = undefined;

    Crafty.c(
        "PixiSprite",
        {
            init: function() {

                // Create blank texture only if it hasn't already been created.
                if ( !blankTexture ) {
                    blankTexture = new PIXI.RenderTexture(0, 0);
                }

                this.PixiSprite = new PIXI.Sprite(blankTexture);
                this.PixiSprite.anchor.x = 0.5;
                this.PixiSprite.anchor.y = 0.5;
                Crafty.PIXIRENDERER.defaultContainer.addChild(this.PixiSprite);

            }
        }
    );

}());
