/*************
  GAME PAGE
*************/

window.onload = function(){
  
  page.setup_gamepage();
  
  // GAME SET UP
  window.game = new Game();
  window.keys = new Keys();
  var lvl1 = new Level(Levels.level1);
  var Hannah = new Level(Levels.level2);
  
  game.addLevel(Hannah);
  game.start();
  game.w = 480;
  game.h = 800;
  game.name = "Super Julio";
  
  // Testing level-swap... 
  //game.swapLevel(lvl2);
  
}

