'use strict';

// Roll 1-6 logic
const rollMachine = function () {
  let newRoll = Math.trunc(Math.random() * 6 + 1);
  return newRoll;
};

let score0 = 0;
let score1 = 0;
let currScore = 0;
let gameActive = true;

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scorePlayer0El = document.getElementById('score--0');
const scorePlayer1El = document.getElementById('score--1');
const currentScorePlayer0El = document.getElementById('current--0');
const currentScorePlayer1El = document.getElementById('current--1');
const player0WinnerEl = document.querySelector('.winner--0');
const player1WinnerEl = document.querySelector('.winner--1');
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const bodyEl = document.querySelector('body');

// Identify current player
const currPLayer = function () {
  const player = player0El.classList.contains('player--active') ? 0 : 1;
  return player;
};
//  Display main score
const displayScore = function (score, player) {
  document.getElementById('score--' + player).textContent =
    Number(document.getElementById('score--' + player).innerHTML) + score;
};
//  Display current score
const displayCurrScore = function (score, player) {
  document.getElementById('current--' + player).textContent = score;
};
// Check main score
const checkScore = function () {
  score0 = Number(document.getElementById('score--0').innerHTML);
  score1 = Number(document.getElementById('score--1').innerHTML);
};
// Switch current player
const switchPlayer = function () {
  if (player0El.classList.contains('player--active')) {
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  } else {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  }
};
// Rolling dice and checking for '1' condition
const roll = function () {
  if (gameActive) {
    const roll = rollMachine();
    diceEl.setAttribute('src', `dice-${roll}.png`);
    diceEl.classList.remove('hidden');
    if (roll !== 1) {
      currScore += roll;
      displayCurrScore(currScore, currPLayer());
    } else {
      currScore = 0;
      displayCurrScore(currScore, currPLayer());
      switchPlayer();
    }
  }
};
// Holding current score and checking for win
const hold = function () {
  if (gameActive) {
    displayScore(currScore, currPLayer());
    currScore = 0;
    displayCurrScore(currScore, currPLayer());
    checkScore();
    if (score0 >= 100) {
      player0El.classList.add('player--winner');
      player0WinnerEl.classList.remove('hidden');
      gameActive = false;
    } else if (score1 >= 100) {
      player1El.classList.add('player--winner');
      player1WinnerEl.classList.remove('hidden');
      gameActive = false;
    } else {
      switchPlayer();
    }
  }
};
//  Reset all scores and winners
const newGame = function () {
  score0 = 0;
  score1 = 0;
  currScore = 0;
  currentScorePlayer0El.textContent = 0;
  currentScorePlayer1El.textContent = 0;
  scorePlayer0El.textContent = 0;
  scorePlayer1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active', 'player--winner');
  player0El.classList.remove('player--winner');
  player0WinnerEl.classList.add('hidden');
  player1WinnerEl.classList.add('hidden');
};

// Button handlers

rollBtn.addEventListener('click', roll);
holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', newGame);
