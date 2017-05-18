/*************
  PAGE PROPS
*************/

var page = {
  properties : {
    title : "Super Julio v.1"
  },
  setup_gamepage : function(){
    var title = document.getElementById('title');
    title.id = 'title';
    title.innerHTML = page.properties.title;
    document.getElementsByTagName('title')[0].innerHTML = page.properties.title;
    
    //initialize Adobe Animate background canvas 
    init();
  }
}

