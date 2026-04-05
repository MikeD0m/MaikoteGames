// Track menu states
let noteMenu = false;
let newNoteMenu = false;
let loadMenu = false;

// Functions
function ActivateNoteMenu() {
  const menu = document.getElementById("note_menu");
  if (!noteMenu) {
    noteMenu = true;
    menu.removeAttribute("hidden");
  } else {
    noteMenu = false;
    menu.setAttribute("hidden", "");
    CancelNewNoteEntry();
    Return();
  }
}

function ActivateNewNoteEntry() {
  if (!newNoteMenu) {
    newNoteMenu = true;
    document.getElementById("new_note").removeAttribute("hidden");
    document.getElementById("save_load_options").setAttribute("hidden", "");
  }
}

function CancelNewNoteEntry() {
  newNoteMenu = false;
  document.getElementById("new_note").setAttribute("hidden", "");
  document.getElementById("save_load_options").removeAttribute("hidden");
}

function ActivateLoadMenu() {
  if (!loadMenu) {
    loadMenu = true;
    document.getElementById("load_menu").removeAttribute("hidden");
    document.getElementById("save_load_options").setAttribute("hidden", "");
  }
}

function Return() {
  if (loadMenu) {
    loadMenu = false;
    document.getElementById("load_menu").setAttribute("hidden", "");
    document.getElementById("save_load_options").removeAttribute("hidden");
  }
}

function consoleMsg(msg) {
  console.log(msg);
}

// Attach event listeners after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("note_btn").addEventListener("click", ActivateNoteMenu);
  document.getElementById("new_note_btn").addEventListener("click", ActivateNewNoteEntry);
  document.getElementById("load_note_btn").addEventListener("click", ActivateLoadMenu);
  document.getElementById("save_note").addEventListener("click", CancelNewNoteEntry); // replace with actual save logic
  document.getElementById("cancel_note").addEventListener("click", CancelNewNoteEntry);
  document.getElementById("return_btn").addEventListener("click", Return);
  document.getElementById("exit_btn").addEventListener("click", () => consoleMsg("exit"));
});