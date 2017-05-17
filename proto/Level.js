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
    qblocks:this.qblocks,
    bricks:this.bricks,
    fricks:this.fricks,
    coins:this.coins,
    shrooms:this.shrooms,
    char:this.character,
    rows:this.rows
  };
}

Level.prototype.layout = function(rows){
  var blocks = [];
  var brick_count = 0;
  var qblock_count = 0;
  var frick_count = 0;
  var coin_count = 0;
  var shroom_count = 0;
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
      if(rows[i][o] == 'o'){
        coin_count+=1;
        var coin = new Coin(i,o,coin_count);
        this.coins.push(coin);
        blocks.push(coin);
      }
      if(rows[i][o] == 'm'){
        shroom_count+=1;
        var shroom = new Mushroom(i,o,shroom_count);
        this.shrooms.push(shroom);
        blocks.push(shroom);
      }
      if(rows[i][o] == 'c'){
        this.character = new Character(i,o);
        //blocks.push(char);
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
  shrooms: {
    get: function(){
      if(!this._shrooms){
        this._shrooms = [];
      }
      return this._shrooms;
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



