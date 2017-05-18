/**********************************
 BG OBJECTS (Adobe Animate Canvas)
**********************************/

function bg_objects(){
  
  var bg = new lib.bg();
  exportRoot.addChild(bg);
  bg.y = -4;
  game.bg = bg;
  
  var brick_floor = new lib.brick_floor();
  exportRoot.addChild(brick_floor);
  
}
