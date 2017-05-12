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
    boxes:this.boxes,
    bricks:this.bricks,
    char:this.character,
    rows:this.rows
  };
}

Level.prototype.layout = function(rows){
  var blocks = [];
  var box_count = 0;
  var brick_count = 0;
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
        box_count+=1;
        var box = new Box(i,o,box_count);
        this.boxes.push(box);
        blocks.push(box);
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
        c.comment('No character has been set.');
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



