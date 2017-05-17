/*************
   SOUND FX
*************/

function Sounds(){
  this.brick_break = new Howl({
    src: ['sfx/smb_breakblock.wav'],
    volume: 0.5
  });
  this.jump = new Howl({
    src: ['sfx/smb_jump_small.wav'],
    volume: 0.75
  });
  this.big_jump = new Howl({
    src: ['sfx/smb_jump_super.wav'],
    volume: 0.75
  });
  this.bump = new Howl({
    src: ['sfx/smb_bump.wav'],
    volume: 0.75
  });
  this.coin = new Howl({
    src: ['sfx/smb_coin.wav'],
    volume: 0.75
  });
  this.powerup = new Howl({
    src: ['sfx/smb_powerup.wav']
  });
  this.powerup_appears = new Howl({
    src: ['sfx/smb_powerup_appears.wav'],
    volume: 0.75
  });
  
}

Sounds.prototype.play = function(sndName){
  switch(sndName){
    case 'brick':
      this.brick_break.play();
      break;
    case 'jump':
      this.jump.play();
      break;
    case 'big_jump':
      this.big_jump.play();
      break;
    case 'bump':
      this.bump.play();
      break;
    case 'coin':
      this.coin.play();
      break;
    case 'powerup':
      this.powerup.play();
      break;
    case 'powerup_appears':
      this.powerup_appears.play();
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
  big_jump: {
    set: function(val){
      this._big_jump = val;
    },
    get: function(){
      return this._big_jump;
    }
  },
  jump: {
    set: function(val){
      this._jump = val;
    },
    get: function(){
      return this._jump;
    }
  },
  bump: {
    set: function(val){
      this._bump = val;
    },
    get: function(){
      return this._bump;
    }
  },
  coin: {
    set: function(val){
      this._coin = val;
    },
    get: function(){
      return this._coin;
    }
  },
  powerup: {
    set: function(val){
      this._powerup = val;
    },
    get: function(){
      return this._powerup;
    }
  },
  powerup_appears: {
    set: function(val){
      this._powerup_appears = val;
    },
    get: function(){
      return this._powerup_appears;
    }
  }
});

