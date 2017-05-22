/*************
  CHARACTER
*************/

const CHAR_SMALL = "small",
      CHAR_BIG = "big",
      MUSHROOM = "mushroom",
      FIREFLOWER = "fireflower",
      NONE = "none";

function Character(i, o){
  var char, x, y;
  if(i && o){
    x = (o*40)+20;
    y = (i*40)+20;
  }else{
    x = 100;
    y = 100;
  }
  char = Matter.Bodies.rectangle(x, y, 28, 38, {
    id: 'character',
    inertia: Infinity,
    friction: 0,
    render: {
      //fillStyle: 'rgba(0,0,0,1)',
      //opacity: 0.5,
      sprite: {
        xScale:0.9,
        yScale:0.9,
        texture: Images.mario
      }
    }
  });
  this.state = CHAR_SMALL;
  console.log(this.state);
  return char;
}

Object.defineProperties(Character.prototype, {
  size: {
    set: function(val){
      this._state = val;
    },
    get: function(){
      return this._state;
    }
  },
  power: {
    set: function(val){
      this._power = val;
    },
    get: function(){
      return this._power;
    }
  },
  charFacing: {
    set: function(val){
      this._charFacing = val;
    },
    get: function(){
      return this._charFacing;
    }
  },
  jumpState: {
    set: function(val){
      this._jumpState = val;
    },
    get: function(){
      return this._jumpState;
    }
  },
  standingOn: {
    set: function(val){
      this._standingOn = val;
    },
    get: function(){
      return this._standingOn;
    }
  },
  charSpriteset: {
    set: function(val){
      this._charSpriteset = val;
    },
    get: function(){
      return this._charSpriteset;
    }
  },
  sprites_r: {
    set: function(val){
      this._sprites_r = val;
    },
    get: function(){
      return this._sprites_r;
    }
  },
  sprites_l: {
    set: function(val){
      this._sprites_l = val;
    },
    get: function(){
      return this._sprites_l;
    }
  },
  // amount of frames per walkcycle 
  spritei: {
    set: function(val){
      this._spritei = val;
    },
    get: function(){
      return this._spritei;
    }
  },
  active_fballs: {
    set: function(val){
      this._active_fballs = val;
    },
    get: function(){
      return this._active_fballs;
    }
  }
});


