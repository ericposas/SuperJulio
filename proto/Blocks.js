/************
 BLOCK TYPES
*************/


// BRICK //
function Brick(i, o, brick_count){
  var brick = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
    id: 'brick-'+brick_count,
    isStatic: true,
    friction: 0,
    render: {
      sprite: {
        xScale:0.2,
        yScale:0.2,
        texture: 'img/brick_200x200.png'
      }
    }
  });
  return brick;
}

// BOX //
function Box(i, o, box_count){
  var box = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
    id: 'box-'+box_count,
    render: {
      sprite: {
        xScale:0.2,
        yScale:0.2,
        texture: 'img/box_200x200.jpg'
      }
    }
  });
  return box;
}

