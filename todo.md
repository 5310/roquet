- [x]   Setup:

    - [x]   Create directory structure.
    - [x]   Create repo files.
    - [x]   Get basic dependencies.
    - [x]   Create boilerplate files.
    - [x]   Breakdown tasks.

- [ ]   Alpha:

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
            - [x]   Plan component(s) and system.
            - [x]   Write the system: PhysicsSimulator.
            - [x]   Write the body component: PhysicsBody.
                - [x] Write a body-configurator.
                - [x] Write a positioning method.
                - [x] Write a rotating method.
            - [x]   Write the sprite component: PhysicsSprite.
                - [ ] Methods to create texture from physics geometries and color.
                - [ ] Hook to re/apply them after entity creation.
    - [ ]   Gameplay.
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
        - [ ]   The Obstacle component.
            -   Probably just a tag, as we already have the basic functionality implemented.
            -   Should at least set balanced mass, restitution, etc.
        - [ ]   The Goal component.
        - [ ]   The Court system.
            - [ ]   Static obstacles generation and ball placement.
            - [ ]   Turn engine.
            - [ ]   Ball selection and shots.
            - [ ]   Scoring.

- [ ]   Beta:

    - [ ]   Gameplay.
        - [ ]   The Field component.
        - [ ]   Turn-engine.
            - [ ]   Pausing, at least bewteen turns.
            - [ ]   Time-scaling and slow-time for dramatic moments.
    
    - [ ]   Data-driven level generation.
        - [ ]   Obstacle and field generation.
         - [ ]   Ball placement.
    
    - [ ]   In-game interface.
        - [ ]   Modals for turn-over.
        - [ ]   Permanent overlays for turn-order and scoring.
    
    - [ ]   Special effects.
        - [ ]   Sound effects for activities.
        - [ ]   The Particle system for collision effects.
        - [ ]   Per-layer deformations for collision effects.
        
    - [ ]   Menu screen.
        - [ ]   Staring and quitting the game.
        - [ ]   Court selection.
        
    - [ ]   Saving/loading.
        - [ ]   Custom serialization system.
            -   Assuming saving will only be done from paused state.
        
- [ ]   Pre-release:

    - [ ]   Design and write some interesting courts.
    
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

- [ ]   Release:

    - [ ]   Write some modest "marketing" material.
    - [ ]   Publish to GH-pages.
    - [ ]   Publish to Itch.io
        - [ ]   Ask, or phrase, for donations; this isn't PWYW material, even if the minimum price is free.
    
- [ ]   Post-release:

    - [ ]   Check feedback for bugs and changes worth implementing.

    - [ ]   Consider...
        - [ ]   Save/load.
        - [ ]   Larger zoomable-pannable courts.
        - [ ]   Procedural level generation.
        - [ ]   More variety physics-based mechanics.