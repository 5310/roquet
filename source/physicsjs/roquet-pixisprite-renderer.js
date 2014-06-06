Physics.renderer('pixi-sprite-updater', function( parent ){

    var defaults = {
        offset: { x: 0, y: 0 }
    };

    return {

        // extended
        init: function( options ){

            if (typeof PIXI === 'undefined') {
                throw "PIXI obj not present - cannot continue ";
            }

            // call parent init
            parent.init.call(this, options);

        },

        /**
         * PixiRenderer#drawBody( body, view )
         * - body (Body): The body to draw
         * - view (DisplayObject): The pixi display object
         *
         * Draw a PIXI.DisplayObject to the stage.
         **/
        drawBody: function( body, view ){
            var pos = body.state.pos
                ,v = body.state.vel
                ,t = this._interpolateTime || 0
                ,x
                ,y
                ,ang
                ;

            // interpolate positions
            x = pos.x + v.x * t;
            y = pos.y + v.y * t;
            ang = body.state.angular.pos + body.state.angular.vel * t;

            view.position.x = x;
            view.position.y = y;
            view.rotation = ang;
        },

        // extended
        render: function( bodies, meta ){
            for ( var i = 0; i < bodies.length; i++ ) {
                var body = bodies[i];
                //NOTE: Inelegant, but works. Ideally, you should be checking for entity and then if it has the PixiSprite component.
                try {
                    this.drawBody(body, body.entity.PixiSprite);
                } catch (e) {}
            }
        }
    };
});
