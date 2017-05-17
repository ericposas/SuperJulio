/*************
   GLOBALS
*************/

var GLOBALS = {
  char: {
    gamestart: {
      delay: 0.5
    },
    jumpForce: {
      current: 0.05,
      small: 0.05,
      big: 0.06
    },
    spriteswap: {
      //frames_per_state: 2,
      total_frames: 6
    },
    accel: {
      speed: 0,
      rate: 0.25,
      min: 0,
      max: 5
    },
    walklimit: {
      left: 140,
      right: 340
    }
  },
  stage: {
    adjust: 14,
    charlimit: {
      begin: 58,
      end: 422
    }
  },
  bg: {
    limit: {
      left: 0,
      right: 925
    }
  }
  
}
