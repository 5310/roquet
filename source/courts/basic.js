(function () {

    var scheme = {
        playingTeams: [
            Crafty.COURT.teams.QUAD,
            Crafty.COURT.teams.TRI
        ],
        setup: function() {

            redBall = Crafty.e("Thennable", "Ball")
                .Ball.setTeam(Crafty.COURT.teams.TRI)
                .Color2Set(Crafty.COLOR2_COLORS.RED)
                .PhysicsBodyPosition(100-50, 100);
            greenBall = Crafty.e("Thennable", "Ball")
                .Ball.setTeam(Crafty.COURT.teams.QUAD)
                .Color2Set(Crafty.COLOR2_COLORS.GREEN)
                .PhysicsBodyPosition(100, 100);
            blueBall = Crafty.e("Thennable", "Ball")
                .Ball.setTeam(Crafty.COURT.teams.QUAD)
                .Color2Set(Crafty.COLOR2_COLORS.BLUE)
                .PhysicsBodyPosition(100+50, 100);
            yellowBall = Crafty.e("Thennable", "Ball")
                .Ball.setTeam(Crafty.COURT.teams.TRI)
                .Color2Set(Crafty.COLOR2_COLORS.YELLOW)
                .PhysicsBodyPosition(100-50+20, 100+50);
            cyanBall = Crafty.e("Thennable", "Ball")
                .Ball.setTeam(Crafty.COURT.teams.TRI)
                .Color2Set(Crafty.COLOR2_COLORS.CYAN)
                .PhysicsBodyPosition(100+20, 100+50);
            magentaBall = Crafty.e("Thennable", "Ball")
                .Ball.setTeam(Crafty.COURT.teams.QUAD)
                .Color2Set(Crafty.COLOR2_COLORS.MAGENTA)
                .PhysicsBodyPosition(100+50+20, 100+50);

            eightBall = Crafty.e("Thennable", "Attractor")
                .PhysicsBodyPosition(300, 300)
                .then(function() {
                    this.PhysicsFieldAttractor.strength *= -1;
                    this.PhysicsSprite.generateSprite();
                });

            goal1 = Crafty.e("Thennable", "Goal")
                .PhysicsBodyPosition(150, 240)
                .then(function() {
                    this.PhysicsFieldAttractor.strength = 0.01;
                    this.PhysicsFieldAttractor.friction = 0.95;
                });
            goal2 = Crafty.e("Thennable", "Goal")
                .PhysicsBodyPosition(700, 40);
            goal3 = Crafty.e("Thennable", "Goal")
                .PhysicsBodyPosition(650, 300);

            floor = Crafty.e("Thennable", "Obstacle")
                .PhysicsBodySet('convex-polygon', {
                    x: 400,
                    y: 400,
                    vertices: [
                        { x: -400, y: -30 },
                        { x: -400, y: 30 },
                        { x: 400, y: 30 },
        //                { x: 400, y: -30 },
                    ]
                });
        //    });

        }
    };

    Crafty.COURT.schemes.basic = scheme;

}());
