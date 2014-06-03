(function () {

    Crafty.extend({
        HAMMERER: {

            element: undefined,
            hammerer: undefined,

            init: function (element) {

                Crafty.HAMMERER.element = element;
                Crafty.HAMMERER.hammerer = Hammer(Crafty.HAMMERER.element);

                var _debug = function(event, log) {
                    var center = localCenter(event, Crafty.HAMMERER.element);
                    console.log(event.type+" at x:"+center.x+" y:"+center.y);
                    if (log) console.log(event);
                };

                var localCenter = function(event, element) {
                    element = element ? element : event.gesture.target;
                    var elementBoundingRect = element.getBoundingClientRect();
                    var center = {
                        x: event.gesture.center.clientX - elementBoundingRect.left,
                        y: event.gesture.center.clientY - elementBoundingRect.top,
                    };
                    return center;
                };

                var held = false;

                Crafty.HAMMERER.hammerer.on("tap", function(event) {
                    var point = localCenter(event);
                    Crafty.trigger("HammerTap", {point: point, event: event});
                });

                Crafty.HAMMERER.hammerer.on("doubletap", function(event) {
                    var point = localCenter(event);
                    Crafty.trigger("HammerDoubleTap", {point: point, event: event});
                });

                Crafty.HAMMERER.hammerer.on("hold", function(event) {
                    var point = localCenter(event, Crafty.HAMMERER.element);
                    held = true;
                    Crafty.trigger("HammerHoldStart", {point: point, event: event});
                });

                Crafty.HAMMERER.hammerer.on("dragstart", function(event) {
                    var point = localCenter(event, Crafty.HAMMERER.element);
                    if (!held) {
                        Crafty.trigger("HammerDragStart", {point: point, event: event});
                    }
                });

                Crafty.HAMMERER.hammerer.on("drag", function(event) {
                    var point = localCenter(event, Crafty.HAMMERER.element);
                    if (held) {
                        Crafty.trigger("HammerHoldDrag", {point: point, event: event});
                    } else {
                        Crafty.trigger("HammerDrag", {point: point, event: event});
                    }
                });

                Crafty.HAMMERER.hammerer.on("release", function(event) {
                    var point = localCenter(event, Crafty.HAMMERER.element);
                    if (held) {
                        Crafty.trigger("HammerHoldEnd", {point: point, event: event});
                        held = false;
                    }
                });

                Crafty.HAMMERER.hammerer.on("dragend", function(event) {
                    var point = localCenter(event, Crafty.HAMMERER.element);
                    if (!held) {
                        Crafty.trigger("HammerDragEnd", {point: point, event: event});
                    }
                });

                Crafty.HAMMERER.hammerer.on("pinch", function(event) {
                    var point = localCenter(event, Crafty.HAMMERER.element);
                    if (!held) {
                        Crafty.trigger("HammerPinch", {point: point, event: event});
                    }
                });

            },

        }
    });

}());
