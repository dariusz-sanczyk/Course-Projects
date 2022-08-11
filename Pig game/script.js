'use strict';

const rollMachine = function () {
  let newRoll = Math.trunc(Math.random() * 6 + 1);
  return newRoll;
};

const scorePlayer0El = document.getElementById('score--0');
const scorePlayer1El = document.getElementById('score--1');
const currentScorePlayer0El = document.getElementById('current--0');
const currentScorePlayer1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

let rollNumb = rollMachine;

const roll = function () {
  const roll = rollMachine();
  console.log(roll);
  diceEl.setAttribute('src', 'dice-' + roll + '.png');
  diceEl.classList.remove('hidden');
};

diceEl.classList.add('hidden');
scorePlayer0El.textContent = 0;
scorePlayer1El.textContent = 0;

rollBtn.addEventListener('click', roll);
