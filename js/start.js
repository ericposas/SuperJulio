/*************
  GAME PAGE
*************/

window.onload = function(){
  
  // WEB PAGE SET UP
  page.properties.title = 'Super Julio';
  page.setup_gamepage();
  
  // DEBUGGING CONSOLE 
  window.c = new Console({w:480,h:800});
  
  // GAME SET UP
  var lvl1 = new Level(Levels.level1);
  var game = new Game();
  var keys = new Keys(game);
  game.addLevel(lvl1);
  game.start();
  game.w = 480;
  game.h = 800;
  game.name = "Super Julio";
  
}

