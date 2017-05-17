/**********************************
 BG OBJECTS (Adobe Animate Canvas)
**********************************/

function bg_objects(){
  /*var cloud = new lib.cloud();
  exportRoot.addChild(cloud);
  cloud.x = 20;
  cloud.y = 50;
  cloud.scaleX = cloud.scaleY = 0.75;*/
  var bg = new lib.bg();
  exportRoot.addChild(bg);
  bg.y = -4;
  game.bg = bg;
  
}