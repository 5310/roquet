(function () {

    Crafty.extend({
        COURT: {

            schemes: {},

            _pullBall: undefined,
            _pushPoint: new Physics.vector(),
            _lastPoint: undefined,

            maxPuttForce: 0.0005,
            maxPuttLength: 400,

            teams: {
                NONE: 0,
                QUAD: 1,
                TRI: 2,
                STAR: 3,
                HEX: 4
            },
            playingTeams: [],

            graphicRoutines: {
                shapes: {
                    quad: function(shape, self, radius, x, y) {
                        var x = x !== undefined ? x : 0;
                        var y = y !== undefined ? y : 0;
                        var radius = radius ? radius : 10;
                        var squareWidth = radius;
                        shape.drawRect(x-0.5*squareWidth, y-0.5*squareWidth, squareWidth, squareWidth);
                    },
                    tri: function(shape, self, radius, x, y) {
                        var x = x !== undefined ? x : 0;
                        var y = y !== undefined ? y : 0;
                        var radius = radius ? radius : 10;
                        var triSpoke = radius*0.8;
                        shape.moveTo(x+0, y-triSpoke);
                        shape.lineTo(
                            x+Math.cos(Math.PI/6)*triSpoke,
                            y+Math.sin(Math.PI/6)*triSpoke
                        );
                        shape.lineTo(
                            x-Math.cos(Math.PI/6)*triSpoke,
                            y+Math.sin(Math.PI/6)*triSpoke
                        );
                        shape.lineTo(x+0, y-triSpoke);
                    },
                    star: function(shape, self, radius, x, y) {
                        var x = x !== undefined ? x : 0;
                        var y = y !== undefined ? y : 0;
                        var radius = radius ? radius : 10;
                        var starSpoke = radius*0.75;
                        var starCrease = 0.6;
                        shape.moveTo(x+0, y-starSpoke);
                        shape.lineTo(
                            x+Math.cos(Crafty.math.degToRad(18+36))*starSpoke*starCrease,
                            y-Math.sin(Crafty.math.degToRad(18+36))*starSpoke*starCrease
                        );
                        shape.lineTo(
                            x+Math.cos(Crafty.math.degToRad(18))*starSpoke,
                            y-Math.sin(Crafty.math.degToRad(18))*starSpoke
                        );
                        shape.lineTo(
                            x+Math.cos(Crafty.math.degToRad(54-36))*starSpoke*starCrease,
                            y+Math.sin(Crafty.math.degToRad(54-36))*starSpoke*starCrease
                        );
                        shape.lineTo(
                            x+Math.cos(Crafty.math.degToRad(54))*starSpoke,
                            y+Math.sin(Crafty.math.degToRad(54))*starSpoke
                        );
                        shape.lineTo(
                            x+0,
                            y+starSpoke*starCrease
                        );
                        shape.lineTo(
                            x-Math.cos(Crafty.math.degToRad(54))*starSpoke,
                            y+Math.sin(Crafty.math.degToRad(54))*starSpoke
                        );
                        shape.lineTo(
                            x-Math.cos(Crafty.math.degToRad(54-36))*starSpoke*starCrease,
                            y+Math.sin(Crafty.math.degToRad(54-36))*starSpoke*starCrease
                        );
                        shape.lineTo(
                            x-Math.cos(Crafty.math.degToRad(18))*starSpoke,
                            y-Math.sin(Crafty.math.degToRad(18))*starSpoke
                        );
                        shape.lineTo(
                            x-Math.cos(Crafty.math.degToRad(18+36))*starSpoke*starCrease,
                            y-Math.sin(Crafty.math.degToRad(18+36))*starSpoke*starCrease
                        );
                        shape.lineTo(x+0, y-starSpoke);
                    },
                    hex: function(shape, self, radius, x, y) {
                        var x = x !== undefined ? x : 0;
                        var y = y !== undefined ? y : 0;
                        var radius = radius ? radius : 10;
                        var hexSpoke = radius*0.7;
                        shape.moveTo(0, -hexSpoke);
                        shape.lineTo(x+Math.cos(Math.PI/6)*hexSpoke, y-Math.sin(Math.PI/6)*hexSpoke);
                        shape.lineTo(x+Math.cos(Math.PI/6)*hexSpoke, y+Math.sin(Math.PI/6)*hexSpoke);
                        shape.lineTo(x+0, y+hexSpoke);
                        shape.lineTo(x-Math.cos(Math.PI/6)*hexSpoke, y+Math.sin(Math.PI/6)*hexSpoke);
                        shape.lineTo(x-Math.cos(Math.PI/6)*hexSpoke, y-Math.sin(Math.PI/6)*hexSpoke);
                        shape.lineTo(x+0, y-hexSpoke);
                    },
                    arrow: function(shape, self, radius, angle, x, y) {
                        var radius = radius ? radius : 10;
                        var angle = angle !== undefined ? angle : 0;
                        var x = x !== undefined ? x : 0;
                        var y = y !== undefined ? y : 0;
                        var factor = 0.9;
                        shape.moveTo(x+Math.cos(angle+Math.PI)*radius*factor, y+Math.sin(angle+Math.PI)*radius*factor);
                        shape.lineTo(x+Math.cos(angle)*radius*factor, y+Math.sin(angle)*radius*factor);
                        shape.lineTo(x+Math.cos(angle+Math.PI/2)*radius*factor, y+Math.sin(angle+Math.PI/2)*radius*factor);
                        shape.moveTo(x+Math.cos(angle)*radius*factor, y+Math.sin(angle)*radius*factor);
                        shape.lineTo(x+Math.cos(angle-Math.PI/2)*radius*factor, y+Math.sin(angle-Math.PI/2)*radius*factor);
                    }
                },
                digit: function (shape, self, radius, number, x, y) {
                    var radius = radius ? radius : 10;
                    var x = x !== undefined ? x : 0;
                    var y = y !== undefined ? y : 0;
                    var number = number !== undefined ? Math.floor(number) : -1;
                    var normalizer = radius/16; // Because I designed them for 16px radius and don't want to use messy fractions because of readability.
                    switch (number) {
                        case 0:
                            shape.moveTo( x+radius*0.5, y-radius*0.6 );
                            shape.lineTo( x+radius*0.6, y-radius*0.5 );
                            shape.lineTo( x-radius*0.5, y+radius*0.6 );
                            shape.lineTo( x-radius*0.6, y+radius*0.5 );
                            shape.moveTo( x-radius*0.5, y-radius*0.6 );
                            shape.lineTo( x-radius*0.6, y-radius*0.5 );
                            shape.lineTo( x+radius*0.5, y+radius*0.6 );
                            shape.lineTo( x+radius*0.6, y+radius*0.5 );
                            break;
                        case 1:
                            shape.drawCircle( x+0,  y+0, radius*0.4);
                            break;
                        case 2:
                            shape.drawCircle(x-6*normalizer,  y+0, radius*0.3);
                            shape.drawCircle( x+6*normalizer,  y+0, radius*0.3);
                            break;
                        case 3:
                            shape.drawCircle( x+0, y-9*normalizer, radius*0.25);
                            shape.drawCircle( x+0,  y+0, radius*0.25);
                            shape.drawCircle( x+0,  y+9*normalizer, radius*0.25);
                            break;
                        case 4:
                            shape.drawCircle(x-7*normalizer, y+0, radius*0.25);
                            shape.drawCircle( x+7*normalizer,  y+0, radius*0.25);
                            shape.drawCircle( x+0, y-7*normalizer, radius*0.25);
                            shape.drawCircle( x+0,  y+7*normalizer, radius*0.25);
                            break;
                        case 5:
                            shape.drawCircle(x-9*normalizer,  y+0, radius*0.25);
                            shape.drawCircle( x+0, y-9*normalizer, radius*0.25);
                            shape.drawCircle( x+0,  y+0, radius*0.25);
                            shape.drawCircle( x+0,  y+9*normalizer, radius*0.25);
                            shape.drawCircle( x+9*normalizer,  y+0, radius*0.25);
                            break;
                        case 6:
                            shape.drawCircle(x-7*normalizer, y-2*normalizer, radius*0.2);
                            shape.drawCircle( x+0, y-4*normalizer, radius*0.2);
                            shape.drawCircle( x+7*normalizer, y-6*normalizer, radius*0.2);
                            shape.drawCircle(x-7*normalizer,  y+6, radius*0.2);
                            shape.drawCircle( x+0,  y+4*normalizer, radius*0.2);
                            shape.drawCircle( x+7*normalizer,  y+2*normalizer, radius*0.2);
                            break;
                        case 7:
                            shape.drawCircle(  x+0,   y+0, radius*0.2);
                            shape.drawCircle( x-7*normalizer,  y+0, radius*0.2);
                            shape.drawCircle(  x+7*normalizer, y+0, radius*0.2);
                            shape.drawCircle( x-3.5*normalizer,  y-6.5*normalizer, radius*0.2);
                            shape.drawCircle(  x+3.5*normalizer, y-6.5*normalizer, radius*0.2);
                            shape.drawCircle( x-3.5*normalizer,  y+6.5*normalizer, radius*0.2);
                            shape.drawCircle(  x+3.5*normalizer,  y+6.5*normalizer, radius*0.2);
                            break;
                        case 8:
                            shape.drawCircle( x-7*normalizer,  y-7*normalizer, radius*0.2);
                            shape.drawCircle(  x+0,  y-7*normalizer, radius*0.2);
                            shape.drawCircle(  7*normalizer,  y-7*normalizer, radius*0.2);
                            shape.drawCircle( x-7*normalizer,   y+0, radius*0.2);
                            shape.drawCircle(  x+7*normalizer,   y+0, radius*0.2);
                            shape.drawCircle( x-7*normalizer,   y+7*normalizer, radius*0.2);
                            shape.drawCircle(  x+0,   y+7*normalizer, radius*0.2);
                            shape.drawCircle(  x+7*normalizer,   y+7*normalizer, radius*0.2);
                            break;
                        case 9:
                            shape.drawCircle(x+11*normalizer,   y+0, radius*0.15);
                            shape.drawCircle(x+6*normalizer,   y-6*normalizer, radius*0.2);
                            shape.drawCircle( x+0,  y-11*normalizer, radius*0.15);
                            shape.drawCircle( x-6*normalizer,  y-6*normalizer, radius*0.2);
                            shape.drawCircle(  x+0,  y+0, radius*0.25);
                            shape.drawCircle(  x+6*normalizer,  y+6*normalizer, radius*0.2);
                            shape.drawCircle(x-11*normalizer,   y+0, radius*0.15);
                            shape.drawCircle(x-6*normalizer, y+6*normalizer, radius*0.2);
                            shape.drawCircle( x+0,  y+11*normalizer, radius*0.15);
                            break;
                        default:
                            shape.drawRect(x-radius*0.15/2 -4, y-radius*1.5/2, radius*0.15, radius*1.5);
                            shape.drawRect(x-radius*0.15/2 +4, y-radius*1.5/2, radius*0.15, radius*1.5);
                            shape.drawRect(x-radius*1.5/2, y-radius*0.15/2 -4, radius*1.5, radius*0.15);
                            shape.drawRect(x-radius*1.5/2, y-radius*0.15/2 +4, radius*1.5, radius*0.15);
                            break;
                    }
                }
            },

            _effectsContainer: undefined,

            _waveLimit: 20,
            _waveBuffer: [],
            _waveCounter: 0,
            _initWave: function() {
                for ( var i = 0; i < Crafty.COURT._waveLimit; i++) {
                    var wave = new PIXI.Graphics();
                    wave.age = 1;
                    wave.visibility = false;
                    Crafty.COURT._effectsContainer.addChild(wave);
                    Crafty.COURT._waveBuffer.push(wave);
                }
            },
            _updateWave: function() {
                for ( var i = 0; i < Crafty.COURT._waveBuffer.length; i++ ) {
                    var wave = Crafty.COURT._waveBuffer[i];
                    var aging = 1/wave.lifetime;
                    if ( wave.age >= 1 ) {
                        wave.visibility = false;
                    } else {
                        wave.age += aging;
                        var factor = (1-Math.pow(1-wave.age, 2));
                        wave.scale.x = 1+factor*wave.scaleUp;
                        wave.scale.y = 1+factor*wave.scaleUp;
                        wave.alpha = (1-Math.pow(wave.age, 1.5));
                    }
                }
            },
            makeWave: function(routine, x, y, rotation, scale, lifetime) {

                var wave = Crafty.COURT._waveBuffer[Crafty.COURT._waveCounter];
                Crafty.COURT._waveCounter++; Crafty.COURT._waveCounter %= Crafty.COURT._waveLimit;

                var x = x !== undefined ? x : 0;
                var y = y !== undefined ? y : 0;
                var r = rotation !== undefined ? rotation : 0;
                var scale = scale !== undefined ? scale : 5;
                var lifetime = lifetime !== undefined ? lifetime : 24; // In ms.

                wave.clear();
                if ( typeof routine === "function" ) routine(wave, this);
                wave.position.x = x; wave.position.y = y;
                wave.rotation = r;

                wave.visibility = true;
                wave.age = 0;
                wave.scaleUp = scale;
                wave.lifetime = lifetime;

                return wave;

            },

            _validPulseInterval: 30,
            _validPulseCounter: 0,
            _validPulseUpdate: function() {
                Crafty.COURT._validPulseCounter++;
                var validBalls = [];
                if ( Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].putts > 0 && Crafty.COURT._validPulseCounter >= Crafty.COURT._validPulseInterval ) {
                    // Periodically, if there are putts available.
                    var balls = Crafty("Ball");
                    for ( var i = 0; i < balls.length; i++) { // Check all balls.
                        var ball = Crafty(balls[i]);
                        if ( ball.Ball.valid ) { // If a ball is valid.
                            validBalls.push(ball);
                        }
                    }
                }
                Crafty.COURT._validPulseCounter %= Crafty.COURT._validPulseInterval;
                for ( var i = 0; i < validBalls.length; i++) { // Check all balls.
                    var ball = validBalls[i];
                    var timeout = function(ball) { // Create a closured callback.
                        var ball = ball;
                        return function() {
                            Crafty.COURT.makeWave( // Create a circular wave of that ball's color on that ball.
                                function(shape) {
                                    shape.beginFill(0, 0);
                                    shape.lineStyle(2, ball.Color2, 0.15);
                                    shape.drawCircle(0,0, ball.Ball._radius);
                                    shape.endFill();
                                }, // routine
                                ball.PhysicsBody.state.pos.x,
                                ball.PhysicsBody.state.pos.y,
                                0,  // rotation
                                1,  // scale
                                50
                            );
                        };
                    };
                    setTimeout( timeout(ball), (Crafty.COURT._validPulseInterval/60*1000)/validBalls.length*i ); // And call with a equally timed delay for each unique valid ball.
                }
            },

            _puttLine: undefined,
            _puttLineUpdate: function(startX, startY, startMargin, endX, endY, endMargin, color) {
                var color = color !== undefined ? color : Crafty.COLOR2_COLORS.LGRAY;
                Crafty.COURT._puttLine.clear();
                Crafty.COURT._puttLine.beginFill(0, 0);
                Crafty.COURT._puttLine.lineStyle(2, color, 0.5);
                var angle = Math.atan2(endY-startY, endX-startX);
                Crafty.COURT._puttLine.moveTo(startX+Math.cos(angle)*startMargin, startY+Math.sin(angle)*startMargin);
                Crafty.COURT._puttLine.lineTo(endX-Math.cos(angle)*endMargin, endY-Math.sin(angle)*endMargin);
                Crafty.COURT._puttLine.endFill();
            },

            _timer: undefined,
            _updateTimer: function() {

                var graphics = Crafty.COURT._timer;

                var time = Crafty.COURT.turnTime / Crafty.COURT.turnLimit; // 0 .. 1

                var weights = [0.3125, 0.3125+0.1875, 1-0.1875]; // Time weights for the first three sides.

                graphics.clear();
                graphics.beginFill(0, 0);
                graphics.lineStyle(4, 0xffffff);

                graphics.moveTo(0, 0);
                graphics.lineTo(800*(time >= weights[0] ? 1 : (time)/weights[0]), 0);
                graphics.lineTo(800, 480*(time >= weights[1] ? 1 : (time-weights[0])/(weights[1]-weights[0])));
                graphics.lineTo( 800*(1-(time >= weights[2] ? 1 : (time-weights[1])/(weights[2]-weights[1]))), 480);
                graphics.lineTo(0, 480*(1-(time-(weights[2]))/(1-weights[2])));

                graphics.endFill();

            },

            _scoreScreen: undefined,
            _initScoreScreen: function() {
                Crafty.COURT._scoreScreen = new PIXI.Graphics();
                Crafty.COURT._effectsContainer.addChild(Crafty.COURT._scoreScreen);
            },
            _showScoreScreen: function() {

                var graphics = Crafty.COURT._scoreScreen;

                graphics.clear();

                // Shade.
                graphics.beginFill(0x000000, 0.9);
                graphics.drawRect(0, 0, 800, 480);
                graphics.endFill();

                //TODO: Blur?

                // Scoreline.
                graphics.beginFill(0xffffff, 1);
                graphics.lineStyle(2, 0xffffff);
                graphics.moveTo(100, 240);
                graphics.lineTo(700, 240);
                graphics.drawCircle(100, 240, 2);
                graphics.drawCircle(700, 240, 8);
                graphics.lineStyle(2, 0x000000);
                Crafty.COURT.graphicRoutines.digit(graphics, graphics, 11, 0, 700, 240-1);
                graphics.endFill();

                // Score
                for ( var i = 0; i < Crafty.COURT.playingTeams.length; i++ ) {

                    var team = Crafty.COURT.playingTeams[i];
                    var score = team.score/team.scoreTarget;
                    var radius = 20*(score == 1 ? 2 : 1);

                    // Dots.
                    graphics.beginFill(( i == Crafty.COURT.turnTeamIndex ? 0xffffff : 0x000000));
                    graphics.drawCircle(100+600*score, 240, 4);
                    graphics.endFill();

                    // Shapes.
                    graphics.beginFill(( i == Crafty.COURT.turnTeamIndex ? 0xffffff : 0x000000));
                    graphics.lineStyle(2, 0xffffff);
                    switch (team.team) {
                        case 1:
                            Crafty.COURT.graphicRoutines.shapes.quad(graphics, graphics, radius, 100+600*score, 240+(i%2?30:-30));
                            break;
                        case 2:
                            Crafty.COURT.graphicRoutines.shapes.tri(graphics, graphics, radius*0.9, 100+600*score, 240+(i%2?30:-30));
                            break;
                        case 3:
                            Crafty.COURT.graphicRoutines.shapes.star(graphics, graphics, radius, 100+600*score, 240+(i%2?30:-30));
                            break;
                        case 4:
                            Crafty.COURT.graphicRoutines.shapes.hex(graphics, graphics, radius, 100+600*score, 240+(i%2?30:-30));
                            break;
                    }
                    graphics.endFill();

                }

                // Show score.
                Crafty.COURT._scoreScreen.visible = true;

            },
            _hideScoreScreen: function() {
                Crafty.COURT._scoreScreen.visible = false;
            },

            paused: false,
            turnLimit: 200,
            turnTime: 0,
            turnTeamIndex: 0,

            init: function ( data ) {

                /* Bind handlers. */

                Crafty.bind("PhysicsStep", Crafty.COURT._step);

                Crafty.bind("CourtGoalCaught", Crafty.COURT._goal);

                Crafty.bind("HammerDoubleTap", Crafty.COURT._doubleTap);
                Crafty.bind("HammerHoldStart", Crafty.COURT._holdStart);
                Crafty.bind("HammerHoldDrag", Crafty.COURT._holdDrag);
                Crafty.bind("PhysicsTick", Crafty.COURT._holdDragTick); // Although a drag event, this is on the generic physics tick event to update even while point not moving.
                Crafty.bind("HammerHoldEnd", Crafty.COURT._holdEnd);

                /* Set-up court scheme */

                // Call the scheme set-up function.
                data.setup();

                // Reused queries.
                var numGoals = Crafty("Goal").length;
                var balls = Crafty("Ball");

                // Set highest goal to all the balls as their next goal.
                for (var i = 0; i < balls.length; i++ ) {
                    var ball = Crafty(balls[i]);
                    ball.Ball.nextGoal = numGoals;
                }

                // Set-up playing teams' base states.
                for ( var i in data.playingTeams ) {
                    Crafty.COURT.playingTeams[i] = {
                        team: data.playingTeams[i],
                        putts: 1,
                        score: 0,
                        scoreTarget: 0
                    };
                }

                // Calculate target score for all the teams.
                for ( var i = 0; i < balls.length; i++ ) {
                    var ball = Crafty(balls[i]);
                    for ( var j = 0; j < Crafty.COURT.playingTeams.length; j++ ) {
                        var teamState = Crafty.COURT.playingTeams[j];
                        if ( ball.Ball.team == teamState.team ) {
                            teamState.scoreTarget += numGoals;
                        }
                    }
                }

                /* Set-up effects and interface layers. */

                // Create effects container Pixi layer.
                Crafty.COURT._effectsContainer = new PIXI.DisplayObjectContainer();
                Crafty.PIXIRENDERER.stage.addChild(Crafty.COURT._effectsContainer);

                // Set up wave effects.
                Crafty.COURT._initWave();
                Crafty.bind("PixiEnterFrame", Crafty.COURT._updateWave);

                // Set up valid ball pulse effects.
                Crafty.bind("PhysicsTick", Crafty.COURT._validPulseUpdate);

                // Set up putting feedback line.
                Crafty.COURT._puttLine = new PIXI.Graphics();
                Crafty.COURT._puttLine.visible = false;
                Crafty.COURT._effectsContainer.addChild(Crafty.COURT._puttLine);

                // Set up the timer.
                Crafty.COURT._timer = new PIXI.Graphics();
                Crafty.COURT._effectsContainer.addChild(Crafty.COURT._timer);
                Crafty.bind("PhysicsStep", Crafty.COURT._updateTimer);

                // Setup the score screen.
                Crafty.COURT._initScoreScreen();
                Crafty.COURT._showScoreScreen();

            },

            pause: function() {
                Crafty.trigger('CourtPause');
                Crafty.COURT.paused = true; // Set flag.
                Crafty.PHYSICSSIMULATOR.world.pause(); // Pause physics.
                Crafty.COURT._showScoreScreen(); // Show score screen.
            },

            unpause: function() {
                Crafty.trigger('CourtUnpause');
                Crafty.COURT.paused = false; // Set flag.
                Crafty.PHYSICSSIMULATOR.world.unpause(); // Unpause physics.
                Crafty.COURT._hideScoreScreen(); // Show score screen.
            },

            _step: function(meta) {
                Crafty.COURT._warp(); // Warp physics as per turn-time.
                //TODO: Hide the pause-overlay.
                if ( Crafty.COURT.turnTime <= 0 ) { // If turn timer has run dry.

                    Crafty.bind('CourtTurnOver');

                    Crafty.COURT.turnTime = Crafty.COURT.turnLimit; // Reset timer.

                    Crafty.COURT.turnTeamIndex++; Crafty.COURT.turnTeamIndex %= Crafty.COURT.playingTeams.length; // Increment team tracker.

                    Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].putts = 1; // Reset team's available putt count.

                    // Set goal numbers to show only for current team.
                    var balls = Crafty("Ball");
                    for (var i = 0; i < balls.length; i++) {
                        var ball = Crafty(balls[i]);
                        if ( ball.Ball.team == Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].team ) {
                            ball.Ball.setShowGoal(true);
                            ball.Ball.valid = true;
                            ball.trigger("BallTeamTurn");
                        } else {
                            ball.Ball.setShowGoal(false);
                            ball.Ball.valid = false;
                        }
                    }

                    Crafty.COURT.pause(); // Pause again.

                    Crafty.COURT._pullBall = undefined; // Reset.
                    Crafty.COURT._lastPoint = undefined; // Clear last caught pointer.
                    Crafty.COURT._puttLine.visible = false; // No matter what, hide the putting line.

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

                if (ball.Ball.nextGoal == goal.Goal.number) {
                    console.log('GOAL!'); //NOTE:
                    console.log("next goal: "+ball.Ball.nextGoal+
                            " current goal: "+goal.Goal.number+
                            " own team: "+ball.Ball.team+
                            " current team: "+Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].team); //NOTE:
                    ball.Ball.makeWave();
                    Crafty.COURT.playingTeams[ball.Ball.team].score++;
                    ball.Ball.setNextGoal(--ball.Ball.nextGoal);
                    if (
                        Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].score >=
                        Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].scoreTarget
                    ) {
                        console.log('WIN!'); //NOTE:
                        // Victory routine.
                    }
                }

            },

            _doubleTap: function(data) {
                if ( Crafty.COURT.paused ) {
                    Crafty.COURT.unpause();
                } else {
                    Crafty.COURT.pause();
                }
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
                            if ( body.entity.Ball && body.entity.Ball.valid ) {
                                Crafty.COURT._pullBall = body.entity;
                                Crafty.COURT.makeWave(
                                    function(shape, self) { // Create wave of ball's color.
                                        shape.beginFill(0x000000, 0);
                                        shape.lineStyle(1, Crafty.COURT._pullBall.Color2, 0.9);
                                        shape.drawCircle(0, 0, 16);
                                        shape.endFill();
                                    },
                                    Crafty.COURT._pullBall.PhysicsBody.state.pos.x,
                                    Crafty.COURT._pullBall.PhysicsBody.state.pos.y,
                                    0,
                                    2
                                );
                                Crafty.COURT.unpause(); // Unpause when initiating pulls as designed for balance.
                                break;
                            }
                        }
                    }

                    if ( !Crafty.COURT._pullBall ) { // Save pull coordinates if no valid target under cursor.
                        Crafty.COURT._pushPoint.set(data.point.x, data.point.y);
                        Crafty.COURT.makeWave(
                            function(shape, self) { // Create wave of neutral gray.
                                shape.beginFill(0x000000, 0);
                                shape.lineStyle(1, Crafty.COLOR2_COLORS.LGRAY, 0.75);
                                shape.drawCircle(0, 0, 4);
                                shape.endFill();
                            },
                            data.point.x,
                            data.point.y,
                            0,
                            5
                        );
                    }

                }

            },
            _holdDragTick: function() {
                var data = Crafty.COURT._lastPoint;
                if ( !data ) return;
                if ( Crafty.COURT.playingTeams[Crafty.COURT.turnTeamIndex].putts > 0 ) {

                    if (Crafty.COURT._pullBall) {

                        Crafty.COURT._puttLineUpdate(
                            Crafty.COURT._pullBall.PhysicsBody.state.pos.x,    // Start x
                            Crafty.COURT._pullBall.PhysicsBody.state.pos.y,    // Start y
                            Crafty.COURT._pullBall.Ball._radius,                // Start margin
                            data.point.x,                                      // End x
                            data.point.y,                                      // End y
                            0,                                                 // End margin
                            Crafty.COURT._pullBall.Color2                      // Color
                        );
                        Crafty.COURT._puttLine.visible = true;

                    } else {

                        var color = Crafty.COLOR2_COLORS.LGRAY;

                        var bodies = Crafty.PHYSICSSIMULATOR.hitTest(data.point);
                        var pushBall;
                        for (var i = 0; i < bodies.length; i++ ) {
                            var body = bodies[i];
                            if ( body.entity.Ball ) {
                                // Check if a valid ball before registering as target.
                                if ( body.entity.Ball && body.entity.Ball.valid ) {
                                    pushBall = body.entity;
                                    break;
                                }
                            }
                        }
                        if (pushBall) { // Push if there's a valid target.
                            color = pushBall.Color2;
                        }

                        Crafty.COURT._puttLineUpdate(
                            Crafty.COURT._pushPoint.x,                         // Start x
                            Crafty.COURT._pushPoint.y,                         // Start y
                            0,                                                 // Start margin
                            data.point.x,                                      // End x
                            data.point.y,                                      // End y
                            0,                                                 // End margin
                            color                                              // Color
                        );
                        Crafty.COURT._puttLine.visible = true;

                    }
                } else {
                    Crafty.COURT._puttLine.visible = false;
                }
            },
            _holdDrag: function(data) {
                Crafty.COURT._lastPoint = data;
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
                        Crafty.COURT._pullBall.PhysicsBody.applyForce(force); // Apply force.
                        Crafty.COURT._pullBall = undefined; // Reset.

                        //TODO: Particle effects.

                    } else { // Otherwise, see if there's a push.

                        var bodies = Crafty.PHYSICSSIMULATOR.hitTest(data.point);

                        var pushBall;
                        for (var i = 0; i < bodies.length; i++ ) {
                            var body = bodies[i];
                            if ( body.entity.Ball ) {
                                // Check if a valid ball before registering as target.
                                if ( body.entity.Ball && body.entity.Ball.valid ) {
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
                            Crafty.COURT.unpause(); // Unpause if putt succesful.
                            pushBall.PhysicsBody.applyForce(force); // Apply force.

                            //TODO: Particle effects.

                        } else {
                            Crafty.COURT._lastPoint = undefined; // Reset
                        }
                    }

                }
                Crafty.COURT._puttLine.visible = false; // No matter what, hide the putting line.
            },

        }
    });

}());
