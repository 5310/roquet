(function () {

    var shuffle = function(array) {
      var currentIndex = array.length;
      var temporaryValue;
      var randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    var scheme = {
        playingTeams: [
            Crafty.COURT.teams.QUAD,
            Crafty.COURT.teams.TRI
        ],
        setup: function() {

            var ballColors = [
                Crafty.COLOR2_COLORS.RED,
                Crafty.COLOR2_COLORS.GREEN,
                Crafty.COLOR2_COLORS.BLUE,
                Crafty.COLOR2_COLORS.YELLOW,
                Crafty.COLOR2_COLORS.CYAN,
                Crafty.COLOR2_COLORS.MAGENTA
            ];
            shuffle(ballColors);
            var wallColors = [
                Crafty.COLOR2_COLORS.RED,
                Crafty.COLOR2_COLORS.GREEN,
                Crafty.COLOR2_COLORS.BLUE,
                Crafty.COLOR2_COLORS.YELLOW,
                Crafty.COLOR2_COLORS.CYAN,
                Crafty.COLOR2_COLORS.MAGENTA
            ];
            shuffle(wallColors);

            ball11 = Crafty.e("Thennable", "Ball")
                .Ball.setTeam(Crafty.COURT.teams.QUAD)
                .Color2Set(ballColors[0])
                .PhysicsBodyPosition(230, 240);
            ball12 = Crafty.e("Thennable", "Ball")
                .Ball.setTeam(Crafty.COURT.teams.QUAD)
                .Color2Set(ballColors[1])
                .PhysicsBodyPosition(100, 50);
            ball13 = Crafty.e("Thennable", "Ball")
                .Ball.setTeam(Crafty.COURT.teams.QUAD)
                .Color2Set(ballColors[2])
                .PhysicsBodyPosition(100, 430);
            ball21 = Crafty.e("Thennable", "Ball")
                .Ball.setTeam(Crafty.COURT.teams.TRI)
                .Color2Set(ballColors[3])
                .PhysicsBodyPosition(570, 240);
            ball22 = Crafty.e("Thennable", "Ball")
                .Ball.setTeam(Crafty.COURT.teams.TRI)
                .Color2Set(ballColors[4])
                .PhysicsBodyPosition(700, 50);
            ball23 = Crafty.e("Thennable", "Ball")
                .Ball.setTeam(Crafty.COURT.teams.TRI)
                .Color2Set(ballColors[5])
                .PhysicsBodyPosition(700, 430);

            goal1 = Crafty.e("Thennable", "Goal")
                .PhysicsBodyPosition(80, 240);
            goal2 = Crafty.e("Thennable", "Goal")
                .PhysicsBodyPosition(720, 240);
            goal3 = Crafty.e("Thennable", "Goal")
                .PhysicsBodyPosition(400, 380)
            goal4 = Crafty.e("Thennable", "Goal")
                .PhysicsBodyPosition(400, 100)

            pegGoal1Left = Crafty.e("Thennable", "Obstacle")
                .PhysicsBodySet('circle', {
                    x: 400-30,
                    y: 100,
                    radius: 8,
                    treatment: 'static',
                    mass: 10
                });
            pegGoal1Right = Crafty.e("Thennable", "Obstacle")
                .PhysicsBodySet('circle', {
                    x: 400+30,
                    y: 100,
                    radius: 8,
                    treatment: 'static',
                    mass: 10
                });
            pegGoal2Left = Crafty.e("Thennable", "Obstacle")
                .PhysicsBodySet('circle', {
                    x: 400-30,
                    y: 380,
                    radius: 8,
                    treatment: 'static',
                    mass: 10
                });
            pegGoal2Right = Crafty.e("Thennable", "Obstacle")
                .PhysicsBodySet('circle', {
                    x: 400+30,
                    y: 380,
                    radius: 8,
                    treatment: 'static',
                    mass: 10
                });

            wedgeBottom = Crafty.e("Thennable", "Obstacle")
                .PhysicsBodySet('convex-polygon', {
                    x: 400,
                    y: 470,
                    vertices: [
                        { x: 0, y: 0 },
                        { x: -60, y: 40 },
                        { x: 60, y: 40 },
                    ],
                    treatment: 'static'
                });
            wedgeTop = Crafty.e("Thennable", "Obstacle")
                .PhysicsBodySet('convex-polygon', {
                    x: 400,
                    y: 10,
                    vertices: [
                        { x: 0, y: 0 },
                        { x: -60, y: -40 },
                        { x: 60, y: -40 },
                    ],
                    treatment: 'static'
                });

            lozengeR = Crafty.e("Thennable", "Obstacle")
                .Color2Set(Crafty.COLOR2_COLORS.RED)
                .PhysicsBodySet('convex-polygon', {
                    x: 400,
                    y: 240,
                    vertices: [
                        { x: 0, y: 80 },
                        { x: 120, y: 0 },
                        { x: 0, y: -80 },
                        { x: -120, y: 0 },
                    ],
                    mass: 10,
                    treatment: 'dynamic'
                });
            lozengeG = Crafty.e("Thennable", "Obstacle")
                .Color2Set(Crafty.COLOR2_COLORS.GREEN)
                .PhysicsBodySet('convex-polygon', {
                    x: 400,
                    y: 240,
                    vertices: [
                        { x: 0, y: 80 },
                        { x: 120, y: 0 },
                        { x: 0, y: -80 },
                        { x: -120, y: 0 },
                    ],
                    mass: 10,
                    treatment: 'dynamic'
                });
            lozengeB = Crafty.e("Thennable", "Obstacle")
                .Color2Set(Crafty.COLOR2_COLORS.BLUE)
                .PhysicsBodySet('convex-polygon', {
                    x: 400,
                    y: 240,
                    vertices: [
                        { x: 0, y: 80 },
                        { x: 120, y: 0 },
                        { x: 0, y: -80 },
                        { x: -120, y: 0 },
                    ],
                    mass: 10,
                    treatment: 'dynamic'
                });


            wallLeftTop = Crafty.e("Thennable", "Obstacle")
                .Color2Set(wallColors[0])
                .PhysicsBodySet('convex-polygon', {
                    x: 80,
                    y: 120,
                    vertices: [
                        { x: -5, y: -50 },
                        { x: 5, y: -50 },
                        { x: 5, y: 50 },
                        { x: -5, y: 50 },
                    ],
                    treatment: 'static',
                    mass: 10
                })
                .PhysicsBodyRotation(2.1587989303424641704769327722648368697002919457434772);

            wallLeftMid = Crafty.e("Thennable", "Obstacle")
                .Color2Set(wallColors[1])
                .PhysicsBodySet('convex-polygon', {
                    x: 160,
                    y: 240,
                    vertices: [
                        { x: -5, y: -50 },
                        { x: 5, y: -50 },
                        { x: 5, y: 50 },
                        { x: -5, y: 50 },
                    ],
                    treatment: 'static',
                    mass: 10
                });

            wallLeftBottom = Crafty.e("Thennable", "Obstacle")
                .Color2Set(wallColors[2])
                .PhysicsBodySet('convex-polygon', {
                    x: 80,
                    y: 360,
                    vertices: [
                        { x: -5, y: -50 },
                        { x: 5, y: -50 },
                        { x: 5, y: 50 },
                        { x: -5, y: 50 },
                    ],
                    treatment: 'static',
                    mass: 10
                })
                .PhysicsBodyRotation(-2.1587989303424641704769327722648368697002919457434772);

            wallRightTop = Crafty.e("Thennable", "Obstacle")
                .Color2Set(wallColors[3])
                .PhysicsBodySet('convex-polygon', {
                    x: 720,
                    y: 120,
                    vertices: [
                        { x: -5, y: -50 },
                        { x: 5, y: -50 },
                        { x: 5, y: 50 },
                        { x: -5, y: 50 },
                    ],
                    treatment: 'static',
                    mass: 10
                })
                .PhysicsBodyRotation(-2.1587989303424641704769327722648368697002919457434772);

            wallRightMid = Crafty.e("Thennable", "Obstacle")
                .Color2Set(wallColors[4])
                .PhysicsBodySet('convex-polygon', {
                    x: 640,
                    y: 240,
                    vertices: [
                        { x: -5, y: -50 },
                        { x: 5, y: -50 },
                        { x: 5, y: 50 },
                        { x: -5, y: 50 },
                    ],
                    treatment: 'static',
                    mass: 10
                });

            wallRightBottom = Crafty.e("Thennable", "Obstacle")
                .Color2Set(wallColors[5])
                .PhysicsBodySet('convex-polygon', {
                    x: 720,
                    y: 360,
                    vertices: [
                        { x: -5, y: -50 },
                        { x: 5, y: -50 },
                        { x: 5, y: 50 },
                        { x: -5, y: 50 },
                    ],
                    treatment: 'static',
                    mass: 10
                })
                .PhysicsBodyRotation(2.1587989303424641704769327722648368697002919457434772);

        }
    };

    Crafty.COURT.schemes.basic = scheme;

}());
