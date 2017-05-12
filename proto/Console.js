/*************
   CONSOLE
*************/

function Console(props){
  this.createConsole(props);
}

Console.prototype.createConsole = function (props){
  var conwin = document.getElementById('console-window');
  var contit = document.createElement('div');
  contit.id = 'console-title';
  contit.innerHTML = "Console:";
  conwin.appendChild(contit);
  var win = document.createElement('div');
  conwin.appendChild(win);
  win.id = 'window';
  win.style.height = props.h/4 + 'px';
  var con = document.createElement('div');
  document.getElementById('window').appendChild(con);
  con.id = 'console';
  //create console 'clear output' button
  var btn = document.createElement('button');
  btn.id = 'console-clear-output-button';
  document.body.appendChild(btn);
  btn.innerHTML = 'clear output';
  btn.addEventListener('click', function(){
    for(var i = 0, arr = con.querySelectorAll('div'); i < arr.length; i++){
      if(arr[i]){
        con.removeChild(arr[i]);
      }
    }
  });
}

Console.prototype.comment = function (msg){
  this.comment_count++;
  var comment = document.createElement('div');
  document.getElementById('console').appendChild(comment);
  comment.innerHTML = msg;
  comment.classList.add('comment');
}

