let currentType = "lift";

// ── OPEN MODAL ──
function openModal(type) {
  currentType = type;
  document.getElementById("modal-title").textContent =
    type === "lift" ? "🏋️ Add Lift Record" : "🏃 Add Run Record";

  // Show/hide relevant fields
  document.getElementById("weight-group").style.display   = type === "lift" ? "flex" : "none";
  document.getElementById("distance-group").style.display = type === "run"  ? "flex" : "none";
  document.getElementById("time-group").style.display     = type === "run"  ? "flex" : "none";

  // Clear fields
  ["rec-name", "rec-weight", "rec-distance", "rec-time", "rec-notes"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("rec-date").value = new Date().toISOString().split("T")[0];

  document.getElementById("modal-overlay").classList.add("active");
  document.getElementById("modal").classList.add("active");
}

// ── CLOSE MODAL ──
function closeModal() {
  document.getElementById("modal-overlay").classList.remove("active");
  document.getElementById("modal").classList.remove("active");
}

// ── SAVE RECORD ──
function saveRecord() {
  const name = document.getElementById("rec-name").value.trim();
  const date = document.getElementById("rec-date").value;

  if (!name || !date) {
    alert("Please fill in at least the name and date.");
    return;
  }

  const record = {
    id: Date.now(),
    type: currentType,
    name,
    date,
    notes: document.getElementById("rec-notes").value.trim(),
  };

  if (currentType === "lift") {
    const weight = document.getElementById("rec-weight").value;
    if (!weight) { alert("Please enter a weight."); return; }
    record.weight = parseFloat(weight);
  } else {
    const distance = document.getElementById("rec-distance").value;
    const time = document.getElementById("rec-time").value;
    if (!distance) { alert("Please enter a distance."); return; }
    record.distance = parseFloat(distance);
    record.time = time ? parseInt(time) : null;
  }

  const records = JSON.parse(localStorage.getItem("records") || "[]");
  records.push(record);
  localStorage.setItem("records", JSON.stringify(records));

  closeModal();
  renderRecords();
}

// ── DELETE RECORD ──
function deleteRecord(id) {
  if (confirm("Delete this record?")) {
    let records = JSON.parse(localStorage.getItem("records") || "[]");
    records = records.filter(r => r.id !== id);
    localStorage.setItem("records", JSON.stringify(records));
    renderRecords();
  }
}

// ── RENDER ──
function renderRecords() {
  const liftList = document.getElementById("lift-list");
  const runList  = document.getElementById("run-list");

  liftList.innerHTML = "";
  runList.innerHTML  = "";

  const records = JSON.parse(localStorage.getItem("records") || "[]");

  const lifts = records.filter(r => r.type === "lift");
  const runs  = records.filter(r => r.type === "run");

  if (lifts.length === 0) {
    liftList.innerHTML = '<div class="empty-msg">No lift records yet. Add your first!</div>';
  } else {
    lifts.sort((a, b) => new Date(b.date) - new Date(a.date));
    lifts.forEach(r => liftList.appendChild(createCard(r)));
  }

  if (runs.length === 0) {
    runList.innerHTML = '<div class="empty-msg">No run records yet. Add your first!</div>';
  } else {
    runs.sort((a, b) => new Date(b.date) - new Date(a.date));
    runs.forEach(r => runList.appendChild(createCard(r)));
  }
}

// ── CREATE CARD ──
function createCard(record) {
  const card = document.createElement("div");
  card.className = "record-card";

  const value = record.type === "lift"
    ? `<div class="rec-value">${record.weight}<span class="rec-unit"> kg</span></div>`
    : `<div class="rec-value">${record.distance}<span class="rec-unit"> km</span></div>
       ${record.time ? `<div class="rec-unit">${record.time} min</div>` : ""}`;

  card.innerHTML = `
    <button class="delete-rec-btn" onclick="deleteRecord(${record.id})">✕</button>
    <div class="rec-name">${record.name}</div>
    ${value}
    <div class="rec-date">${record.date}</div>
    ${record.notes ? `<div class="rec-notes">${record.notes}</div>` : ""}
  `;

  return card;
}

// ── INIT ──
renderRecords();