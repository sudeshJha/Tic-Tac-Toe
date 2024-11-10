"use strict";

///////////////////////////////////------------  X and O VARIABLES
const x = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="white"
    class="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
`;
let o = `<svg xmlns="http://www.w3.org/2000/svg" width="9rem" height="9rem" fill="white" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"></path></svg>`;

///////////////////////////////////------------  DOM VARIABLES

const start = document.querySelector(".start");
const ticTacToe = document.querySelector("main");
let boxList = document.querySelectorAll(".box");
const player1Name = document.querySelector(".player-name-1");
const player2Name = document.querySelector(".player-name-2");
let player1 = document.querySelector(".player-1");
let player2 = document.querySelector(".player-2");
let score1 = document.querySelector(".score-1");
let score2 = document.querySelector(".score-2");
let message1 = document.querySelector(".m-1");
let message2 = document.querySelector(".m-2");
const btnBack = document.querySelector(".btn-back");
const btnRestart = document.querySelector(".btn-restart");

///////////////////////////////////------------ PLAYING VARIABLE
let currentPlayer, currentMark, arr, playing, score;

///////////////////////////////////------------ RESET GAME
const reset = function () {
  currentPlayer = 1;
  currentMark;
  arr = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
  playing = 0;
  score = [0, 0];
  boxList.forEach((box) => (box.innerHTML = ""));
};

///////////////////////////////////------------ DISPLAY SCORE
const displayScore = function () {
  score1.textContent = score[0];
  score2.textContent = score[1];
};

///////////////////////////////////------------ START PLAYING
document.querySelector(".play-btn").addEventListener("click", function () {
  document.querySelector(".tictactoe").classList.remove("hidden");
  start.classList.add("hidden");
  btnBack.style.opacity = "100%";
  btnRestart.style.opacity = "100%";
  reset();

  if (player1Name.value === "") {
    player1.textContent = `Player 1`;
  } else {
    player1.textContent = player1Name.value;
  }
  if (player2Name.value === "") {
    player2.textContent = `Player 2`;
  } else {
    player2.textContent = player2Name.value;
  }

  playing = 1;
  displayScore();
  activePlayer();
});

///////////////////////////////////------------ BACK BUTTON
btnBack.addEventListener("click", () => {
  document.querySelector(".tictactoe").classList.add("hidden");
  start.classList.remove("hidden");
  btnBack.style.opacity = 0;
  btnRestart.style.opacity = 0;
});

///////////////////////////////////------------ RESTART BUTTON
btnRestart.addEventListener("click", () => {
  arr = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];

  boxList.forEach((box, i) => (box.textContent = ""));
  currentPlayer = 1;
  playing = 1;
  message1.style.opacity = "0";
  message2.style.opacity = "0";
  activePlayer();
});

///////////////////////////////////------------ BOX CLICK
boxList.forEach((box, i) => {
  box.addEventListener("click", function () {
    const row = Math.floor(i / 3);
    const col = Math.floor(i % 3);
    if (playing) {
      if (arr[row][col] === -1) {
        box.style.color = "whitesmoke";
        box.style.fontSize = "10rem";
        box.style.textAlign = "center";
        box.style.transition = "2s";

        if (currentPlayer === 1) {
          arr[row][col] = currentPlayer;
          currentMark = x;
          currentPlayer = 2;
        } else if (currentPlayer === 2) {
          arr[row][col] = currentPlayer;
          currentMark = o;
          currentPlayer = 1;
        }
        activePlayer();
        box.innerHTML = currentMark;
      }

      if (gameCheck() === 1) {
        player1.classList.add("winner");
        player1.style.color = "green";
        message1.style.opacity = "100%";
        score[0] = score[0] + 1;
        playing = 0;
      }
      if (gameCheck() === 2) {
        player2.classList.add("winner");
        player2.style.color = "green";
        message2.style.opacity = "100%";
        score[1] = score[1] + 1;
        playing = 0;
      }
      if (gameCheck() === 0) {
        score[0] = score[0] + 0.5;
        score[1] = score[1] + 0.5;
        playing = 0;
        message1.style.opacity = "100%";
        message1.style.transition = "0.2s";
        message1.textContent = "draw";
        message2.style.opacity = "100%";
        message1.style.transition = "0.2s%";
        message2.textContent = "draw";
      }
      displayScore();
    }
  });
});

///////////////////////////////////------------ ACTIVE PLAYER
const activePlayer = function () {
  if (currentPlayer === 1) {
    player1.style.color = "whitesmoke";
    player2.style.color = "rgb(116, 115, 118)";
  }
  if (currentPlayer === 2) {
    player2.style.color = "whitesmoke";
    player1.style.color = "rgb(116, 115, 118)";
  }
};

///////////////////////////////////------------ CHECK GAME WIN
let gameCheck = function () {
  let win = -1;
  let count = 0;

  for (let i = 0; i < 3; i++) {
    let j = 0;
    // checking rows
    if (
      arr[i][j] === arr[i][j + 1] &&
      arr[i][j + 1] === arr[i][j + 2] &&
      arr[i][j] !== -1
    ) {
      win = arr[i][j];
      return win;
    }
    // checking columns
    if (
      arr[j][i] === arr[j + 1][i] &&
      arr[j][i] === arr[j + 2][i] &&
      arr[j][i] !== -1
    ) {
      win = arr[j + i][i];
      return win;
    }
  }
  // checking diagonals
  if (arr[0][0] === arr[1][1] && arr[2][2] === arr[1][1] && arr[1][1] !== -1) {
    win = arr[1][1];
    return win;
  }
  if (arr[0][2] === arr[1][1] && arr[2][0] === arr[1][1] && arr[1][1] !== -1) {
    win = arr[1][1];
    return win;
  }

  // continuation
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      count++;
      if (arr[i][j] === -1) return win;
    }
  }
  if (count >= 9) {
    return 0;
  }
};
