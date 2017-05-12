/*************
  CHARACTER
*************/

function Character(i, o){
  var char = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
    //id: 'character',
    inertia: Infinity,
    friction: 0,
    render: {
      fillStyle: '#FF0000',
      sprite: {
        xScale:0.8,
        yScale:0.8,
        texture: 'img/mario01.png'
      }
    }
  });
  return char;
}

