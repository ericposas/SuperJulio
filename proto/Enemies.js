/*************
   ENEMIES
*************/

// GOOMBA // g
function Goomba (i, o, _count){
  this.goomba = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
    id: 'goomba-'+_count,
    isStatic: false,
    inertia: Infinity,
    friction: 0,
    render: {
      sprite: {
        xScale:0.25,
        yScale:0.25
      }
    }
  });
  this.feetRate = 0.35;
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
    alternateFeet: this.alternateFeet()
  }
  return this.goomba;
}

Goomba.prototype.alternateFeet = function(){ 
  //'walk' the sprite (animation)
  var _self = this;
  if(this.state != 'dead'){
    TweenLite.delayedCall(this.feetRate, function(){
      console.log(_self.state);
      _self.texture = (_self.texture == Enemy_Sprites.goomba[0] ? Enemy_Sprites.goomba[1] : Enemy_Sprites.goomba[0]);
      _self.alternateFeet();
    });
  }
}

Object.defineProperties(Goomba.prototype, {
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

