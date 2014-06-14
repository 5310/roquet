(function () {

    Crafty.extend({
        COURT: {

            _pullBall: undefined,
            _pushPoint: new Physics.vector(),

            maxPuttForce: 0.002,
            maxPuttLength: 200,

            paused: false,
            turnLimit: 2000,
            turnTime: 0,

            init: function () {
                Crafty.bind("HammerHoldStart", Crafty.COURT._holdStart);
                Crafty.bind("HammerHoldEnd", Crafty.COURT._holdEnd);
            },

            tick: function(flag) {
                //TODO: Propagate pause-states to physics, rendering, etc. as needed.
                //TODO: And invoke the pause-screen, etc.
            },

            _holdStart: function(data) {

                var bodies = Crafty.PHYSICSSIMULATOR.hitTest(data.point);

                Crafty.COURT._pullBall = undefined;
                for (var i = 0; i < bodies.length; i++ ) { // Look for first valid target and save it.
                    var body = bodies[i];
                    if ( body.entity.Ball ) {
                        //TODO: Do game-rule-based validity check for ball.
                        Crafty.COURT._pullBall = body.entity;
                        break;
                    }
                }

                if ( !Crafty.COURT._pullBall ) { // Save pull coordinates if no valid target under cursor.
                    Crafty.COURT.paused = false; // Unpause when attempting a pull, as per design.
                    Crafty.COURT._pushPoint.set(data.point.x, data.point.y);
                }

            },
            _holdEnd: function(data) {

                var bodies = Crafty.PHYSICSSIMULATOR.hitTest(data.point);

                var maxForce = Crafty.COURT.maxPuttForce;
                var maxLength = Crafty.COURT.maxPuttLength;

                if (Crafty.COURT._pullBall) { // If there is a pull target, pull it.

                    var force = new Physics.vector(data.point.x, data.point.y);
                    force.vsub(Crafty.COURT._pullBall.PhysicsBody.state.pos);
                    var length = force.norm();
                    force.normalize().mult((force.norm() > maxLength ? maxForce : maxForce*length/maxLength));

                    Crafty.COURT._pullBall.PhysicsBody.applyForce(force);

                } else { // Otherwise, see if there's a push.

                    var bodies = Crafty.PHYSICSSIMULATOR.hitTest(data.point);

                    var pushBall = undefined;
                    for (var i = 0; i < bodies.length; i++ ) {
                        var body = bodies[i];
                        if ( body.entity.Ball ) {
                            //TODO: Do game-rule-based validity check for ball.
                            pushBall = body.entity;
                            break;
                        }
                    }
                    if (pushBall) { // Push if there's a valid target.

                        var force = new Physics.vector(Crafty.COURT._pushPoint.x, Crafty.COURT._pushPoint.y);
                        force.vsub(pushBall.PhysicsBody.state.pos);
                        var length = force.norm();
                        force.normalize().mult(-1*(length > maxLength ? maxForce : maxForce*length/maxLength));

                        pushBall.PhysicsBody.applyForce(force);

                    } else {
                        Crafty.COURT.paused = true; // Pause if no valid push.
                    }
                }
            },

        }
    });

}());
