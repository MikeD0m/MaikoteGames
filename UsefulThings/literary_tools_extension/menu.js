// DOM elements
const noteBtn = document.getElementById("note_btn");
const noteMenuDiv = document.getElementById("note_menu");
const newNoteBtn = document.getElementById("new_note_btn");
const loadNoteBtn = document.getElementById("load_note_btn");
const exitBtn = document.getElementById("exit_btn");
const newNoteDiv = document.getElementById("new_note");
const noteNameInput = document.getElementById("note_name");
const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("save_note");
const cancelNoteBtn = document.getElementById("cancel_note");
const loadMenuDiv = document.getElementById("load_menu");
const notesListDiv = document.getElementById("notes_list");
const returnBtn = document.getElementById("return_btn");
const savedNotesLabel = document.getElementById("saved_notes_label");

// State
let newNoteMenu = false;
let loadMenu = false;
let editingIndex = null;

// Functions
function hideAllSubmenus() {
  noteMenuDiv.hidden = true;
  newNoteDiv.hidden = true;
  loadMenuDiv.hidden = true;
  newNoteMenu = false;
  loadMenu = false;
  editingIndex = null;
  noteInput.value = "";
  noteNameInput.value = "";
  savedNotesLabel.hidden = true;
}

// Show Note Menu
noteBtn.addEventListener("click", () => {
  noteMenuDiv.hidden = !noteMenuDiv.hidden;
});

// Exit button
exitBtn.addEventListener("click", () => {
  window.close();
});

// New Note
newNoteBtn.addEventListener("click", () => {
  newNoteDiv.hidden = false;
  noteMenuDiv.hidden = true;
  noteInput.value = "";
  noteNameInput.value = "";
  newNoteMenu = true;
});

// Load Notes
loadNoteBtn.addEventListener("click", () => {
  loadMenuDiv.hidden = false;
  noteMenuDiv.hidden = true;
  loadMenu = true;
  savedNotesLabel.hidden = false;
  renderSavedNotes();
});

// Save Note
saveNoteBtn.addEventListener("click", () => {
  const name = noteNameInput.value.trim() || "Untitled";
  const content = noteInput.value.trim();
  if (!content) return alert("Note cannot be empty");

  let notes = JSON.parse(localStorage.getItem("literaryNotes") || "[]");

  if (editingIndex !== null) {
    notes[editingIndex] = {
      name,
      content,
      timestamp: new Date().toISOString()
    };
    editingIndex = null;
  } else {
    notes.push({
      name,
      content,
      timestamp: new Date().toISOString()
    });
  }

  localStorage.setItem("literaryNotes", JSON.stringify(notes));
  alert("Note saved!");
  hideAllSubmenus();
});

// Cancel Note
cancelNoteBtn.addEventListener("click", hideAllSubmenus);

// Return from Load Menu
returnBtn.addEventListener("click", hideAllSubmenus);

// Render Saved Notes
function renderSavedNotes() {
  notesListDiv.innerHTML = "";
  let notes = JSON.parse(localStorage.getItem("literaryNotes") || "[]");
  if (notes.length === 0) {
    notesListDiv.innerHTML = "<p>No saved notes.</p>";
    return;
  }

  notes.forEach((note, idx) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note_card";

    const infoDiv = document.createElement("div");
    infoDiv.style.flexGrow = "1";

    const nameElem = document.createElement("div");
    nameElem.textContent = note.name;
    nameElem.style.fontWeight = "bold";

    const snippetElem = document.createElement("div");
    snippetElem.textContent = note.content.slice(0, 30) + (note.content.length > 30 ? "..." : "");
    snippetElem.style.fontSize = "12px";
    snippetElem.style.color = "#555";

    const timeElem = document.createElement("div");
    const date = new Date(note.timestamp);
    timeElem.textContent = date.toLocaleString();
    timeElem.style.fontSize = "10px";
    timeElem.style.color = "#888";

    infoDiv.appendChild(nameElem);
    infoDiv.appendChild(snippetElem);
    infoDiv.appendChild(timeElem);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => {
      noteNameInput.value = note.name;
      noteInput.value = note.content;
      editingIndex = idx;
      newNoteDiv.hidden = false;
      loadMenuDiv.hidden = true;
      savedNotesLabel.hidden = true;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", () => {
      if (confirm("Delete this note?")) {
        notes.splice(idx, 1);
        localStorage.setItem("literaryNotes", JSON.stringify(notes));
        renderSavedNotes();
      }
    });

    noteDiv.appendChild(infoDiv);
    noteDiv.appendChild(editBtn);
    noteDiv.appendChild(deleteBtn);
    notesListDiv.appendChild(noteDiv);
  });
}