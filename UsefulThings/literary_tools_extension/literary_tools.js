// literary_tools.js

function consoleMsg(msg){
  console.log(msg);
}

noteMenu = false;
function ActivateNoteMenu(){
  if(noteMenu === false){
    noteMenu = true;
    document.getElementById("note_menu").removeAttribute("hidden");
  }
  else{
    noteMenu = false;
    document.getElementById("note_menu").setAttribute("hidden", "");
    CancelNewNoteEntry();
    Return();
  }
}
newNoteMenu = false;
loadMenu = false;
function ActivateNewNoteEntry(){
  if(newNoteMenu === false){
    newNoteMenu = true;
    document.getElementById("new_note").removeAttribute("hidden");
    document.getElementById("save_load_options").setAttribute("hidden", "");
  }
}
function CancelNewNoteEntry(){
  newNoteMenu = false;
  document.getElementById("new_note").setAttribute("hidden", "");
}
function ActivateLoadMenu(){
  if(loadMenu === false){
    loadMenu = true;
    document.getElementById("load_menu").removeAttribute("hidden");
  }
}
function Return(){
  if(loadMenu === true){
    loadMenu = false;
    document.getElementById("load_menu").setAttribute("hidden", "");

  }
}