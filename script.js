'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// (selection the summery score in html at line 14)
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
// selection from html the p with the id of current--0 that display the score line 17 in html ⬇️
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// reusable functions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Starting conditions
let scores, currentScore, activePlayer, playing;
// innit stands for inzializzazione
const innit = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  // 1.set score to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  // 2. set current scores to 0
  current0El.textContent = 0;
  current1El.textContent = 0;
  // switch back to plyer 0
  // remove winner class ☑️
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
// running the function
innit();
// Rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2.display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.check for a roll 1: if true pass ti next player
    if (dice !== 1) {
      // add dice to current scores
      // currentScore = currentScore + dice
      currentScore += dice;
      //with text content you DISPLAY the actual score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; //change later
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.Add current score to the active players score
    scores[activePlayer] += currentScore;
    // scores[1] = score[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.and check if score is >= 100 if true
    if (scores[activePlayer] >= 100) {
      //finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3.else switch to next player
      switchPlayer();
    }
  }
});
//Reset my try
btnNew.addEventListener('click', innit);
