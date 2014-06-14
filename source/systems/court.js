(function () {

    Crafty.extend({
        COURT: {

            _pullBall: undefined,
            _pushPoint: new Physics.vector(),

            maxPuttForce: 0.002,
            maxPuttLength: 200,

            teams: {
                NONE: 0,
                QUAD: 1,
                TRI: 2,
                STAR: 3,
                HEX: 4
            },
            playingTeams: [],

            paused: false,
            turnLimit: 200,
            turnTime: 0,
            turnTeamIndex: 0,

            init: function ( playingTeams ) {

                Crafty.bind("PixiEnterFrame", Crafty.COURT._tick);
                Crafty.bind("HammerDoubleTap", Crafty.COURT._doubleTap);
                Crafty.bind("HammerHoldStart", Crafty.COURT._holdStart);
                Crafty.bind("HammerHoldEnd", Crafty.COURT._holdEnd);

                for ( var i in playingTeams ) {
                    Crafty.COURT.playingTeams[i] = {
                        team: playingTeams[i],
                        putts: 1,
                        goals: undefined,
                        score: undefined
                    };
                }

            },

            _tick: function() {
                if ( Crafty.COURT.paused ) {
                    Crafty.PHYSICSSIMULATOR.paused = true; // Play physics.
                    //TODO: Show the pause-overlay.
                    //TODO: Update the pause-overlay.
                } else {
                    Crafty.PHYSICSSIMULATOR.paused = false; // Pause physics.
                    //TODO: Hide the pause-overlay.
                    if ( Crafty.COURT.turnTime <= 0 ) { // If turn timer has run dry.
                        Crafty.COURT.turnTime = Crafty.COURT.turnLimit; // Reset timer.
                        Crafty.COURT.turnTeamIndex++; Crafty.COURT.turnTeamIndex %= Crafty.COURT.playingTeams.length; // Increment team tracker.
                        Crafty.COURT.playingTeams.putts = 1; // Reset team's available putt count.
                        Crafty.COURT.paused = true; // Pause again.
                        console.log("Current teamIndex: "+Crafty.COURT.turnTeamIndex); //NOTE:
                    } else {
                        Crafty.COURT.turnTime--; // Reduce current turn's time.
                    }
                }
            },

            _doubleTap: function(data) {
                Crafty.COURT.paused = !Crafty.COURT.paused;
            },

            _holdStart: function(data) {

                // Check if current team has any putts left at all before working.
                if ( Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].putts > 0 ) {

                    var bodies = Crafty.PHYSICSSIMULATOR.hitTest(data.point);

                    Crafty.COURT._pullBall = undefined;
                    for (var i = 0; i < bodies.length; i++ ) { // Look for first valid target and save it.
                        var body = bodies[i];
                        if ( body.entity.Ball ) {
                            // Check if a valid ball before registering as target.
                            if ( body.entity.Ball && body.entity.Ball.team == Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].team ) {
                                Crafty.COURT._pullBall = body.entity;
                                break;
                            }
                        }
                    }

                    if ( !Crafty.COURT._pullBall ) { // Save pull coordinates if no valid target under cursor.
                        Crafty.COURT._pushPoint.set(data.point.x, data.point.y);
                    }

                }

            },
            _holdEnd: function(data) {

                // Check if current team has any putts left at all before working.
                if ( Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].putts > 0 ) {

                    var bodies = Crafty.PHYSICSSIMULATOR.hitTest(data.point);

                    var maxForce = Crafty.COURT.maxPuttForce;
                    var maxLength = Crafty.COURT.maxPuttLength;

                    if (Crafty.COURT._pullBall) { // If there is a pull target, pull it.

                        // Calculate force.
                        var force = new Physics.vector(data.point.x, data.point.y);
                        force.vsub(Crafty.COURT._pullBall.PhysicsBody.state.pos);
                        var length = force.norm();
                        force.normalize().mult((force.norm() > maxLength ? maxForce : maxForce*length/maxLength));

                        Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].putts--; // Reduce available putts
                            console.log(Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].putts);
                        Crafty.COURT.paused = false; // Unpause if putt valid.
                        Crafty.COURT._pullBall.PhysicsBody.applyForce(force); // Apply force.

                    } else { // Otherwise, see if there's a push.

                        var bodies = Crafty.PHYSICSSIMULATOR.hitTest(data.point);

                        var pushBall = undefined;
                        for (var i = 0; i < bodies.length; i++ ) {
                            var body = bodies[i];
                            if ( body.entity.Ball ) {
                                // Check if a valid ball before registering as target.
                                if ( body.entity.Ball && body.entity.Ball.team == Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].team ) {
                                    pushBall = body.entity;
                                    break;
                                }
                            }
                        }
                        if (pushBall) { // Push if there's a valid target.

                            // Calculate force.
                            var force = new Physics.vector(Crafty.COURT._pushPoint.x, Crafty.COURT._pushPoint.y);
                            force.vsub(pushBall.PhysicsBody.state.pos);
                            var length = force.norm();
                            force.normalize().mult(-1*(length > maxLength ? maxForce : maxForce*length/maxLength));


                            Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].putts--; // Reduce available putts
                            console.log(Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].putts);
                            Crafty.COURT.paused = false; // Unpause if putt valid.
                            pushBall.PhysicsBody.applyForce(force); // Apply force.

                        }
                    }

                }
            },

        }
    });

}());
