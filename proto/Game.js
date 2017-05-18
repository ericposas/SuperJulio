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
  // initial sprite set 
  this.sprites_r = this.sm_sprites_r;
  this.sprites_l = this.sm_sprites_l;
  this.charSpriteset = this.sprites_r;
  if(!this.spritei){ this.spritei = 0; }
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
  // setting canvas and context in case we want to draw over our scene 
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
  //this.renderCanvas();
  Matter.Engine.update(this.engine, 1000/60, 1);
  window.requestAnimationFrame(function(){
    _self.gameLoop();
  });
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
  if(this.currentChar && this.currentChar.position.y < 738 && this.isCharStandingOnAnything() == false){
    this.charJumpState = 'jumping';
    this.currentChar.render.sprite.texture = this.charSpriteset[2];
  }else{
    this.charJumpState = 'grounded';
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
  if(this.charStandingOn != 'brick' && this.charStandingOn != 'frick' &&
     this.charStandingOn != 'qblock' && this.charStandingOn != 'pblock'){
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
    _self.itemCollisionCheck(str); //get collision type (item, block, etc.)
    
    if(_self.currentChar && KEYSTATES.leftarrow != 'down' && KEYSTATES.rightarrow != 'down'){
      _self.currentChar.render.sprite.texture = _self.charSpriteset[0];
    }
  });
}

Game.prototype.itemCollisionCheck = function(str){
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
    }
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
  }
  
}

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
    this.charStandingOn = type;
    return false;
  }
}

Game.prototype.qBlockHit = function(qb, option){
  var frames = 10, rate = 0.0075;
  if(qb.state != 'hit'){
    if(option == 'p'){
      this.sounds.play('powerup_appears');
      this.shroomPopOut(qb);
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
  this.removeBody(shroom);
  this.currentChar.size = CHAR_BIG;
  this.sounds.play('powerup');
  this.characterGrow();
  console.log(this.currentChar.size); //code is repeating state character size/state change for some reason 
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
  var _self = this;
  if(block){
    TweenLite.delayedCall(0, function(){
      Matter.Body.translate(block.shroom, {x:0, y:40});
    });
  }
}


/*************
    POWERS
*************/

Game.prototype.characterGrow = function(){
  this.sprites_l = this.big_sprites_l;
  this.sprites_r = this.big_sprites_r;
  this.charFacing == 'right' ? this.charSpriteset = this.sprites_r : this.charSpriteset = this.sprites_l;
  this.currentChar.render.sprite.xScale = 0.5;
  this.currentChar.render.sprite.yScale = 0.5;
  GLOBALS.char.jumpForce.current = GLOBALS.char.jumpForce.big;
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
  this.charFacing = direction;
  //console.log(this.charFacing);
  this.increaseSpeed();
  if(this.spritei < GLOBALS.char.spriteswap.total_frames){
    this.spritei++;
  }else{
    this.spritei = 0;
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
    this.charSpriteset = this.sprites_r;
  }else{
    this.charSpriteset = this.sprites_l;
  }
  // currently switches between two sprites 
  if(this.charJumpState == 'jumping' && this.currentChar.render.sprite.texture != this.charSpriteset[2]){
    this.currentChar.render.sprite.texture = this.charSpriteset[2];
  }else if(this.spritei > GLOBALS.char.spriteswap.total_frames/2 && this.charJumpState != 'jumping'){
    this.currentChar.render.sprite.texture = this.charSpriteset[1];
  }else if(this.spritei < GLOBALS.char.spriteswap.total_frames/2 && this.charJumpState != 'jumping'){
    this.currentChar.render.sprite.texture = this.charSpriteset[0];
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
  if(this.currentChar && this.charJumpState != 'jumping'){
    this.playJumpSnd();
    Matter.Body.applyForce(this.currentChar, this.currentChar.position, {x:0,y:(GLOBALS.char.jumpForce.current*-1)});
    this.charStandingOn = 'nothing';
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

Game.prototype.addBody = function(body){
  Matter.World.add(this.engine.world, body);
}

Game.prototype.removeBody = function(body){
  Matter.World.remove(this.engine.world, body);
}

// Adds the specified level layout and sets the Game object's currentLevel to the new level in order to access that level's objects (boxes/bricks) -- Level layout is a multi-dimensional array 
Game.prototype.addLevel = function(lvl){
  var _self = this;
  Matter.World.add(this.engine.world, lvl.layout);
  this.currentLevel = lvl;
  if(lvl.char){
    TweenLite.delayedCall(GLOBALS.char.gamestart.delay, function(){
      Matter.World.add(_self.engine.world, lvl.char);
      _self.currentChar = lvl.char;
    });
  }
}

Game.prototype.removeLevel = function(lvl){
  Matter.World.remove(this.engine.world, lvl);
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
  images: {
    set: function(val){
      this._images = val;
    },
    get: function(){
      return this._images;
    }
  },
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
  charJumpState: {
    set: function(val){
      this._charJumpState = val;
    },
    get: function(){
      return this._charJumpState;
    }
  },
  charStandingOn: {
    set: function(val){
      this._charStandingOn = val;
    },
    get: function(){
      return this._charStandingOn;
    }
  },
  charIsUnderBrick: {
    set: function(val){
      this._charIsUnderBrick = val;
    },
    get: function(){
      return this._charIsUnderBrick;
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
  sm_sprites_r: {
    get: function(){
      return [ 'img/small/mario01.png', 'img/small/mario02.png', 'img/small/jump.png' ];
    }
  },
  sm_sprites_l: {
    get: function(){
      return [ 'img/small/mario01_l.png', 'img/small/mario02_l.png', 'img/small/jump_l.png' ];
    }
  },
  big_sprites_r: {
    get: function(){
      return [ 'img/big/big_mario01.png', 'img/big/big_mario02.png', 'img/big/big_mario_jump.png' ];
    }
  },
  big_sprites_l: {
    get: function(){
      return [ 'img/big/big_mario01_l.png', 'img/big/big_mario02_l.png', 'img/big/big_mario_jump_l.png' ];
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
  bg: {
    set: function(val){
      this._bg = val;
    },
    get: function(){
      return this._bg;
    }
  },
  /*block_types: {
    get: function(){
      return ['brick', 'frick', 'qblock', 'pblock'];
    }
  },
  item_types: {
    get: function(){
      return ['coin', 'mushroom', 'shroom'];
    }
  },*/
  item_types: {
    get: function(){
      return ['brick', 'frick', 'qblock', 'pblock', 'coin', 'mushroom', 'shroom'];
    }
  }
});



