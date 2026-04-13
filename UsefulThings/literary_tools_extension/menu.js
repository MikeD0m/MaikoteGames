// ── DOM ────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => { hideAllSubmenus(); });

// Notes
const noteBtn        = document.getElementById("note_btn");
const noteMenuDiv    = document.getElementById("note_menu");
const newNoteBtn     = document.getElementById("new_note_btn");
const loadNoteBtn    = document.getElementById("load_note_btn");
const exitBtn        = document.getElementById("exit_btn");
const newNoteDiv     = document.getElementById("new_note");
const noteNameInput  = document.getElementById("note_name");
const noteInput      = document.getElementById("noteInput");
const saveNoteBtn    = document.getElementById("save_note");
const cancelNoteBtn  = document.getElementById("cancel_note");
const loadMenuDiv    = document.getElementById("load_menu");
const notesListDiv   = document.getElementById("notes_list");
const returnBtn      = document.getElementById("return_btn");
const savedNotesLabel= document.getElementById("saved_notes_label");

// Calendar
const calendarBtn    = document.getElementById("calendar_btn");
const calendarView   = document.getElementById("calendar_view");
const calPrev        = document.getElementById("cal_prev");
const calNext        = document.getElementById("cal_next");
const calTitle       = document.getElementById("cal_title");
const calDays        = document.getElementById("cal_days");
const calDayLabel    = document.getElementById("cal_day_label");
const calEventsList  = document.getElementById("cal_events_list");
const addEventBtn    = document.getElementById("add_event_btn");
const gcalSyncBtn    = document.getElementById("gcal_sync_btn");
const calBackBtn     = document.getElementById("cal_back_btn");

// Event form
const eventForm      = document.getElementById("event_form");
const eventTitle     = document.getElementById("event_title");
const eventDate      = document.getElementById("event_date");
const eventTime      = document.getElementById("event_time");
const eventNotes     = document.getElementById("event_notes");
const saveEventBtn   = document.getElementById("save_event_btn");
const cancelEventBtn = document.getElementById("cancel_event_btn");

// ── State ──────────────────────────────────────────────────────────────────
let newNoteMenu   = false;
let loadMenu      = false;
let editingNoteIndex  = null;
let editingEventIndex = null;

const today = new Date();
let viewYear  = today.getFullYear();
let viewMonth = today.getMonth();           // 0-based
let selectedDate = toDateStr(today);        // "YYYY-MM-DD"

// ── Helpers ────────────────────────────────────────────────────────────────
function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function loadEvents() {
  return JSON.parse(localStorage.getItem("literaryEvents") || "[]");
}

function saveEvents(events) {
  localStorage.setItem("literaryEvents", JSON.stringify(events));
}

// ── Hide everything ────────────────────────────────────────────────────────
function hideAllSubmenus() {
  noteMenuDiv.hidden   = true;
  newNoteDiv.hidden    = true;
  loadMenuDiv.hidden   = true;
  calendarView.hidden  = true;
  eventForm.hidden     = true;
  newNoteMenu = false;
  loadMenu    = false;
  editingNoteIndex  = null;
  editingEventIndex = null;
  noteInput.value      = "";
  noteNameInput.value  = "";
  savedNotesLabel.hidden = true;
}

// ── Note Taker ─────────────────────────────────────────────────────────────
noteBtn.addEventListener("click", () => {
  const isHidden = noteMenuDiv.hidden;
  hideAllSubmenus();
  noteMenuDiv.hidden = !isHidden;
});

exitBtn.addEventListener("click", () => window.close());

newNoteBtn.addEventListener("click", () => {
  newNoteDiv.hidden   = false;
  noteMenuDiv.hidden  = true;
  noteInput.value     = "";
  noteNameInput.value = "";
  newNoteMenu = true;
});

loadNoteBtn.addEventListener("click", () => {
  loadMenuDiv.hidden       = false;
  noteMenuDiv.hidden       = true;
  loadMenu                 = true;
  savedNotesLabel.hidden   = false;
  renderSavedNotes();
});

saveNoteBtn.addEventListener("click", () => {
  const name    = noteNameInput.value.trim() || "Untitled";
  const content = noteInput.value.trim();
  if (!content) return alert("Note cannot be empty");
  let notes = JSON.parse(localStorage.getItem("literaryNotes") || "[]");
  if (editingNoteIndex !== null) {
    notes[editingNoteIndex] = { name, content, timestamp: new Date().toISOString() };
    editingNoteIndex = null;
  } else {
    notes.push({ name, content, timestamp: new Date().toISOString() });
  }
  localStorage.setItem("literaryNotes", JSON.stringify(notes));
  alert("Note saved!");
  hideAllSubmenus();
});

cancelNoteBtn.addEventListener("click", hideAllSubmenus);
returnBtn.addEventListener("click", hideAllSubmenus);

function renderSavedNotes() {
  notesListDiv.innerHTML = "";
  let notes = JSON.parse(localStorage.getItem("literaryNotes") || "[]");
  if (notes.length === 0) { notesListDiv.innerHTML = "<p>No saved notes.</p>"; return; }
  notes.forEach((note, idx) => {
    const noteDiv    = document.createElement("div");
    noteDiv.className = "note_card";
    const infoDiv    = document.createElement("div");
    infoDiv.style.flexGrow = "1";
    const nameElem   = document.createElement("div");
    nameElem.textContent  = note.name;
    nameElem.style.fontWeight = "bold";
    const snippetElem = document.createElement("div");
    snippetElem.textContent = note.content.slice(0, 30) + (note.content.length > 30 ? "..." : "");
    snippetElem.style.fontSize = "12px";
    snippetElem.style.color    = "#555";
    const timeElem   = document.createElement("div");
    timeElem.textContent = new Date(note.timestamp).toLocaleString();
    timeElem.style.fontSize = "10px";
    timeElem.style.color    = "#888";
    infoDiv.append(nameElem, snippetElem, timeElem);
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => {
      noteNameInput.value = note.name;
      noteInput.value     = note.content;
      editingNoteIndex    = idx;
      newNoteDiv.hidden   = false;
      loadMenuDiv.hidden  = true;
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
    noteDiv.append(infoDiv, editBtn, deleteBtn);
    notesListDiv.appendChild(noteDiv);
  });
}

// ── Calendar ───────────────────────────────────────────────────────────────
calendarBtn.addEventListener("click", () => {
  hideAllSubmenus();
  calendarView.hidden = false;
  renderCalendar();
  renderDayEvents(selectedDate);
});

calPrev.addEventListener("click", () => {
  viewMonth--;
  if (viewMonth < 0) { viewMonth = 11; viewYear--; }
  renderCalendar();
});

calNext.addEventListener("click", () => {
  viewMonth++;
  if (viewMonth > 11) { viewMonth = 0; viewYear++; }
  renderCalendar();
});

calBackBtn.addEventListener("click", hideAllSubmenus);

function renderCalendar() {
  const MONTHS = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
  calTitle.textContent = `${MONTHS[viewMonth]} ${viewYear}`;

  calDays.innerHTML = "";
  const events   = loadEvents();
  const eventDates = new Set(events.map(e => e.date));

  const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const todayStr = toDateStr(today);

  // Leading empty cells
  for (let i = 0; i < firstDay; i++) {
    const el = document.createElement("div");
    el.className = "cal-day empty";
    calDays.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const el = document.createElement("div");
    el.className = "cal-day";
    if (dateStr === todayStr)     el.classList.add("today");
    if (dateStr === selectedDate) el.classList.add("selected");
    if (eventDates.has(dateStr))  el.classList.add("has-event");

    const num = document.createElement("span");
    num.textContent = d;
    el.appendChild(num);

    if (eventDates.has(dateStr)) {
      const dot = document.createElement("div");
      dot.className = "dot";
      el.appendChild(dot);
    }

    el.addEventListener("click", () => {
      selectedDate = dateStr;
      renderCalendar();
      renderDayEvents(dateStr);
    });

    calDays.appendChild(el);
  }
}

function renderDayEvents(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const label = new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  calDayLabel.textContent = label;

  const events = loadEvents().filter(e => e.date === dateStr);
  calEventsList.innerHTML = "";

  if (events.length === 0) {
    calEventsList.innerHTML = `<p style="font-size:12px;color:var(--text-faint);padding:2px 0">No events</p>`;
    return;
  }

  events.sort((a, b) => (a.time || "").localeCompare(b.time || ""));

  events.forEach((ev, listIdx) => {
    // Find the true index in the full array for editing/deleting
    const allEvents = loadEvents();
    const trueIdx   = allEvents.findIndex(e => e.id === ev.id);

    const card = document.createElement("div");
    card.className = "event_card";

    const info = document.createElement("div");
    info.style.flexGrow = "1";

    const titleEl = document.createElement("div");
    titleEl.textContent = ev.title;
    titleEl.style.fontWeight = "bold";
    titleEl.style.fontSize   = "13px";

    const timeEl = document.createElement("div");
    timeEl.textContent = ev.time
      ? new Date(`1970-01-01T${ev.time}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      : "All day";
    timeEl.style.fontSize = "11px";
    timeEl.style.color    = "var(--text-faint)";

    info.append(titleEl, timeEl);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => openEventForm(dateStr, trueIdx));

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.addEventListener("click", () => {
      if (confirm("Delete this event?")) {
        const evs = loadEvents();
        evs.splice(trueIdx, 1);
        saveEvents(evs);
        renderCalendar();
        renderDayEvents(dateStr);
      }
    });

    card.append(info, editBtn, delBtn);
    calEventsList.appendChild(card);
  });
}

// ── Event Form ─────────────────────────────────────────────────────────────
addEventBtn.addEventListener("click", () => openEventForm(selectedDate, null));

function openEventForm(dateStr, editIdx) {
  editingEventIndex = editIdx;
  calendarView.hidden = true;
  eventForm.hidden    = false;

  if (editIdx !== null) {
    const ev = loadEvents()[editIdx];
    eventTitle.value = ev.title;
    eventDate.value  = ev.date;
    eventTime.value  = ev.time || "";
    eventNotes.value = ev.notes || "";
  } else {
    eventTitle.value = "";
    eventDate.value  = dateStr;
    eventTime.value  = "";
    eventNotes.value = "";
  }
}

saveEventBtn.addEventListener("click", () => {
  const title = eventTitle.value.trim();
  const date  = eventDate.value;
  if (!title) return alert("Event title cannot be empty");
  if (!date)  return alert("Please select a date");

  const evs = loadEvents();
  const entry = {
    id:    editingEventIndex !== null ? evs[editingEventIndex].id : Date.now().toString(),
    title,
    date,
    time:  eventTime.value  || "",
    notes: eventNotes.value.trim(),
  };

  if (editingEventIndex !== null) {
    evs[editingEventIndex] = entry;
  } else {
    evs.push(entry);
  }
  saveEvents(evs);

  selectedDate = date;
  viewYear  = parseInt(date.split("-")[0]);
  viewMonth = parseInt(date.split("-")[1]) - 1;

  eventForm.hidden    = false;
  calendarView.hidden = true;
  eventForm.hidden    = true;
  calendarView.hidden = false;
  renderCalendar();
  renderDayEvents(date);
  editingEventIndex = null;
});

cancelEventBtn.addEventListener("click", () => {
  eventForm.hidden    = true;
  calendarView.hidden = false;
  editingEventIndex   = null;
});

// ── Google Calendar Sync ───────────────────────────────────────────────────
gcalSyncBtn.addEventListener("click", syncWithGoogleCalendar);

async function syncWithGoogleCalendar() {
  gcalSyncBtn.textContent = "Syncing…";
  gcalSyncBtn.disabled    = true;

  try {
    // Step 1: get OAuth token via Chrome Identity API
    const token = await new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError || !token) {
          reject(chrome.runtime.lastError?.message || "Auth failed");
        } else {
          resolve(token);
        }
      });
    });

    // Step 2: fetch the next 30 days of events from primary calendar
    const now     = new Date();
    const later   = new Date(now);
    later.setDate(later.getDate() + 30);

    const url = new URL("https://www.googleapis.com/calendar/v3/calendars/primary/events");
    url.searchParams.set("timeMin", now.toISOString());
    url.searchParams.set("timeMax", later.toISOString());
    url.searchParams.set("singleEvents", "true");
    url.searchParams.set("orderBy", "startTime");
    url.searchParams.set("maxResults", "100");

    const res  = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    if (!data.items) throw new Error("Unexpected response from Google Calendar");

    // Step 3: merge into local storage (add if not already present by gcalId)
    const localEvents = loadEvents();
    let added = 0;

    data.items.forEach(item => {
      const startRaw = item.start?.date || item.start?.dateTime;
      if (!startRaw) return;
      const date = startRaw.slice(0, 10);
      const time = item.start?.dateTime ? startRaw.slice(11, 16) : "";
      const gcalId = item.id;

      const exists = localEvents.some(e => e.gcalId === gcalId);
      if (!exists) {
        localEvents.push({
          id:     `gcal_${gcalId}`,
          gcalId: gcalId,
          title:  item.summary || "(No title)",
          date,
          time,
          notes:  item.description || "",
        });
        added++;
      }
    });

    saveEvents(localEvents);
    renderCalendar();
    renderDayEvents(selectedDate);
    alert(`Synced! ${added} new event${added !== 1 ? "s" : ""} imported.`);

  } catch (err) {
    alert("Google Calendar sync failed: " + err);
  } finally {
    gcalSyncBtn.innerHTML = '<span class="icon">◈</span> Sync Google Calendar';
    gcalSyncBtn.disabled  = false;
  }
}