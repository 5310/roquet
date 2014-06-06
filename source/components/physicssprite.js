(function () {

    Crafty.c(
        "PhysicsSprite",
        {
            init: function() {

                var self = this;

                self.requires("PhysicsBody, PixiSprite, Color2");

                self.PhysicsSprite = {};

                self.PhysicsSprite.overlay = undefined;

                self.PhysicsSprite.generateSprite = function() {

                    var shape = new PIXI.Graphics();
                    shape.beginFill(0xFFFFFF);
                    switch (self.PhysicsBody.name) {

                        case "circle":
                            shape.drawCircle(0, 0, self.PhysicsBody.radius);
                            break;

                        case "convex-polygon":
                            var vertices = self.PhysicsBody.geometry.vertices;
                            shape.moveTo(vertices.x, vertices.y);
                            for (var i = 0; i < vertices.length; i++){
                                var vert = vertices[i];
                                shape.lineTo(vert.x, vert.y);
                            }
                            break;

                        case "rectangle":
                            var width = self.PhysicsBody.width;
                            var height = self.PhysicsBody.width;
                            shape.drawRect(-width/2, -height/2, width, height);
                            break;

                    }
                    shape.endFill();

                    if ( typeof self.PhysicsSprite.overlay === "function" ) {
                        self.PhysicsSprite.overlay(shape);
                    }

                    self.PixiSprite.setTexture(shape.generateTexture());

                    self.PixiSprite.tint = self.Color2;
                    self.PixiSprite.blendMode = PIXI.blendModes.ADD;

                };

                self.bind("PhysicsBodyAddition", self.PhysicsSprite.generateSprite);

                self.PhysicsSprite.setOverlay = function(overlay) {
                    self.PhysicsSprite.overlay = overlay;
                    self.PhysicsSprite.generateSprite();
                };

                self.bind("Color2Change", function () {
                    self.PixiSprite.tint = self.Color2;
                });

            },

        }
    );

}());
