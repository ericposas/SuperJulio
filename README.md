# Super Julio

  Mario-clone project, using Matter.js.. There will be violence 
  
  ### Known issues:
    - Julio can scale an entire wall if right next to it, and holding down the jump key - FIXED 
    - Julio can still execute an infinite-jump if close enough to a block (triggers collision and resets the jump-check?)
    - Julio stops walking motion, if he reaches the scrolling boundary, but not touching a wall 
  
  ### Need to do:
    - Need to increment the speed in his run/walk cycle 
    - Need to read up more on the Collision Filters documentation (Matter.js) -- Collision issue had to do with checking the wrong array set.. instead of checking the entire "layout" array, I needed to check the "bricks" array. This fact, was throwing off the Body ID's and causing issues with the collision detection 
    
  ### Preloading 
    - Will use PreloadJS (CreateJS library) to preload assets 
    
  
    