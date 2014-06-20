Roquet
======

This project is a back-to-basics habit-forming three-week prototype game made to ease into actually developing and showing games to the "public" (even if they're prototypes and suck).

(I keep telling myself that.)

The game itself is an interpretation of [croquet](http://en.wikipedia.org/wiki/Croquet), where two teams try to putt some balls into numbered goals in a certain order.

While the rules are simplified: there are no bonus putts for hitting other balls. Instead, the gimmick is that the physics collisions are color-based. Two physical bodies only collide when they have at least one RGB channel of color common. Which is a fancy way of making it so that red collides with red, blue with blue, green with green, and none collide with each other. But cyan collides with green _and_ blue, but nor red, and white collides with everything, and so forth.

Playing the Game
----------------

[**Follow this link to the game.**](5310.github.io/roquet)

This protoype starts off with a basic court and a few obstacles and randomly placed balls. 

- Basic controls:
    - Simply tap the score-screen to hide it.
    - Then double tap to pause or upause the game.
    - Long-press and drag putt the balls around.
- Objective:
    - Both players take turns lasting a set amount of time, and they only get a single putting action each turn.
    - The turn-timer is displayed as a border around the screen.
- Putting:
    - To putt players can either:
        - ...long-press on anything that isn't a ball they own and drag a line to a ball they _do_ own (a push,)
        - ...or long-press on a ball they own, and drag off a line in any direction (a pull).
    - Pulls are easier to aim than pushes, but pulling a ball also unpauses the game, making things trickier! :shrug:
    - The longer the line drawn while putting, the stronger the putt.
- Scoring:
    - The players have to putt all their balls through all the goals in a specific order first to win.
        - On a player's turn, all their balls are marked with the number of the goal they next have to putt with it.
        - If a ball rests on a goal they were supposed to go to for a while, the player scores.
        - The screen that shows up between each turns shows how far each player to winning!
    - When a player wins, the game stops. Refresh if you want to play again, for some reason!
    
That's it?
----------
    
The `todo.md` lists the some other ideas I have planned, which I may or may not add or iterate the game. I don't find the prototype to be particularly interesting, however, and a poor application of the color-channel-based collisions mechanic. :shrug:

I do consider this project a success, though: I actually made a prototype and forced myself to "release" it. Now, I'd like to climb the next step and start working on a game that seems interesting to me (and has a pen-and-paper prototype) instead of yet another habit-forming exercise!