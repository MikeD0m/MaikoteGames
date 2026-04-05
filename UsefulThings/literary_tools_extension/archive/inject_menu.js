if (!document.getElementById("literary_tool_container")) {
  const container = document.createElement("div");
  container.id = "literary_tool_container";

  container.innerHTML = `
    <h2>Literary Tools</h2>
    <button id="note_btn">Note Taker</button>

    <div id="note_menu" hidden>
      <div id="save_load_options">
        <button id="new_note_btn">New</button>
        <button id="load_note_btn">Load</button>
      </div>

      <div id="new_note" hidden>
        <textarea id="noteInput" placeholder="Write your thoughts..."></textarea>
        <button id="save_note">Save</button>
        <button id="cancel_note">Cancel</button>
      </div>

      <div id="load_menu" hidden>
        <p>Saved Notes:</p>
        <div id="notes_list"></div>
        <button id="return_btn">Return</button>
      </div>
    </div>

    <button id="exit_btn">Exit</button>
  `;

  document.body.appendChild(container);

  // State
  let noteMenu = false;
  let newNoteMenu = false;
  let loadMenu = false;
  let editingIndex = null;

  // DOM Elements
  const noteMenuDiv = document.getElementById("note_menu");
  const newNoteDiv = document.getElementById("new_note");
  const loadMenuDiv = document.getElementById("load_menu");
  const saveLoadOptions = document.getElementById("save_load_options");
  const notesListDiv = document.getElementById("notes_list");
  const noteInput = document.getElementById("noteInput");

  // Functions
  function toggleNoteMenu() {
    noteMenu = !noteMenu;
    noteMenuDiv.hidden = !noteMenu;
    if (!noteMenu) hideAllSubmenus();
  }

  function hideAllSubmenus() {
    newNoteMenu = false;
    loadMenu = false;
    newNoteDiv.hidden = true;
    loadMenuDiv.hidden = true;
    saveLoadOptions.hidden = false;
    editingIndex = null;
    noteInput.value = "";
  }

  function showNewNote() {
    newNoteMenu = true;
    newNoteDiv.hidden = false;
    saveLoadOptions.hidden = true;
  }

  function showLoadMenu() {
    loadMenu = true;
    loadMenuDiv.hidden = false;
    saveLoadOptions.hidden = true;
    renderSavedNotes();
  }

  function saveNote() {
    const text = noteInput.value.trim();
    if (!text) return alert("Note cannot be empty");

    let notes = JSON.parse(localStorage.getItem("literaryNotes") || "[]");

    if (editingIndex !== null) {
      // Edit existing note
      notes[editingIndex].content = text;
      notes[editingIndex].timestamp = new Date().toISOString();
      editingIndex = null;
    } else {
      notes.push({ content: text, timestamp: new Date().toISOString() });
    }

    localStorage.setItem("literaryNotes", JSON.stringify(notes));
    alert("Note saved!");
    hideAllSubmenus();
  }

  function renderSavedNotes() {
    notesListDiv.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem("literaryNotes") || "[]");
    if (notes.length === 0) {
      notesListDiv.innerHTML = "<p>No saved notes.</p>";
      return;
    }

    notes.forEach((note, idx) => {
      const noteDiv = document.createElement("div");
      noteDiv.style.display = "flex";
      noteDiv.style.justifyContent = "space-between";
      noteDiv.style.alignItems = "center";
      noteDiv.style.marginBottom = "5px";

      const noteBtn = document.createElement("button");
      noteBtn.textContent = note.content.slice(0, 30) + (note.content.length > 30 ? "..." : "");
      noteBtn.style.flexGrow = "1";
      noteBtn.addEventListener("click", () => {
        noteInput.value = note.content;
        editingIndex = idx;
        showNewNote();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.style.marginLeft = "5px";
      deleteBtn.addEventListener("click", () => {
        if (confirm("Delete this note?")) {
          notes.splice(idx, 1);
          localStorage.setItem("literaryNotes", JSON.stringify(notes));
          renderSavedNotes();
        }
      });

      noteDiv.appendChild(noteBtn);
      noteDiv.appendChild(deleteBtn);
      notesListDiv.appendChild(noteDiv);
    });
  }

  function Return() {
    hideAllSubmenus();
  }

  // Event Listeners
  document.getElementById("note_btn").addEventListener("click", toggleNoteMenu);
  document.getElementById("new_note_btn").addEventListener("click", showNewNote);
  document.getElementById("load_note_btn").addEventListener("click", showLoadMenu);
  document.getElementById("save_note").addEventListener("click", saveNote);
  document.getElementById("cancel_note").addEventListener("click", hideAllSubmenus);
  document.getElementById("return_btn").addEventListener("click", Return);
  document.getElementById("exit_btn").addEventListener("click", () => container.remove());
}