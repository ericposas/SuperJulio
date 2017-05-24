/*************
    LEVEL
*************/  

function Level(level){
  var layout = this.layout(level.lvl);
  this.name = level.name;
  this.rows = level.lvl;
  return {
    name:this.name,
    layout:layout,
    rows:this.rows,
    //blocks
    qblocks:this.qblocks,
    pblocks:this.pblocks,
    fblocks:this.fblocks,
    bricks:this.bricks,
    fricks:this.fricks,
    //items
    coins:this.coins,
    mushrooms:this.mushrooms,
    shrooms:this.shrooms,
    flowers:this.flowers,
    //enemies
    goombas:this.goombas,
    //character
    char:this.character
  };
}

Level.prototype.layout = function(rows){
  var blocks = [];
  var brick_count = 0;
  var qblock_count = 0;
  var pblock_count = 0;
  var fblock_count = 0;
  var frick_count = 0;
  var coin_count = 0;
  var mushroom_count = 0;
  var shroom_count = 0;
  var flower_count = 0;
  var goomba_count = 0;
  // build level layout based on grid passed in 
  for(var i = 0; i < rows.length; i++){ 
    for(var o = 0; o < rows[i].length; o++){
      if(rows[i][o] == 1){
        brick_count+=1;
        var brick = new Brick(i,o,brick_count);
        this.bricks.push(brick);
        blocks.push(brick);
      }
      if(rows[i][o] == 2){
        frick_count+=1;
        var frick = new FauxBrick(i,o,frick_count);
        this.fricks.push(frick);
        blocks.push(frick);
      }
      if(rows[i][o] == '?'){
        qblock_count+=1;
        var qblock = new Qblock(i,o,qblock_count);
        this.qblocks.push(qblock);
        blocks.push(qblock);
      }
      if(rows[i][o] == '?p'){
        pblock_count+=1;
        shroom_count+=1;
        var pblock = new Qblock(i,o,pblock_count,'p');
        this.pblocks.push(pblock);
        // shroom isn't added to world until the block is hit
        var shroom = new Shroom({x:pblock.position.x,y:pblock.position.y-20}, shroom_count); 
        this.shrooms.push(shroom);
        pblock.shroom = shroom;
        blocks.push(pblock);
        blocks.push(shroom);
      }
      if(rows[i][o] == '?f'){
        fblock_count+=1;
        flower_count+=1;
        var fblock = new Qblock(i,o,fblock_count,'f');
        this.fblocks.push(fblock);
        var flower = new FireFlower({x:fblock.position.x,y:fblock.position.y-20}, flower_count);
        this.flowers.push(flower);
        fblock.flower = flower;
        blocks.push(fblock);
        blocks.push(flower);
      }
      /* ITEMS */
      if(rows[i][o] == 'm'){
        mushroom_count+=1;
        var mushroom = new Mushroom(i,o,mushroom_count);
        this.mushrooms.push(mushroom);
        blocks.push(mushroom);
      }
      if(rows[i][o] == 'o'){
        coin_count+=1;
        var coin = new Coin(i,o,coin_count);
        this.coins.push(coin);
        blocks.push(coin);
      }
      if(rows[i][o] == 'c'){
        this.character = new Character(i,o);
        //blocks.push(char);
      }
      /* ENEMIES */
      if(rows[i][o] == 'g'){
        goomba_count+=1;
        var goomba = new Goomba(i,o,goomba_count);
        this.goombas.push(goomba);
        blocks.push(goomba);
      }
    }
  }
  // return the layout
  return blocks;
}

Object.defineProperties(Level.prototype, {
  name: {
    set: function(val){
      this._name = val;
    },
    get: function(){
      return this._name;
    }
  },
  goombas: {
    get: function(){
      if(!this._goombas){
        this._goombas = [];
      }
      return this._goombas;
    }
  },
  boxes: {
    get: function(){
      if(!this._boxes){
        this._boxes = [];
      }
      return this._boxes;
    }
  },
  coins: {
    get: function(){
      if(!this._coins){
        this._coins = [];
      }
      return this._coins;
    }
  },
  flowers: {
    get: function(){
      if(!this._flowers){
        this._flowers = [];
      }
      return this._flowers;
    }
  },
  shrooms: {
    get: function(){
      if(!this._shrooms){
        this._shrooms = [];
      }
      return this._shrooms;
    }
  },
  mushrooms: {
    get: function(){
      if(!this._mushrooms){
        this._mushrooms = [];
      }
      return this._mushrooms;
    }
  },
  qblocks: {
    get: function(){
      if(!this._qblocks){
        this._qblocks = [];
      }
      return this._qblocks;
    }
  },
  pblocks: {
    get: function(){
      if(!this._pblocks){
        this._pblocks = [];
      }
      return this._pblocks;
    }
  },
  fblocks: {
    get: function(){
      if(!this._fblocks){
        this._fblocks = [];
      }
      return this._fblocks;
    }
  },
  fricks: {
    get: function(){
      if(!this._fricks){
        this._fricks = [];
      }
      return this._fricks;
    }
  },
  bricks: {
    get: function(){
      if(!this._bricks){
        this._bricks = [];
      }
      return this._bricks;
    }
  },
  character: {
    set: function(val){
      this._character = val;
    },
    get: function(){
      if(!this._character){
        //c.comment('No character has been set.');
      }
      return this._character;
    }
  },
  rows: {
    set: function(val){
      this._rows = val;
    },
    get: function(){
      return this._rows;
    }
  }
});


