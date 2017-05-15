/*************
   SOUND FX
*************/

function Sounds(){
  //this.brick_break = new Audio('sfx/smb_breakblock.wav');
  //this.jump = new Audio('sfx/smb_jump_small.wav');
  // trying Howler.js library 
  this.brick_break = new Howl({
    src: ['sfx/smb_breakblock.wav']
  });
  this.jump = new Howl({
    src: ['sfx/smb_jump_small.wav']
  })
  
}

Sounds.prototype.play = function(sndName){
  switch(sndName){
    case 'brick':
      this.brick_break.play();
      break;
    case 'jump':
      this.jump.play();
      break;
  }
}

Object.defineProperties(Sounds.prototype, {
  brick_break: {
    set: function(val){
      this._brick_break = val;
    },
    get: function(){
      return this._brick_break;
    }
  },
  jump: {
    set: function(val){
      this._jump = val;
    },
    get: function(){
      return this._jump;
    }
  }
});

