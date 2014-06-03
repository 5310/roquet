(function () {

    Crafty.c(
        "Thennable",
        {
            then: function (f) {
                f.call(this);
                return this;
            }
        }
    );

}());
