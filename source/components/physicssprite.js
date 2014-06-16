(function () {

    Crafty.c(
        "PhysicsSprite",
        {
            init: function() {

                var self = this;

                self.requires("PhysicsBody, PixiSprite");

                self.PhysicsSprite = {};

                self.PhysicsSprite.overlays = [];

                self.PhysicsSprite.generateSprite = function() {

                    var shape = new PIXI.Graphics();
                    shape.boundsPadding = 0;
                    shape.beginFill(0xFFFFFF);
                    switch (self.PhysicsBody.name) {

                        case "circle":
                            shape.drawCircle(0, 0, self.PhysicsBody.radius);
                            break;

                        case "convex-polygon":
                            var vertices = self.PhysicsBody.geometry.vertices;
                            var minX = vertices[0].x;
                            var minY = vertices[0].y;
                            shape.moveTo(vertices[0].x, vertices[0].y);
                            for (var i = 1; i < vertices.length; i++){
                                var vertex = vertices[i];
                                shape.lineTo(vertex.x, vertex.y);
                                minX = vertex.x < minX ? vertex.x : minX;
                                minY = vertex.y < minY ? vertex.y : minY;
                            }
                            //Note: Without acknowledging the padding added by the graphics object, the anchor will still be wrong. And without padding strokes will get cut off.
                            self.PixiSprite.anchor.x = (Math.abs(minX)+shape.boundsPadding)/shape.width;
                            self.PixiSprite.anchor.y = (Math.abs(minY)+shape.boundsPadding)/shape.height;
                            break;

                        case "rectangle":
                            var width = self.PhysicsBody.width;
                            var height = self.PhysicsBody.width;
                            shape.drawRect(-width/2, -height/2, width, height);
                            break;

                    }
                    shape.endFill();

                    for ( var i = 1; i < self.PhysicsSprite.overlays.length; i++) {
                        var overlay = self.PhysicsSprite.overlays[i];
                        if ( typeof overlay === 'function') {
                            overlay(shape, self);
                        }
                    }

                    self.PixiSprite.setTexture(shape.generateTexture());

                    self.PixiSprite.blendMode = PIXI.blendModes.ADD;

                };

                self.bind("PhysicsBodyAddition", self.PhysicsSprite.generateSprite);

                self.PhysicsSprite.addOverlay = function(overlay) {
                    self.PhysicsSprite.overlays.push(overlay);
                    self.PhysicsSprite.generateSprite();
                    return self;
                };

                self.PhysicsSprite.removeOverlay = function(overlay) {
                    for (var i = self.PhysicsSprite.overlays.length-1; i >= 0; i--) {
                        if (self.PhysicsSprite.overlays[i] == overlay) {
                            overlay(shape, self);
                            self.PhysicsSprite.overlays.splice(index, 1);
                            self.PhysicsSprite.generateSprite();
                            break;
                        }
                    }
                    return self;
                };

                self.bind("Color2Change", function () {
                    self.PixiSprite.tint = self.Color2;
                });

            },

        }
    );

}());
