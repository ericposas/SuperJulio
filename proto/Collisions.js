/*************
  COLLISIONS -- CURRENTLY USING THE CODE BLOCK IN GAME CLASS 
*************/

function Collisions(game){
  this.game = game;
  this.init();
}

Collisions.prototype.init = function(){
  var _self = this;
  Matter.Events.on(this.game.engine, 'collisionStart', function(evt){
    var str = evt.pairs[0].id;
    // if char_id is colliding with a brick instance 
    if(str.indexOf('brick') && str.indexOf(_self.game.currentChar.id)){ 
      //get the proper brick 
      var id;
      var match = /brick\-(\d{1,})/g.exec(str);
      if(match && match[1]){ id = parseInt(match[1]) - 1; }
      if(id != null){
        var brick = _self.game.currentLevel.layout[id];
        _self.checkBrickBreak(brick);
      }else{
        _self.game.charJumpState == 'jumping' ? c.comment('standing on brick') : 0;
        _self.game.charStandingOn = 'brick';
      }
      if(KEYSTATES.leftarrow != 'down' && KEYSTATES.rightarrow != 'down'){
        _self.game.currentChar.render.sprite.texture = _self.game.charSpriteset[0];
      }
    }
  });
}

Collisions.prototype.checkBrickBreak = function(brick){
  var _self = this;
  if((this.game.currentChar.position.y > brick.position.y + 18) &&
     (this.game.currentChar.position.x > brick.position.x) &&
     (this.game.currentChar.position.x < brick.position.x + 35)){
    c.comment('brick break!');
    var mini_bricks = [];
    for(var i = 0; i < 4; i+=1){
      mini_bricks[i] = new MiniBrick(this.game.currentChar.position);
      var _x = getRandomInt(-0.001,0.002), _y = getRandomInt(-0.001,-0.002);
      Matter.World.add(this.game.engine.world, mini_bricks[i]);
      Matter.Body.applyForce(mini_bricks[i], mini_bricks[i].position, {
        x:_x,
        y:_y
      });
      Matter.Body.rotate(mini_bricks[i], getRandomInt(0.1, 5.0));
      TweenLite.delayedCall(0.5, function(){
        Matter.World.remove(_self.game.engine.world, mini_bricks);
      });
    }
    this.game.removeBody(brick);
  }
}

Object.defineProperties(Collisions.prototype, {
  game: {
    set: function(val){
      this._game = val;
    },
    get: function(){
      return this._game;
    }
  }
});