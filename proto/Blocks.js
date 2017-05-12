/*************
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

// MINI-BRICKS //
function MiniBricks(pos){
  var mini_bricks = [];
  for(var n = 0; n < 5; n+=1){
    var mini_brick = Matter.Bodies.rectangle(pos.x, pos.y, 10, 10, {
      //id: 'mini-brick',
      friction: 0,
        render: {
          sprite: {
            xScale:0.1,
            yScale:0.1,
            texture: 'img/brick_200x200.png'
          }
        }
    });
    mini_bricks.push(mini_brick);
  }
  return mini_bricks;
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

