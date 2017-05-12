// KEYS //

// CONSTANTS 
const KEYCODES = {
  spacebar : 32,
  leftarrow : 37,
  rightarrow : 39,
  uparrow : 38,
  downarrow : 40,
  w : 87,
  a : 65,
  s : 83,
  d : 68
}
var KEYSTATES = {
  leftarrow : '',
  rightarrow : ''
}


function Keys(game){
  this.construct();
  // pass game class instance in order to use the reference 
  this.game = game;
}

Keys.prototype.construct = function(){
  // Add game area click tester
  document.getElementById('game-container').addEventListener('click', this.clicktest.bind(this));
  // Add key up/down detection and state-setting 
  document.body.addEventListener('keydown', this.keysdown.bind(this));
  document.body.addEventListener('keyup', this.keysup.bind(this));
}

// GAME CONTAINER - CLICK //
Keys.prototype.clicktest = function(){
  c.comment('game container -- click.');
}


// ARROW KEYS DOWN //
Keys.prototype.keysdown = function(e){
  if((e.keyCode == KEYCODES.leftarrow) || (e.keyCode == KEYCODES.a)){
    if(GLOBALS.char.accel.speed > 0 && KEYSTATES.leftarrow != 'down'){
      GLOBALS.char.accel.speed = 0;
    }
    KEYSTATES.leftarrow = 'down';
  }
  if((e.keyCode == KEYCODES.rightarrow) || (e.keyCode == KEYCODES.d)){
    if(GLOBALS.char.accel.speed > 0 && KEYSTATES.rightarrow != 'down'){
      GLOBALS.char.accel.speed = 0;
    }
    KEYSTATES.rightarrow = 'down';
  }
  // JUMP //
  if((e.keyCode == KEYCODES.uparrow) || (e.keyCode == KEYCODES.w)){
    this.game.jump();
  }
}

// ARROW KEYS UP //
Keys.prototype.keysup = function(e){
  if((e.keyCode == KEYCODES.leftarrow) || (e.keyCode == KEYCODES.a)){
    KEYSTATES.leftarrow = 'up';
    this.game.decelerate('right');
    this.game.currentChar.render.sprite.texture = this.game.charSpriteset[0];
  }
  if((e.keyCode == KEYCODES.rightarrow) || (e.keyCode == KEYCODES.d)){
    KEYSTATES.rightarrow = 'up';
    this.game.decelerate('left');
    this.game.currentChar.render.sprite.texture = this.game.charSpriteset[0];
  }
}

Object.defineProperties(Keys.prototype, {
  game: {
    set: function(val){
      this._game = val;
    },
    get: function(){
      return this._game;
    }
  }
});

