/*************
  GAME PAGE
*************/

window.onload = function(){
  
  //initialize Adobe Animate background canvas 
  init();
  
  // WEB PAGE SET UP (sets elements of the webpage on top of canvas element) 
  page.properties.title = 'Super Julio';
  page.setup_gamepage();
  
  // GAME SET UP
  window.game = new Game();
  window.keys = new Keys();
  var lvl1 = new Level(Levels.level1);
  
  game.addLevel(lvl1);
  game.start();
  game.w = 480;
  game.h = 800;
  game.name = "Super Julio";
  
  
  
}

