const notesBtn = document.getElementById("notesBtn");
const notesSection = document.getElementById("notesSection");
const saveBtn = document.getElementById("saveNote");
const loadBtn = document.getElementById("loadNotes");
const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");

// Toggle notes section
notesBtn.addEventListener("click", () => {
  notesSection.classList.toggle("hidden");
});

// Save note
saveBtn.addEventListener("click", () => {
  const note = noteInput.value;

  chrome.storage.local.get(["notes"], (result) => {
    const notes = result.notes || [];
    notes.push(note);

    chrome.storage.local.set({ notes: notes }, () => {
      noteInput.value = "";
      alert("Note saved!");
    });
  });
});

// Load notes
loadBtn.addEventListener("click", () => {
  chrome.storage.local.get(["notes"], (result) => {
    notesList.innerHTML = "";

    (result.notes || []).forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note;
      notesList.appendChild(li);
    });
  });
});