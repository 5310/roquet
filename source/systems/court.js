(function () {

    Crafty.extend({
        COURT: {

            _pullBall: undefined,
            _pushPoint: new Physics.vector(),

            maxPuttForce: 0.0005,
            maxPuttLength: 200,

            teams: {
                NONE: 0,
                QUAD: 1,
                TRI: 2,
                STAR: 3,
                HEX: 4
            },
            playingTeams: [],

            scoreTarget: 6,

            paused: false,
            turnLimit: 200,
            turnTime: 0,
            turnTeamIndex: 0,

            init: function ( data ) {

                // Bind handlers.

                Crafty.bind("PhysicsStep", Crafty.COURT._step);

                Crafty.bind("CourtGoalCaught", Crafty.COURT._goal);

                Crafty.bind("HammerDoubleTap", Crafty.COURT._doubleTap);
                Crafty.bind("HammerHoldStart", Crafty.COURT._holdStart);
                Crafty.bind("HammerHoldEnd", Crafty.COURT._holdEnd);

                //TODO: Initialize all the court entities: balls, obstacles, goals.

                // Set-up playing teams' states.
                for ( var i in data.playingTeams ) {
                    Crafty.COURT.playingTeams[i] = {
                        team: data.playingTeams[i],
                        putts: 1,
                        score: 0
                    };
                }

                //TODO: Calculate target score from number of balls and goals.

            },

            pause: function() {
                Crafty.trigger('CourtPause');
                Crafty.COURT.paused = true; // Set flag.
                Crafty.PHYSICSSIMULATOR.world.pause(); // Pause physics.
            },

            unpause: function() {
                Crafty.trigger('CourtUnpause');
                Crafty.COURT.paused = false; // Set flag.
                Crafty.PHYSICSSIMULATOR.world.unpause(); // Unpause physics.
            },

            _step: function(meta) {
                Crafty.COURT._warp(); // Warp physics as per turn-time.
                //TODO: Hide the pause-overlay.
                if ( Crafty.COURT.turnTime <= 0 ) { // If turn timer has run dry.
                    Crafty.bind('CourtTurnOver');
                    Crafty.COURT.turnTime = Crafty.COURT.turnLimit; // Reset timer.
                    Crafty.COURT.turnTeamIndex++; Crafty.COURT.turnTeamIndex %= Crafty.COURT.playingTeams.length; // Increment team tracker.
                    Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].putts = 1; // Reset team's available putt count.
                    Crafty.COURT.pause(); // Pause again.
                    console.log("Current teamIndex: "+Crafty.COURT.turnTeamIndex); //NOTE:
                } else {
                    Crafty.COURT.turnTime--; // Reduce current turn's time.
                }
            },

            _warp: function() {
                var easePart = 10;
                var invTime = Crafty.COURT.turnLimit - Crafty.COURT.turnTime;
                var easeTime = Crafty.COURT.turnLimit/easePart;
                var warp;
                if (invTime <= easeTime) {
                    warp = invTime/easeTime;
                } else if (Crafty.COURT.turnTime <= easeTime) {
                    warp = Crafty.COURT.turnTime/easeTime;
                }
                if (warp <= 0) {
                    warp = 0.001;
                }
                Crafty.PHYSICSSIMULATOR.world.warp(warp);
            },

            _goal: function(data) {

                var ball = data.entity;
                var goal = data.goal;

                console.log("next goal: "+ball.Ball.nextGoal+
                            " current goal: "+goal.Goal.number+
                            " own team: "+ball.Ball.team+
                            " current team: "+Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].team); //NOTE:

                if (ball.Ball.nextGoal == goal.Goal.number) {
                    console.log('GOAL!'); //NOTE:
                    Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].score++;
                    ball.Ball.nextGoal++;
                    if (Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].score >= Crafty.COURT.scoreTarget) {
                        console.log('WIN!'); //NOTE:
                        //TODO: Victory routine.
                    }
                }

            },

            _doubleTap: function(data) {
                Crafty.COURT.unpause();
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
                        Crafty.COURT.unpause(); // Unpause if putt valid.
                        Crafty.COURT._pullBall.PhysicsBody.applyForce(force); // Apply force.

                    } else { // Otherwise, see if there's a push.

                        var bodies = Crafty.PHYSICSSIMULATOR.hitTest(data.point);

                        var pushBall;
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
                            Crafty.COURT.unpause(); // Unpause if putt valid.
                            pushBall.PhysicsBody.applyForce(force); // Apply force.

                        }
                    }

                }
            },

        }
    });

}());
