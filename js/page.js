/*************
  PAGE PROPS
*************/

var page = {
  properties : {},
  setup_gamepage : function(){
    var title = document.getElementById('title');
    title.id = 'title';
    title.innerHTML = page.properties.title;
    document.getElementsByTagName('title')[0].innerHTML = page.properties.title;
  },
  append_brick_break_counter: function(){
    var bcount = document.createElement('div');
    bcount.id = 'brick-break-counter';
    document.getElementById('game-container').appendChild(bcount);
  }
}
