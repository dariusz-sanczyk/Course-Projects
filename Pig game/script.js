'use strict';

const rollMachine = function () {
  let newRoll = Math.trunc(Math.random() * 6 + 1);
  return newRoll;
};
let score0 = 0;
let score1 = 0;
let currScore = 0;

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scorePlayer0El = document.getElementById('score--0');
const scorePlayer1El = document.getElementById('score--1');
const currentScorePlayer0El = document.getElementById('current--0');
const currentScorePlayer1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

const currPLayer = function () {
  const player = player0El.classList.contains('player--active') ? 0 : 1;
  return player;
};

diceEl.classList.add('hidden');
scorePlayer0El.textContent = 0;
scorePlayer1El.textContent = 0;

const displayScore = function (score, player) {
  document.getElementById('score--' + player).textContent = score;
};
const displayCurrScore = function (score, player) {
  document.getElementById('current--' + player).textContent = score;
};

const switchPlayer = function () {
  if (player0El.classList.contains('player--active')) {
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  } else {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  }
};

const roll = function () {
  const roll = rollMachine();
  console.log(roll);
  diceEl.setAttribute('src', `dice-${roll}.png`);
  diceEl.classList.remove('hidden');
  if (roll !== 1) {
    currScore += roll;
    console.log(currScore);
    displayCurrScore(currScore, currPLayer()); // if active player ? 0 : 1
  } else {
    currScore = 0;
    displayCurrScore(currScore, currPLayer());
    switchPlayer();
  }
};

const hold = function () {
  displayScore(currScore, currPLayer());
  currScore = 0;
  displayCurrScore(currScore, currPLayer());
  switchPlayer();
};

rollBtn.addEventListener('click', roll);
holdBtn.addEventListener('click', hold);
