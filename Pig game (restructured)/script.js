'use strict';

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

let scores, currScore, gameActive, currPlayer;

//  Reset all scores and winners
const newGame = function () {
  scores = [0, 0];
  currScore = 0;
  currPlayer = 0;
  gameActive = true;
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

newGame();

// Roll 1-6 logic
const rollMachine = function () {
  let newRoll = Math.trunc(Math.random() * 6 + 1);
  return newRoll;
};

//  Display main score
const displayScore = function (player) {
  document.getElementById(`score--${player}`).textContent = scores[player];
};
//  Display current score
const displayCurrScore = function (score, player) {
  document.getElementById(`current--${player}`).textContent = score;
};

// Switch current player
const switchPlayer = function () {
  document.getElementById(`current--${currPlayer}`).textContent = 0;
  currScore = 0;
  currPlayer = currPlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling dice and checking for '1' condition
const roll = function () {
  if (gameActive) {
    const roll = rollMachine();
    diceEl.setAttribute('src', `dice-${roll}.png`);
    diceEl.classList.remove('hidden');

    if (roll !== 1) {
      currScore += roll;
      displayCurrScore(currScore, currPlayer);
    } else {
      switchPlayer();
    }
  }
};
// Holding current score and checking for win
const hold = function () {
  if (gameActive) {
    scores[currPlayer] += currScore;
    displayScore(currPlayer);
    if (scores[currPlayer] >= 10) {
      gameActive = false;
      document
        .querySelector(`.player--${currPlayer}`)
        .classList.add('player--winner');
      document.querySelector(`.winner--${currPlayer}`).classList.add('winner');
      document
        .querySelector(`.winner--${currPlayer}`)
        .classList.remove('hidden');
    } else {
      switchPlayer();
    }
  }
};

// Button handlers

rollBtn.addEventListener('click', roll);
holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', newGame);
