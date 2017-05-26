/*************
   ENEMIES
*************/

// GOOMBA // g
function Goomba (i, o, _count){
  this._count = _count;
  this.goomba = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
    id: 'goomba-'+_count,
    count: _count,
    isStatic: true,
    //inertia: Infinity,
    friction: 0,
    render: {
      sprite: {
        xScale:0.25,
        yScale:0.25
      }
    }
  });
  this.walk_frames = 0;
  this.feetRate = 0.025;
  //set 'texture' property to our enemy sprite
  this.texture = Enemy_Sprites.goomba[0];
  //set the physics object texture to the 'texture' prop 
  this.goomba.render.sprite.texture = this.texture;
  this.state = 'alive'; //this.STATES.alive;
  this.facing = 'left'; //this.DIRECTIONS.left;
  //inject our custom props into the matter.js object 
  this.goomba.props = {
    state: this.state,
    facing: this.facing,
    texture: this.texture,
    last_x: this.last_x,
    walk: this.walk()
  }
  return this.goomba;
}

Goomba.prototype.walk = function(){ 
  //'walk' the sprite (animation)
  var _self = this;
  TweenLite.delayedCall(this.feetRate, function(){
    _self.walk_frames++;
    if((_self.walk_frames > 8) &&
       (game.currentLevel.goombas[_self._count-1].props.state != 'dead')){
      _self.texture = (_self.texture == Enemy_Sprites.goomba[0] ? Enemy_Sprites.goomba[1] : Enemy_Sprites.goomba[0]);
      _self.walk_frames = 0;
    }
    _self.walk();
  });
}

Object.defineProperties(Goomba.prototype, {
  walk_frames: {
    set: function(v){
      this._walk_frames = v;
    },
    get: function(){
      return this._walk_frames;
    }
  },
  last_x: {
    set: function(v){
      this._last_x = v;
    },
    get: function(){
      return this._last_x;
    }
  },
  state: {
    set: function(v){
      this._state = v;
    },
    get: function(){
      return this._state;
    }
  },
  facing: {
    set: function(v){
      this._facing = v;
    },
    get: function(){
      return this._facing;
    }
  },
  feetRate: {
    set: function(v){
      this._feetRate = v;
    },
    get: function(){
      return this._feetRate;
    }
  },
  texture: {
    set: function(v){
      this._texture = v;
      this.goomba.render.sprite.texture = this.texture;
    },
    get: function(){
      return this._texture;
    }
  }/*,
  STATES: {
    get: function(){
      return {
        alive : 'alive',
        dead : 'dead'
      };
    }
  },
  DIRECTIONS: {
    get: function(){
      return {
        left : 'left',
        right : 'right'
      }
    }
  }*/
});

