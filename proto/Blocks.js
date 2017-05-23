/*************
 BLOCK TYPES
*************/

// BRICK // 1
function Brick(i, o, brick_count){
  var brick = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
    id: 'brick-'+brick_count,
    isStatic: true,
    friction: 0,
    render: {
      sprite: {
        xScale:0.2,
        yScale:0.2,
        texture: Images.brick
      }
    }
  });
  return brick;
}



// FAUX BRICK // 2
function FauxBrick(i, o, _count){
  var frick = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
    id: 'frick-'+_count,
    isStatic: true,
    friction: 0,
    render: {
      sprite: {
        xScale:0.2,
        yScale:0.2,
        texture: Images.brick
      }
    }
  });
  return frick;
}
Object.defineProperties(FauxBrick.prototype, {
  state: {
    set: function(val){
      this._state = val;
    },
    get: function(){
      return this._state;
    }
  }
});



// QUESTION BLOCK // '?'
function Qblock(i, o, _count, option){
  var x = (o*40)+20;
      y = (i*40)+20;
  var qblock = Matter.Bodies.rectangle(x, y, 40, 40, {
    //id: (option == 'p' ? 'pblock-' : 'qblock-') + _count,
    id: this.getID(option) + _count,
    isStatic: true,
    friction: 0,
    render: {
      sprite: {
        xScale:0.4,
        yScale:0.4,
        texture: Images.qblock
      }
    }
  });
  this.position = {x:x, y:y};
  return qblock;
}
Qblock.prototype.getID = function(id){
  switch(id){
    case 'p':
      return 'pblock-';
      break;
    case 'f':
      return 'fblock-';
      break;
    default:
      return 'qblock-';
  }
}
Object.defineProperties(Qblock.prototype, {
  state: {
    set: function(val){
      this._state = val;
    },
    get: function(){
      return this._state;
    }
  }
});



// MINI BRICK //
function MiniBrick(pos){
  var mini_brick = Matter.Bodies.rectangle(pos.x, pos.y-10, 10, 10, {
      collisionFilter: {
        mask: CollisionCategories.masked 
      },
      restitution: 0.5,
      friction: 0,
        render: {
          sprite: {
            xScale:0.1,
            yScale:0.1,
            texture: Images.brick
          }
        }
    });
  return mini_brick;
}

// BOX //
function Box(i, o, box_count){
  var box = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
    id: 'box-'+box_count,
    collisionFilter: {},
    render: {
      sprite: {
        xScale:0.2,
        yScale:0.2,
        texture: 'img/items/box_200x200.jpg'
      }
    }
  });
  return box;
}

