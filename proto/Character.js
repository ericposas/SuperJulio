/*************
  CHARACTER
*************/

const CHAR_SMALL = "small",
      CHAR_BIG = "big";

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
      fillStyle: '#FF0000',
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
  }
});


/*function Character(i, o){
  var char = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 28, 38, {
    id: 'character',
    inertia: Infinity,
    friction: 0,
    render: {
      fillStyle: '#FF0000',
      sprite: {
        xScale:0.9,
        yScale:0.9 //,
        //texture: 'img/mario01.png'
      }
    }
  });
  return char;
}*/