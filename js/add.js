const s1 = document.getElementById("s1");
const s2 = document.getElementById("s2");

const hero      = document.getElementById("hero");
const title     = document.getElementById("hero-title");
const text      = document.getElementById("hero-text");
const btn       = document.getElementById("hero-btn");

const strengthForm = document.getElementById("strength-form");
const cardioForm   = document.getElementById("cardio-form");

// Set default hero background
hero.classList.add("strength");

// ── SLIDE SWITCHING ──
s1.addEventListener("change", () => {
  hero.classList.replace("cardio", "strength");
  title.textContent = "ADD STRENGTH";
  text.textContent  = "Log your strength workouts";
  btn.textContent   = "Add Strength";
  strengthForm.classList.add("active");
  cardioForm.classList.remove("active");
});

s2.addEventListener("change", () => {
  hero.classList.replace("strength", "cardio");
  title.textContent = "ADD CARDIO";
  text.textContent  = "Log your cardio workouts";
  btn.textContent   = "Add Cardio";
  cardioForm.classList.add("active");
  strengthForm.classList.remove("active");
});

// ── SMOOTH SCROLL TO FORM ──
function scrollToSection() {
  document.getElementById("form-section").scrollIntoView({ behavior: "smooth" });
}

// ── FORM SUBMIT HANDLERS ──
function showSuccess(form) {
  let msg = form.querySelector(".success-msg");
  if (!msg) {
    msg = document.createElement("p");
    msg.className = "success-msg";
    msg.textContent = "✅ Workout saved!";
    form.appendChild(msg);
  }
  msg.style.display = "block";
  setTimeout(() => (msg.style.display = "none"), 3000);
}

strengthForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    type:   "strength",
    workout: strengthForm.workout_type.value,
    date:    strengthForm.date.value,
    rating:  strengthForm.rating.value,
    notes:   strengthForm.notes.value,
  };
  saveWorkout(data);
  showSuccess(strengthForm);
  strengthForm.reset();
});

cardioForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    type:     "cardio",
    workout:  cardioForm.workout_type.value,
    date:     cardioForm.date.value,
    duration: cardioForm.duration.value,
    rating:   cardioForm.rating.value,
    notes:    cardioForm.notes.value,
  };
  saveWorkout(data);
  showSuccess(cardioForm);
  cardioForm.reset();
});

// ── SAVE TO LOCALSTORAGE ──
function saveWorkout(data) {
  const workouts = JSON.parse(localStorage.getItem("workouts") || "[]");
  workouts.push({ ...data, id: Date.now() });
  localStorage.setItem("workouts", JSON.stringify(workouts));
}

function toggleMenu() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");
}