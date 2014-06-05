(function () {

    Crafty.extend({
        COLOR2_COLORS: {
            BACK: 0x000000,
            DGRAY: 0x222222,
            LGRAY: 0x999999,
            WHITE: 0xFFFFFF,
            RED: 0xFF0000,
            YELLOW: 0xFFFF00,
            GREEN: 0x00FF00,
            CYAN: 0x00FFFF,
            BLUE: 0x0000FF,
            MAGENTA: 0xFF00FF
        }
    });

    Crafty.c(
        "Color2",
        {
            init: function() {
                this.Color2 = 0xFFFFFF;
            },
            Color2Set: function (color) {
                this.Color2 = color;
                this.trigger("Color2Change");
                return this;
            }
        }
    );

}());
