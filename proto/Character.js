/*************
  CHARACTER
*************/

function Character(i, o){
  var char = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 38, 38, {
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
}

