const player = document.getElementById("player");
const board = document.getElementById("game-board");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const messageEl = document.getElementById("message");

let x = 0, y = 0;
let score = 0;
let timeLeft = 30;
const cellSize = 50;
const emojis = ["😂", "❤️", "🌟", "🎉", "😎", "✨"];
let gameInterval;

// Move player to grid position
function updatePosition() {
  player.style.left = `${x * cellSize}px`;
  player.style.top = `${y * cellSize}px`;
}

// Add a new emoji at a random spot
function spawnEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  const ex = Math.floor(Math.random() * 6);
  const ey = Math.floor(Math.random() * 6);

  emoji.style.left = `${ex * cellSize}px`;
  emoji.style.top = `${ey * cellSize}px`;

  board.appendChild(emoji);
}

// Handle collection
function checkCollision() {
  document.querySelectorAll(".emoji").forEach(emoji => {
    const ex = parseInt(emoji.style.left) / cellSize;
    const ey = parseInt(emoji.style.top) / cellSize;
    if (x === ex && y === ey) {
      emoji.remove();
      score++;
      scoreEl.textContent = `Score: ${score}`;
      messageEl.textContent = "✨ You grabbed an emoji!";
      spawnEmoji();
    }
  });
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "w") y = Math.max(0, y - 1);
  else if (e.key === "ArrowDown" || e.key === "s") y = Math.min(5, y + 1);
  else if (e.key === "ArrowLeft" || e.key === "a") x = Math.max(0, x - 1);
  else if (e.key === "ArrowRight" || e.key === "d") x = Math.min(5, x + 1);
  updatePosition();
  checkCollision();
});

// Mobile buttons
function move(direction) {
  if (direction === "up") y = Math.max(0, y - 1);
  if (direction === "down") y = Math.min(5, y + 1);
  if (direction === "left") x = Math.max(0, x - 1);
  if (direction === "right") x = Math.min(5, x + 1);
  updatePosition();
  checkCollision();
}

// Timer countdown
function startTimer() {
  gameInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      messageEl.textContent = `⏰ Time's up! Final Score: ${score}`;
      document.removeEventListener("keydown", () => {});
    }
  }, 1000);
}

// Game start
updatePosition();
spawnEmoji();
startTimer();
