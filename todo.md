- [x]   Setup:

    - [x]   Create directory structure.
    - [x]   Create repo files.
    - [x]   Get basic dependencies.
    - [x]   Create boilerplate files.
    - [x]   Breakdown tasks.

- [x]   Alpha:

    - [x]   The basics.
        - [x]   Basic rendering.
            - [x]   Manually implement Pixi.js color-blending and procedural drawing.
            - [x]   Plan component and system.
            - [x]   Write system: PixiRenderer
            - [x]   Write component: PixiSprite
        - [x]   Gestural interaction.
            - [x]   Test our Hammer, and see if gestures and global-to-local manual conversion is feasible.
            - [x]   Write the system: Hammerer
            - [x]   Integrate system into the Pixi renderer's canvas.
        - [x]   Minimum-viable physics.
            - [x]   Investigate physics engines and choose one.
                -   Chose PhysicsJS because it's deliciously hip and modular.
            - [x]   Test to see if you can use engine or implement features as required.
                - [x]   Implement color-based collisions.
                - [x]   Implement proper arbitrary hit-tests.
                - [x]   Implement a maximum velocity clamping behavior.
                    - [ ]   Make the clamp work before force is applied.
            - [x]   Plan component(s) and system.
            - [x]   Write the system: PhysicsSimulator.
            - [x]   Write the body component: PhysicsBody.
                - [x] Write a body-configurator.
                - [x] Write a positioning method.
                - [x] Write a rotating method.
            - [x]   Write the sprite component: PhysicsSprite.
                - [x] Methods to create texture from physics geometries and color.
                - [x] Hook to re/apply them after entity creation.
    - [x]   Gameplay.
        - [x]   The Color2 component.
            - [x]   Make a simple component to store our gameplay colors for reuse by other components.
                - [x]   Implement a method to change color.
                - [x]   Implement triggers to update other components.
            - [x]   Write enums for colors.
        - [x]   The Ball component..
            - [x]   Integrate graphics.
                - [x]   Team-shapes.
                    - [X]   Draw the team-shapes to be used as textures.
                    - [x]   Write enums for shapes.
                - [x]   Use the Color2 color with a trigger.
            - [x]   Integrate physics.
        - [x]   The Obstacle component.
        - [x]   The Field components.
            - [x]   Write the PhysicsJS behavior that applies method from field bodies upon intersection.
            - [x]   Write the attractor component.
        - [x]   Balance the physical properties of Balls, Obstacles, Goals and find usable range of force to putt with.

- [x]   Beta:

    - [x]   Gameplay.
        - [x]   The Goal component.
            - [x]   Compose component with base components such as the attractor field.
            - [x]   Custom field to slow down bodies gradually and only trigger the goal event.
            - [x]   Goal number overlay.
        - [x]   The Court system.
            - [x]   Turn-engine.
                - [x]   Timed pausing bewteen turns.
                - [x]   Turn order and available putt tracking.
                - [x]   Time-dilation for easing in and out of turns.
            - [x]   Ball selection and shots.
                - [x]   Ball validity check by turn order.
                - [ ]   Bonus putts.
            - [x]   Scoring.
                - [x]   Goaling.
                - [x]   Win conditions.
            - [x]   Data-driven level generation.
                - [x]   Calcualtion of derived states.
        - [x]   More Field components.
            - [x]   Conveyor
            - [x]   Rotator
            - [x]   Overlay-based stextures for all the fields.
    
    - [x]   In-game interface.
        - [x]   Score-screen.
        - [x]   Timer.
        - [x]   Putting visual feedback.
        - [x]   Numeric overlays on active team's balls.

    - [x]   Design and write the basic court.
        
- [ ]   Pre-prototype-release:

    - [ ]   Design and write some interesting courts.
    
    - [ ]   Special effects.
        - [ ]   Speed-trails of all the balls.
        - [ ]   Sound effects for activities.
        - [ ]   The Particle system for collision effects.
        - [ ]   Per-layer deformations for collision effects.
    
    - [ ]   Playtest.
        - [ ]   Force some people to play it.
            -   Make sure to lower expectations.
            -   Try G+ and maybe some communities too.
        - [ ]   Listen to feedback and bugs to work on.
        
    - [ ]   Polish.
        - [ ]   Refine color palettes, texture, and other visual aspects.
        - [ ]   Refine Special-effects.
            - [ ]   Sound-effects.
            - [ ]   Particle effects.
            - [ ]   Per-pixel effects.
        - [ ]   Refine interface.
            - [ ]   Overlays.
            - [ ]   Modals.s
        - [ ]   Make menu screen look good.
        
    - [ ]   Documentation.
        -   Include pre-rendered stills as tutorial.
        -   Include credits and links in the menu.
        -   Update repository docs.

    - [ ]   Packaging.
        - [ ]   Research CocoonJS.
        - [ ]   Package for Mobile.
            -   Target tablet of course, but also build a mobile version for those who can play it that small.
        - [ ]   Package for the web.
            -   GH-pages should be enough, right?
        - [ ]   Package for desktop.
            -   CocoonJS should suffice, and if not, try Node-wekbit.

- [ ]   Prototype Release:

    - [ ]   Write a readme material.
    - [ ]   Publish to GH-pages.
    
- [ ]   Post-prototype-release:
        
    - [ ]   Menu screen.
        - [ ]   Staring and quitting the game.
        - [ ]   Court selection.
        
    - [ ]   Saving/loading.
        - [ ]   Custom serialization system.
            -   Assuming saving will only be done from paused state.

    - [ ]   Check feedback for bugs and changes worth implementing.

    - [ ]   Consider...
        - [ ]   Save/load.
        - [ ]   Larger zoomable-pannable courts.
        - [ ]   Procedural level generation.
        - [ ]   More variety physics-based mechanics.