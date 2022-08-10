'use strict';

const lotteryMachine = Math.trunc(Math.random() * 20 + 1);

let score = 20;
let highscore = 0;
let secretNumb = lotteryMachine
const bodySelector = document.querySelector('body')
const numberSelector = document.querySelector('.number')


const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (!guess) {
    displayMessage('✖ Please pass number.');
  } else if (guess === secretNumb) {
    displayMessage('🏆 You guessed right.');
    numberSelector.textContent = secretNumb;

    bodySelector.style.backgroundColor = '#60b347';
    numberSelector.style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = score;
    }
  } else if(guess !== secretNumb) {

    if (score>1) {
        displayMessage(guess > secretNumb ? 'Number too high!' : 'Number too low')
        score--
        displayScore(score);
    } else {
        displayMessage('💥 You lost the game!');
        displayScore(0);
    }
  }
  
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumb = lotteryMachine
  displayScore(score);
  displayGuess('.guess') = '';
  displayMessage('Start guessing...');
  bodySelector.style.backgroundColor = '#222';
  numberSelector.style.width = '15rem';
  numberSelector.textContent = '?';
});
