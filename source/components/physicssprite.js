(function () {

    Crafty.c(
        "PhysicsSprite",
        {
            init: function() {

                this.requires("PhysicsBody, PixiSprite, Color2");

                this.bind("PhysicsBodyAddition", function() {

                    var shape = new PIXI.Graphics();
                    shape.beginFill(0xFFFFFF);
                    switch (this.PhysicsBody.name) {

                        case "circle":
                            shape.drawCircle(0, 0, this.PhysicsBody.radius);
                            break;

                        case "convex-polygon":
                            var vertices = this.PhysicsBody.geometry.vertices;
                            shape.moveTo(vertices.x, vertices.y);
                            for (var i = 0; i < vertices.length; i++){
                                var vert = vertices[i];
                                shape.lineTo(vert.x, vert.y);
                            }
                            break;

                        case "rectangle":
                            var width = this.PhysicsBody.width;
                            var height = this.PhysicsBody.width;
                            shape.drawRect(-width/2, -height/2, width, height);
                            break;

                    }
                    shape.endFill();

                    this.PixiSprite.setTexture(shape.generateTexture());

                    this.PixiSprite.tint = this.Color2;
                    this.PixiSprite.blendMode = PIXI.blendModes.ADD;

                });

                this.bind("Color2Change", function () {
                    this.PixiSprite.tint = this.Color2;
                });

            }
        }
    );

}());
