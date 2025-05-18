const cells = document.querySelectorAll(".cell");
const strike = document.getElementById("strike");
const message = document.getElementById("message");
const restart = document.getElementById("restart");

const wins = [
  [0, 1, 2], // row 1
  [3, 4, 5], // row 2
  [6, 7, 8], // row 3
  [0, 3, 6], // col 1
  [1, 4, 7], // col 2
  [2, 5, 8], // col 3
  [0, 4, 8], // diag TL-BR
  [2, 4, 6], // diag TR-BL
];

// Accurate CSS strike styles for a 3x3 grid with 80px cells and 10px gaps
const strikeStyles = [
  { top: 40, left: 0, width: 270, rotate: 0 },     // row 1
  { top: 130, left: 0, width: 270, rotate: 0 },    // row 2
  { top: 220, left: 0, width: 270, rotate: 0 },    // row 3

  { top: 0, left: 40, width: 270, rotate: 90 },    // col 1
  { top: 0, left: 120, width: 270, rotate: 90 },   // col 2
  { top: 0, left: 220, width: 270, rotate: 90 },   // col 3

  { top: 0, left: 0, width: 380, rotate: 45 },     // diag 0-4-8
  { top: 282, left: 0, width: 380, rotate: -45 }     // diag 2-4-6
];

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      showStrike(i);
      message.textContent = `${currentPlayer} Wins! 🎉`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    message.textContent = "Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `${currentPlayer}'s turn`;
}

function showStrike(index) {
  const style = strikeStyles[index];
  strike.style.top = `${style.top}px`;
  strike.style.left = `${style.left}px`;
  strike.style.width = `${style.width}px`;
  strike.style.transform = `rotate(${style.rotate}deg)`;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => (cell.textContent = ""));
  strike.style.width = 0;
  currentPlayer = "X";
  gameActive = true;
  message.textContent = `${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restart.addEventListener("click", resetGame);
resetGame();
