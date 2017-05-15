/*************
 BLOCK TYPES
*************/

// BRICK // #1
function Brick(i, o, brick_count){
  var brick = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
    id: 'brick-'+brick_count,
    collisionFilter: {
      category: CollisionCategories.brick_default
    },
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




// MINI BRICK //
function MiniBrick(pos){
  var mini_brick = Matter.Bodies.rectangle(pos.x, pos.y-10, 10, 10, {
      //id: 'mini',
      collisionFilter: {
        category: CollisionCategories.mini_brick,
        mask: CollisionCategories.mini_brick
      },
      restitution: 0.5,
      friction: 0,
        render: {
          sprite: {
            xScale:0.1,
            yScale:0.1,
            texture: 'img/brick_200x200.png'
          }
        }
    });
  return mini_brick;
}

// BOX //
function Box(i, o, box_count){
  var box = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
    id: 'box-'+box_count,
    collisionFilter: {
      category: CollisionCategories.brick_default
    },
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

