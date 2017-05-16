/*************
  GAME PAGE
*************/

window.onload = function(){
  
  // WEB PAGE SET UP (sets elements of the webpage on top of canvas element) 
  page.properties.title = 'Super Julio';
  page.setup_gamepage();
  //page.append_brick_break_counter();
  
  // DEBUGGING CONSOLE 
  window.c = new Console({w:480,h:800});
  
  // GAME SET UP
  var lvl1 = new Level(Levels.level1);
  var game = new Game();
  var keys = new Keys(game);
  game.addLevel(lvl1);
  //var collisions = new Collisions(game);
  game.start();
  game.w = 480;
  game.h = 800;
  game.name = "Super Julio";
  
  c.comment(lvl1.qblocks);
  
}

