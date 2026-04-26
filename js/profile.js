// ── LOAD PROFILE ON START ──
function loadProfile() {
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  if (profile.name) document.getElementById("display-name").textContent = profile.name;
  if (profile.age)  document.getElementById("display-age").textContent  = profile.age + " ans";
  if (profile.date) document.getElementById("display-date").textContent = formatDate(profile.date);

  if (profile.avatar) {
    const img = document.getElementById("avatar-img");
    img.src = profile.avatar;
    img.style.display = "block";
    document.getElementById("avatar-placeholder").style.display = "none";
  }
}

// ── EDIT FIELD ──
function editField(field) {
  const input   = document.getElementById("input-" + field);
  const display = document.getElementById("display-" + field);

  const isHidden = input.classList.contains("hidden");

  if (isHidden) {
    // Open input, pre-fill with current value
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
    if (profile[field]) input.value = profile[field];
    input.classList.remove("hidden");
    input.focus();
  } else {
    // Close without saving
    input.classList.add("hidden");
  }
}

// ── SAVE PROFILE ──
function saveProfile() {
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  const nameInput = document.getElementById("input-name");
  const ageInput  = document.getElementById("input-age");
  const dateInput = document.getElementById("input-date");

  if (!nameInput.classList.contains("hidden") && nameInput.value.trim()) {
    profile.name = nameInput.value.trim();
    document.getElementById("display-name").textContent = profile.name;
    nameInput.classList.add("hidden");
  }

  if (!ageInput.classList.contains("hidden") && ageInput.value) {
    profile.age = ageInput.value;
    document.getElementById("display-age").textContent = profile.age + " ans";
    ageInput.classList.add("hidden");
  }

  if (!dateInput.classList.contains("hidden") && dateInput.value) {
    profile.date = dateInput.value;
    document.getElementById("display-date").textContent = formatDate(dateInput.value);
    dateInput.classList.add("hidden");
  }

  localStorage.setItem("profile", JSON.stringify(profile));

  // Show success message
  const msg = document.getElementById("success-msg");
  msg.style.display = "block";
  setTimeout(() => msg.style.display = "none", 3000);
}

// ── AVATAR UPLOAD ──
document.getElementById("avatar-upload").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.getElementById("avatar-img");
    img.src = e.target.result;
    img.style.display = "block";
    document.getElementById("avatar-placeholder").style.display = "none";

    // Save avatar to localStorage
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
    profile.avatar = e.target.result;
    localStorage.setItem("profile", JSON.stringify(profile));
  };
  reader.readAsDataURL(file);
});

// ── FORMAT DATE ──
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

// ── HIGHLIGHT ACTIVE NAV LINK ──
document.querySelectorAll(".bottom-nav a").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

loadProfile();