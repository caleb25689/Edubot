// --- EduBot AI Search ---
async function askEduBot() {
  const question = document.getElementById("searchBox").value;
  const answerBox = document.getElementById("answerBox");
  answerBox.innerHTML = "⏳ EduBot is thinking...";

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    answerBox.innerHTML = data.answer || "⚠️ No answer found.";
    updateProgress(20); // progress increases when student asks a question
  } catch (err) {
    answerBox.innerHTML = "❌ Error: EduBot failed to answer.";
  }
}

// --- Progress Tracker ---
function updateProgress(points) {
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

  let current = parseInt(progressBar.value);
  let newVal = Math.min(current + points, 100);

  progressBar.value = newVal;
  progressText.innerText = `${newVal}% completed`;
}

// --- Quizzes ---
function startQuiz() {
  const quizBox = document.getElementById("quizBox");
  quizBox.innerHTML = `
    <p>Q1: What is 5 + 3?</p>
    <button onclick="checkAnswer(8)">8</button>
    <button onclick="checkAnswer(10)">10</button>
    <button onclick="checkAnswer(7)">7</button>
  `;
}

function checkAnswer(answer) {
  const quizBox = document.getElementById("quizBox");
  if (answer === 8) {
    quizBox.innerHTML = "✅ Correct! Well done!";
    updateProgress(30);
  } else {
    quizBox.innerHTML = "❌ Wrong. Try again!";
  }
}

// --- Voice Reading ---
function readAloud() {
  const text = document.getElementById("readText").value;
  if ("speechSynthesis" in window) {
    let speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
  } else {
    alert("❌ Sorry, voice reading is not supported in this browser.");
  }
}

// --- Homework Upload ---
document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("homeworkUpload");
  if (uploadInput) {
    uploadInput.addEventListener("change", () => {
      const status = document.getElementById("homeworkStatus");
      status.innerText = "📤 Homework uploaded! EduBot will help you solve it soon.";
      updateProgress(20);
    });
  }
});

// --- Premium Section ---
function unlockPremium() {
  alert("💎 Premium feature coming soon! Subscribe to unlock.");
}
