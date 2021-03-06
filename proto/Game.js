/*************
 GAME "CLASS"
*************/

function Game(){
  // class objects for private variable access 
  //this.images = new Images();
  this.sounds = new Sounds();
  // create an engine
  this.engine = Matter.Engine.create();
  // create a renderer
  this.render = Matter.Render.create({
    element: document.getElementById('game-container'),
    engine: this.engine,
    options: {
      wireframes: false,
      background: 'transparent', //COLORS.sky2,
      width: 480,
      height: 800
    }
  });
}


/*************
  GAME INIT
*************/

Game.prototype.start = function(){
  var _self = this;
  // run the engine
  Matter.Engine.run(this.engine);
  // run the renderer
  Matter.Render.run(this.render);
  // run game loop
  this.gameLoop();
  // collisions  
  this.collisions();
  // enemies
  //this.animateEnemies();
  // setting canvas and context in case we want to draw over our scene 
  // -maybe we'll use this for drawing the game's GUI elements (score, coin count, etc.) 
  this.canv = document.getElementsByTagName('canvas')[0];
  this.ctx = this.canv.getContext('2d');
}


/*************
  GAME LOOP
*************/

Game.prototype.gameLoop = function(){
  var _self = this;
  if(this.currentChar){
    this.currentChar.inertia = Infinity;
  }
  this.testJump();
  this.testBounds();
  this.scroll();
  this.animateEnemies();
  //this.renderCanvas();
  Matter.Engine.update(this.engine, 1000/60, 1);
  window.requestAnimationFrame(function(){
    _self.gameLoop();
  });
}

// Include enemies to game loop 
Game.prototype.animateEnemies = function(){
  
  for(var i = 0, goombas = this.currentLevel.goombas; i < goombas.length; i+=1){
    //if any goomba is at an x position that's less than the x position of the very first brick 
    if((goombas[i].position.x < this.currentLevel.bricks[0].position.x + 40)){
      goombas[i].props.facing = 'right';
    }
    //if any goomba is at an x pos that's more than the x pos of the very last brick 
    if((goombas[i].position.x > this.currentLevel.bricks[this.currentLevel.bricks.length-1].position.x - 40)){
      goombas[i].props.facing = 'left';
    }
    //console.log(goombas[3].position.y); 660
    //animate our goombas either right or left, depending on the above calculation 
    if(goombas[i].props.state != 'dead'){
      Matter.Body.translate(goombas[i], {
        x:(goombas[i].props.facing == 'left' ? -1 : 1),
        y:0 //(goombas[i].position.y < 660 ? 1 : 0)
      });
    }
    
  }
}

// Render canvas elements (outside of matter.js bodies)
Game.prototype.renderCanvas = function(){
  if(this.ctx){
    this.ctx.fillStyle = '#6b88ff';
    this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);
  }
}

// Testing game boundaries 
Game.prototype.testBounds = function (){
  // stage stop-scroll bounds 
  if((this.currentLevel) &&
     (this.currentLevel.bricks[0].position.x < GLOBALS.stage.adjust) &&
     (this.currentChar.position.x < GLOBALS.char.walklimit.right)){
    this.leftBounds = false;
  }else{
    this.leftBounds = true;
  }
  if((this.currentChar) &&
     (this.currentLevel) &&
     (this.currentLevel.bricks[this.currentLevel.bricks.length-1].position.x > this.w - GLOBALS.stage.adjust) &&
     (this.currentChar.position.x > GLOBALS.char.walklimit.left)){
    this.rightBounds = false;
  }else{
    this.rightBounds = true;
  }
  // character bounds 
  if(this.currentChar && this.currentChar.position.x > GLOBALS.stage.charlimit.begin){
    this.charLeftBounds = false;
  }else{
    this.charLeftBounds = true;
  }
  if(this.currentChar && this.currentChar.position.x < GLOBALS.stage.charlimit.end){
    this.charRightBounds = false;
  }else{
    this.charRightBounds = true;
  }
}

Game.prototype.testJump = function(){
  if(this.currentChar && this.currentChar.charSpriteset && this.currentChar.position.y < 738 && this.isCharStandingOnAnything() == false){
    this.currentChar.jumpState = 'jumping';
    this.currentChar.render.sprite.texture = this.currentChar.charSpriteset[2];
  }else if(this.currentChar){
    this.currentChar.jumpState = 'grounded';
  }
}

// Scrolling  
Game.prototype.scroll = function (){
  if(KEYSTATES.leftarrow == 'down'){
    if(this.leftBounds == false){
      this.move('right');
    }
    if(this.charLeftBounds == false){
      this.movechar('left');
    }
  }
  if(KEYSTATES.rightarrow == 'down'){
    if(this.rightBounds == false){
      this.move('left');
    }
    if(this.charRightBounds == false){
      this.movechar('right');
    }
  }
}

Game.prototype.isCharStandingOnAnything = function(){
  if(this.currentChar.standingOn != 'brick' && this.currentChar.standingOn != 'frick' &&
     this.currentChar.standingOn != 'qblock' && this.currentChar.standingOn != 'pblock' &&
     this.currentChar.standingOn != 'fblock'){
    return false;
  }else{
    return true;
  }
}


/*************
  COLLISIONS
*************/

var CollisionCategories = {
  masked : 0x0002
}

Game.prototype.collisions = function(){
  var _self = this;
  Matter.Events.on(this.engine, 'collisionStart', function(evt){
    var str = evt.pairs[0].id; //get collision pairs 
    //get collision type (item, block, etc.)
    _self.collisionCheck(str); 
    _self.enemyCollisions(str);
    
    if(_self.currentChar && _self.currentChar.charSpriteset && KEYSTATES.leftarrow != 'down' && KEYSTATES.rightarrow != 'down'){
      _self.currentChar.render.sprite.texture = _self.currentChar.charSpriteset[0];
    }
  });
}

Game.prototype.enemyCollisions = function(str){
  if(str.indexOf('goomnba')){
    //GOOMBAS
    // get the body types and ids, and store them in 'body_props' object 
    var rgx = /A(\w+)\-(\d+)B(\w+)\-(\d+)/g;
    var m = rgx.exec(str);
    if(m && m[1] && m[2] && m[3] && m[4]){
      body_props = {
        body1: m[1],
        body2: m[3],
        id1: m[2],
        id2: m[4]
      };
    }
    // if we have both bodies, test for goombas 
    if(body_props.body1 != null && body_props.body2 != null){
      var _self = this;
      //var body1 = this.currentLevel[body_props.body1+'s'][(parseInt(body_props.id1)-1)];
      var body1 = (function(){
        if(body_props.body1 == 'character'){
          return _self.currentChar;
        }else{
          return _self.currentLevel[body_props.body1+'s'][(parseInt(body_props.id1)-1)];
        }
      })();
      var body2 = (function(){
        if(body_props.body2 == 'character'){
          return _self.currentChar;
        }else{
          return _self.currentLevel[body_props.body2+'s'][(parseInt(body_props.id2)-1)];
        }
      })();
      
      if(body1 != null && body2 != null){
        //console.log(body1 + ', ' + body2);
        /*if(body_props.body1 == 'goomba' && (body2.position.y < (body1.position.y + 4))){
          body1.props.facing = (body1.props.facing == 'left' ? 'right' : 'left');
        }
        if(body_props.body2 == 'goomba' && (body1.position.y < (body2.position.y + 4))){
          body2.props.facing = (body2.props.facing == 'left' ? 'right' : 'left');
        }*/
        if(body_props.body1 == 'character' && body_props.body2 == 'goomba'){
          if(body1.position.y < body2.position.y){
            //game.removeBody(body2);
            body2.collisionFilter = { mask:CollisionCategories.masked };
            body2.props.state = 'dead';
            killGoomba(body2);
          }else{
            console.log('character got hit!');
          }
        }
        if(body_props.body2 == 'character' && body_props.body1 == 'goomba'){
          if(body2.position.y < body1.position.y){
            //game.removeBody(body1);
            body1.collisionFilter = { mask:CollisionCategories.masked };
            body1.props.state = 'dead';
            killGoomba(body1);
          }else{
            console.log('character got hit!');
          }
        }
        function killGoomba(goomba){
          goomba.render.sprite.xScale = 0.4;
          goomba.render.sprite.yScale = 0.075;
          goomba.position.y = 676;
          if(goomba.removing != 'removing'){
            var goom = goomba;
            TweenLite.delayedCall(1, function(){
              goom.removing = 'removing';
              if(goom){
                game.removeBody(goom);
                console.log(goom.id+' removed.');
                console.log(game.currentLevel.goombas); //'goombas' array still holds a reference to the matter.js body (goomba) 
              }
            });
          }
        }
        
      }
    }
  }
  
}

Game.prototype.collisionCheck = function(str){
  //loop thru and check for collisions on on all brick types 
  if(this.currentChar && (str.indexOf(this.currentChar.id))){
    for(var i = 0; i < this.item_types.length; i++){
      this.itemTypeCheck(this.item_types[i], str);
    }
  }
}

Game.prototype.itemTypeCheck = function(type, str){
  var _self = this;
  if(str.indexOf(type)){
    var id = _self.getBodyID(type, str);
    var item = _self.currentLevel[type+'s'][id];
    //check for block types 
    if(item && type.indexOf('ck') != -1){
      this.hitBlock(type, item);
    }else if(item){
      this.getItem(type, item);
    }
  }
}

Game.prototype.hitBlock = function(type, item){
  // hit the brick/block if character is underneath it 
  if(this.checkCharIsUnderBrick(type, item) == true){
    switch(type){
      case 'brick':
        this.brickBreak(item);
        break;
      case 'frick':
        this.qBlockHit(item);
        break;
      case 'qblock':
        this.qBlockHit(item);
        break;
      case 'pblock':
        this.qBlockHit(item, 'p');
        break;
      case 'fblock':
        this.qBlockHit(item, 'f');
        break;
      default:
        return false;
    }
  }
}

Game.prototype.isItem = function(item){
  if(item == 'coin' || item == 'mushroom' || item == 'shroom' || item == 'flower'){
    return true;
  }else{
    return false;
  }
}

Game.prototype.getItem = function(type, item){
  switch(type){
    case 'coin':
      this.coinGet(item);
      break;
    case 'mushroom':
      this.shroomGet(item);
      break;
    case 'shroom':
      this.shroomGet(item);
      break;
    case 'flower':
      this.flowerGet(item);
      break;
    default:
      return false;
  }
}

/*Game.prototype.testForEnemy = function(enemy){
  console.log(arguments[1]);
}*/

Game.prototype.getBodyID = function(type, str){
  var rgx = new RegExp(type+"\\-(\\d{1,})", "g");
  var match = rgx.exec(str);
  if(match && match[1]){
    return (parseInt(match[1]) - 1);
  }
}


/************
  BLOCK HIT
************/

Game.prototype.checkCharIsUnderBrick = function(type, brick){
  if((this.currentChar.position.y > brick.position.y + 22) &&
     (this.currentChar.position.x > brick.position.x - 22) &&
     (this.currentChar.position.x < brick.position.x + 35)){
    return true;
  }else{
    this.currentChar.standingOn = type;
    return false;
  }
}

Game.prototype.qBlockHit = function(qb, option){
  var frames = 10, rate = 0.0075;
  if(qb.state != 'hit'){
    if(option == 'p' || option == 'f'){
      this.sounds.play('powerup_appears');
      option == 'f' ? this.flowerPopOut(qb) : this.shroomPopOut(qb);
    }else{
      this.sounds.play('coin');
      this.blockCoinPop(qb.position);
    }
    this.sounds.play('bump');
    animateBlock();
    qb.state = 'hit';
  }else{
    this.sounds.play('bump');
  }
  function animateBlock(){
    for(var i = 0; i < frames; i++){
      var d = (i*rate);
      TweenLite.delayedCall(d, function(){
        Matter.Body.translate(qb, {x:0,y:-1});
      });
    }
    TweenLite.delayedCall((frames*rate), function(){
      for(var i = 0; i < frames; i++){
        var d = (i*rate);
        TweenLite.delayedCall(d, function(){
          Matter.Body.translate(qb, {x:0,y:1});
        });
      }
      qb.render.sprite.xScale = 0.4;
      qb.render.sprite.yScale = 0.4;
      qb.render.sprite.texture = Images.empty_block;
    });
  }
}

Game.prototype.brickBreak = function(brick){
  if(this.currentChar.size == CHAR_BIG){
    this.sounds.play('brick');
    var mini_bricks = [],
        _self = this,
        x_range = [-0.002, -0.001, 0, 0.001, 0.002],
        y_range = [-0.005, -0.004, -0.003, -0.002, -0.001];
    for(var i = 0; i < 4; i+=1){
      mini_bricks[i] = new MiniBrick(this.currentChar.position);
      var _x = x_range[getRandomInt(0,x_range.length-1)],
          _y = y_range[getRandomInt(0,y_range.length-1)];
      Matter.World.add(this.engine.world, mini_bricks[i]);
      Matter.Body.applyForce(mini_bricks[i], mini_bricks[i].position, {x:_x,y:_y});
      Matter.Body.rotate(mini_bricks[i], getRandomInt(1, 50));
      TweenLite.delayedCall(1.5, function(){
        Matter.World.remove(_self.engine.world, mini_bricks);
      });
    }
    this.removeBody(brick);
  }else{
    this.sounds.play('bump');
  }
}


/********
  ITEMS
*********/

Game.prototype.shroomGet = function(shroom){
  if(this.currentChar.position.y < shroom.position.y + 4){
    this.removeBody(shroom);
    this.currentChar.size = CHAR_BIG;
    this.sounds.play('powerup');
    if(this.currentChar.power != FIREFLOWER){
      this.currentChar.power = MUSHROOM;
      this.characterGrow();
    }
  }
}

Game.prototype.flowerGet = function(flower){
  if(this.currentChar.position.y < flower.position.y + 4){ 
    this.removeBody(flower);
    this.currentChar.size = CHAR_BIG;
    this.currentChar.power = FIREFLOWER;
    this.sounds.play('powerup');
    this.characterFirePower();
  }
}

Game.prototype.coinGet = function(coin){
  this.sounds.play('coin');
  this.removeBody(coin);
}

Game.prototype.blockCoinPop = function(pos){
  var coin = new BlockCoin(pos),
      _self = this;
  this.addBody(coin);
  Matter.Body.applyForce(coin, coin.position, {x:0,y:-0.02});
  TweenLite.delayedCall(1.25, function(){
    _self.removeBody(coin);
  });
}

Game.prototype.shroomPopOut = function(block){
  if(block){
    Matter.World.add(this.engine.world, block.shroom);
  }
}

Game.prototype.flowerPopOut = function(block){
  if(block){
    Matter.World.add(this.engine.world, block.flower);
  }
}


/*************
    POWERS
*************/

Game.prototype.characterGrow = function(){
  this.currentChar.sprites_l = Sprites.big_sprites_l;
  this.currentChar.sprites_r = Sprites.big_sprites_r;
  this.getBig();
}

Game.prototype.characterFirePower = function(){
  this.currentChar.sprites_l = Sprites.fire_sprites_l;
  this.currentChar.sprites_r = Sprites.fire_sprites_r;
  this.getBig();
}

Game.prototype.getBig = function(){
  this.currentChar.charFacing == 'right' ? this.currentChar.charSpriteset = this.currentChar.sprites_r : this.currentChar.charSpriteset = this.currentChar.sprites_l;
  this.currentChar.render.sprite.xScale = 0.48;
  this.currentChar.render.sprite.yScale = 0.48;
  GLOBALS.char.jumpForce.current = GLOBALS.char.jumpForce.big;
}

Game.prototype.char_throwFireBall = function(){
  var _self = this,
      fball_props = {
        removal_delay : 0.75,
        num_limit : 2
      };
  if(!this.currentChar.active_fballs){ this.currentChar.active_fballs = 0; }
  if(this.currentChar.power == FIREFLOWER && this.currentChar.active_fballs < fball_props.num_limit){
    this.sounds.play('fireball');
    var fball = Matter.Bodies.circle(
        (this.currentChar.charFacing == 'right' ? this.currentChar.position.x + 10 : this.currentChar.position.x - 10),
        this.currentChar.position.y - 20, 10, {
      fillStyle: "#FF0000",
      restitution: 1,
      render: {
        sprite: {
          xScale: 0.15,
          yScale: 0.15,
          texture: Images.fireball
        }
      }
    });
    this.currentChar.active_fballs+=1;
    this.addBody(fball);
    Matter.Body.applyForce(fball, fball.position, {
      x:this.currentChar.charFacing == 'right' ? (0.0075) : (0.0075 * -1),
      y:-0.005
    });
    Matter.Body.setAngularVelocity(fball, 0.2);
    TweenLite.delayedCall(fball_props.removal_delay, function(){
      game.removeBody(fball);
      game.currentChar.active_fballs-=1;
    });
  } 
  
}


/*************
   MOVEMENT
*************/

// Move stage bodies (bricks/boxes/etc.) 
Game.prototype.move = function (direction){
  this.increaseSpeed();
  for(var i = 0; i < this.currentLevel.layout.length; i++){
    Matter.Body.translate(this.currentLevel.layout[i], {x:(direction == 'right' ? GLOBALS.char.accel.speed : (GLOBALS.char.accel.speed*-1)), y:0});
  }
  // scroll the bg image in the background canvas element 
  if(direction == 'right' && this.bg.x < -10){
    if(this.bg){ this.bg.x++; }
  }else{
    if(this.bg){ this.bg.x--; }
  }
}

// Move character 
Game.prototype.movechar = function(direction){
  //console.log(GLOBALS.char.accel.speed);
  this.currentChar.charFacing = direction;
  this.increaseSpeed();
  if(this.currentChar.spritei < GLOBALS.char.spriteswap.total_frames){
    this.currentChar.spritei++;
  }else{
    this.currentChar.spritei = 0;
  }
  this.swapsprite(direction);
  if(this.leftBounds == true || this.rightBounds == true){
    this.char_x_translate = (direction == 'right' ? (GLOBALS.char.accel.speed) : ((GLOBALS.char.accel.speed)*-1));
  }else{
    this.char_x_translate = (direction == 'right' ? 0 : 0);
  }
  Matter.Body.translate(this.currentChar, {x:this.char_x_translate, y:-1});
}
Object.defineProperty(Game.prototype, 'char_x_translate', {
  set: function(val){
    this._char_x_translate = val;
  },
  get: function(){
    return this._char_x_translate;
  }
});
// Swap game character sprite 
Game.prototype.swapsprite = function(direction){
  if(direction == 'right'){
    this.currentChar.charSpriteset = this.currentChar.sprites_r;
  }else{
    this.currentChar.charSpriteset = this.currentChar.sprites_l;
  }
  // currently switches between two sprites 
  if(this.currentChar.jumpState == 'jumping' && this.currentChar.render.sprite.texture != this.currentChar.charSpriteset[2]){
    this.currentChar.render.sprite.texture = this.currentChar.charSpriteset[2];
  }else if((this.currentChar.spritei > GLOBALS.char.spriteswap.total_frames/2) &&
           (this.currentChar.charSpriteset) && (this.currentChar.jumpState != 'jumping')){
    this.currentChar.render.sprite.texture = this.currentChar.charSpriteset[1];
  }else if((this.currentChar.spritei < GLOBALS.char.spriteswap.total_frames/2) &&
           (this.currentChar.charSpriteset) && (this.currentChar.jumpState != 'jumping')){
    this.currentChar.render.sprite.texture = this.currentChar.charSpriteset[0];
  }
}

Game.prototype.increaseSpeed = function(){
  if(GLOBALS.char.accel.speed < GLOBALS.char.accel.max){
    GLOBALS.char.accel.speed+=GLOBALS.char.accel.rate; 
  }
}

Game.prototype.decelerate = function(direction){
  if(this.leftBounds == false && this.rightBounds == false){
    this.processDecel(direction);
  }else{
    GLOBALS.char.accel.speed = 0;
  }
}
Game.prototype.processDecel = function (direction){
  var _self = this, d = direction;
  // if char speed is still over 0 (the min)
  if( (GLOBALS.char.accel.speed > GLOBALS.char.accel.min) &&
     (KEYSTATES.leftarrow != 'down') &&
     (KEYSTATES.rightarrow != 'down') ){
    // decrease speed and animate the change 
    GLOBALS.char.accel.speed = (GLOBALS.char.accel.speed - GLOBALS.char.accel.rate);
    TweenLite.delayedCall(0.005, function(){
      _self.decel(d);
    });
  }
}
Game.prototype.decel = function (direction){
  if(this.leftBounds == false && this.rightBounds == false){
    for(var i = 0; i < this.currentLevel.layout.length; i++){
      Matter.Body.translate(this.currentLevel.layout[i], {x:(direction == 'right' ? GLOBALS.char.accel.speed : (GLOBALS.char.accel.speed*-1)), y:0});
    }
    // call to make it recursive 
    this.processDecel(direction);
  }else{
    GLOBALS.char.accel.speed = 0;
  }
}

Game.prototype.jump = function(){
  // apply jump force to character 
  if(this.currentChar && this.currentChar.jumpState != 'jumping'){
    this.playJumpSnd();
    Matter.Body.applyForce(this.currentChar, this.currentChar.position, {x:0,y:(GLOBALS.char.jumpForce.current*-1)});
    this.currentChar.standingOn = 'nothing';
  }
}

Game.prototype.playJumpSnd = function(){
  if(this.currentChar.size == CHAR_BIG){
    this.sounds.play('big_jump');
  }else{
    this.sounds.play('jump');
  }
}


/*************
  ADD BODIES
*************/

Game.prototype.addCharacter = function(char){
  var _self = this;
  TweenLite.delayedCall(GLOBALS.char.gamestart.delay, function(){
    Matter.World.add(_self.engine.world, char);
    // initial sprite set 
    _self.currentChar = char;
    _self.currentChar.power = NONE;
    _self.currentChar.sprites_r = Sprites.sm_sprites_r;
    _self.currentChar.sprites_l = Sprites.sm_sprites_l;
    _self.currentChar.charSpriteset = _self.currentChar.sprites_r;
    if(!_self.currentChar.spritei){ _self.currentChar.spritei = 0; }
  });
}

Game.prototype.addBody = function(body){
  Matter.World.add(this.engine.world, body);
}

Game.prototype.removeBody = function(body){
  Matter.World.remove(this.engine.world, body);
}

// Adds the specified level layout and sets the Game object's currentLevel
//to the new level in order to access that level's objects (boxes/bricks)
//-- Level layout is a multi-dimensional array 
Game.prototype.addLevel = function(lvl){
  if(this.shroom_ids){
    this.shroom_ids = [];
  }
  //Matter.World.add(this.engine.world, lvl.layout);
  this.buildLevel(lvl);
  this.currentLevel = lvl;
  if(lvl.char){
    this.addCharacter(lvl.char);
  }
}

// powerups is a list of regex words to match/check for 
Game.prototype.buildLevel = function(lvl){
  var powerups = ["flower", "shroom"];
  this.checkLevelBit(lvl, powerups);
  
}

Game.prototype.checkLevelBit = function(lvl, rgx){
  for(var i = 0; i < lvl.layout.length; i++){
    var m = RegExp("(\^"+rgx[0]+")\\-(\\d{1,})", "g").exec(lvl.layout[i].id);
    var m2 = RegExp("(\^"+rgx[1]+")\\-(\\d{1,})", "g").exec(lvl.layout[i].id);
    if(!m && !m2){
      Matter.World.add(this.engine.world, lvl.layout[i]);
      //console.log(lvl.layout[i].id);
    }
  }
}

Game.prototype.removeLevel = function(lvl){
  for(var i = 0; i < lvl.layout.length; i++){
    Matter.World.remove(this.engine.world, lvl.layout[i]);
  }
}

Game.prototype.swapLevel = function(newlvl){
  TweenLite.delayedCall(1.5, function(){
    game.removeLevel(game.currentLevel);
    console.log('Removing ' + game.currentLevel.name+'...');
  });
  TweenLite.delayedCall(GLOBALS.level.swapdelay, function(){
    game.addLevel(newlvl);
    console.log('Now adding '+newlvl.name+'...');
  });
}


/*************
  PROPERTIES
*************/

Object.defineProperties(Game.prototype, { 
  name: {
    set: function(val){
      this._name = val;
    },
    get: function(){
      return this._name;
    }
  },
  // private variables
  sounds: {
    set: function(val){
      this._sounds = val;
    },
    get: function(){
      return this._sounds;
    }
  },
  // HTML5 canvas element
  canv: {
    set: function(val){
      this._canv = val;
    },
    get: function(){
      return this._canv;
    }
  },
  // canvas element 2D context 
  ctx: {
    set: function(val){
      this._ctx = val;
    },
    get: function(){
      return this._ctx;
    }
  },
  engine: {
    set: function(val){
      this._engine = val;
    },
    get: function(){
      return this._engine;
    }
  },
  render: {
    set: function(val){
      this._render = val;
    },
    get: function(){
      return this._render;
    }
  },
  w: {
    set: function(val){
      this._w = val;
    },
    get: function(){
      return this._w;
    }
  },
  h: {
    set: function(val){
      this._h = val;
    },
    get: function(){
      return this._h;
    }
  },
  dimensions: {
    get: function(){
      return 'Game dimensions: ' + this._w + ', ' + this._h;
    }
  },
  currentLevel: {
    set: function(val){
      this._currentLevel = val;
    },
    get: function(){
      return this._currentLevel;
    }
  },
  currentChar: {
    set: function(val){
      this._currentChar = val;
    },
    get: function(){
      return this._currentChar;
    }
  },
  leftBounds: {
    set: function(val){
      this._leftBounds = val;
    },
    get: function(){
      return this._leftBounds;
    }
  },
  rightBounds: {
    set: function(val){
      this._rightBounds = val;
    },
    get: function(){
      return this._rightBounds;
    }
  },
  charLeftBounds: {
    set: function(val){
      this._charLeftBounds = val;
    },
    get: function(){
      return this._charLeftBounds;
    }
  },
  charRightBounds: {
    set: function(val){
      this._charRightBounds = val;
    },
    get: function(){
      return this._charRightBounds;
    }
  },
  bg: {
    set: function(val){
      this._bg = val;
    },
    get: function(){
      return this._bg;
    }
  },
  item_types: {
    get: function(){
      return ['brick', 'frick', 'qblock', 'pblock', 'fblock', 'coin', 'mushroom', 'shroom', 'flower', 'goomba'];
    }
  }
});


