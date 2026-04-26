const strengthList = document.getElementById("strength-list");
const cardioList = document.getElementById("cardio-list");

function getStars(rating) {
  return "⭐".repeat(Number(rating));
}

function renderWorkouts() {
  // Clear both lists
  strengthList.innerHTML = "";
  cardioList.innerHTML = "";

  const workouts = JSON.parse(localStorage.getItem("workouts") || "[]");

  // Sort by date — newest first
  workouts.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (workouts.filter(w => w.type === "strength").length === 0) {
    strengthList.innerHTML = '<p style="color:rgba(255,255,255,0.4);text-align:center;">No strength workouts yet.</p>';
  }
  if (workouts.filter(w => w.type === "cardio").length === 0) {
    cardioList.innerHTML = '<p style="color:rgba(255,255,255,0.4);text-align:center;">No cardio workouts yet.</p>';
  }

  workouts.forEach(workout => {
    const card = document.createElement("div");
    card.className = "workout-card";

    const info = workout.type === "strength"
      ? `
        <p><strong>Type:</strong> ${workout.workout}</p>
        <p><strong>Date:</strong> ${workout.date}</p>
        <p><strong>Rating:</strong> ${getStars(workout.rating)}</p>
        <p><strong>Notes:</strong> ${workout.notes || "—"}</p>
      `
      : `
        <p><strong>Type:</strong> ${workout.workout}</p>
        <p><strong>Date:</strong> ${workout.date}</p>
        <p><strong>Time:</strong> ${workout.duration} min</p>
        <p><strong>Rating:</strong> ${getStars(workout.rating)}</p>
        <p><strong>Notes:</strong> ${workout.notes || "—"}</p>
      `;

    card.innerHTML = `
      ${info}
      <button class="delete-btn" onclick="deleteWorkout(${workout.id})">Delete</button>
    `;

    if (workout.type === "strength") {
      strengthList.appendChild(card);
    } else {
      cardioList.appendChild(card);
    }
  });
}

function deleteWorkout(id) {
  if (confirm("Delete this workout?")) {
    let workouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    workouts = workouts.filter(w => w.id !== id);
    localStorage.setItem("workouts", JSON.stringify(workouts));
    renderWorkouts(); // re-render without page reload
  }
}

renderWorkouts();