/**********
   ITEMS
**********/

// SHROOM POWER-UP (FROM BLOCK) //
function Shroom(pos, _count){
  var shroom = Matter.Bodies.rectangle(pos.x, pos.y, 40, 40, {
      id: 'shroom-'+_count,
      restitution: 0.5,
      friction: 0,
        render: {
          sprite: {
            xScale:0.2,
            yScale:0.2,
            texture: Images.mushroom
          }
        }
    });
  //this.position = { x:pos.x, y:pos.y };
  return shroom;
}

// FIRE FLOWER //
function FireFlower(pos, _count){
  var flower = Matter.Bodies.rectangle(pos.x, pos.y, 40, 40, {
      id: 'flower-'+_count,
      restitution: 0.5,
      friction: 0,
        render: {
          sprite: {
            xScale:0.2,
            yScale:0.2,
            texture: Images.fireflower
          }
        }
    });
  return flower;
}

// MUSHROOM //
function Mushroom(i, o, _count){
  var mushroom = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
    id: 'mushroom-'+_count,
    friction: 0,
    render: {
      sprite: {
        xScale:0.2,
        yScale:0.2,
        texture: Images.mushroom
      }
    }
  });
  return mushroom;
}

// STANDALONE COIN //
function Coin(i, o, coin_count){
  var coin = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 30, 30, {
    id: 'coin-'+coin_count,
    friction: 0,
    render: {
      sprite: {
        xScale:0.15,
        yScale:0.15,
        texture: Images.coin //game.images.coin
      }
    }
  });
  return coin;
}

// BLOCK COIN //
function BlockCoin(pos){
  var coin = Matter.Bodies.rectangle(pos.x, pos.y-10, 30, 30, {
      //id: 'mini',
      collisionFilter: {
        mask: CollisionCategories.masked 
      },
      restitution: 0.5,
      friction: 0,
        render: {
          sprite: {
            xScale:0.15,
            yScale:0.15,
            texture: Images.coin
          }
        }
    });
  return coin;
}