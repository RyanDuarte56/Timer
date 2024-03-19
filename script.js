const inputContainer = document.querySelector('.input-container');
const clockContainer = document.querySelector('.clock-container');
const startButton = document.querySelector('.start-button');
const pauseButton = document.querySelector('.pause-button');
const resetButton = document.querySelector('.reset-button');
const resumeButton = document.querySelector('.resume-button');
const backButton = document.querySelector('.back-button');
const inputsList =  Array.from(document.querySelectorAll('.timer-input'));

let intervalId;
let hours;
let minutes;
let seconds;
let changeInputPage = false;

startButton.addEventListener('click', () => {
  hours = Number(document.querySelector('.hours-input').value);
  minutes = Number(document.querySelector('.minutes-input').value);
  seconds = Number(document.querySelector('.seconds-input').value);

  validateInputs();
  
  if(changeInputPage) {
    inputContainer.style.display = 'none';
    startButton.style.display = 'none';
    clockContainer.style.display = 'flex';
    pauseButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';

    displayClock();
    startTimer();

    inputsList.forEach(input => {
      input.value = '0';
    });

    changeInputPage = false;
  }
});

pauseButton.addEventListener('click', () => {
  pauseButton.style.display = 'none';
  resumeButton.style.display = 'inline-block';
  
  clearInterval(intervalId);
});

resumeButton.addEventListener('click', () => {
  resumeButton.style.display = 'none';
  pauseButton.style.display = 'inline-block';

  startTimer();
});

resetButton.addEventListener('click', () => {
  clockContainer.style.display = 'none';
  pauseButton.style.display = 'none';
  resumeButton.style.display = 'none';
  resetButton.style.display = 'none';
  inputContainer.style.display = 'flex';
  startButton.style.display = 'inline-block';

  clearInterval(intervalId);
});

backButton.addEventListener('click', () => {
  clockContainer.style.display = 'none';
  backButton.style.display = 'none';
  inputContainer.style.display = 'flex';
  startButton.style.display = 'inline-block';
});

function startTimer() {
  intervalId = setInterval(() => {
    updateClock();
    displayClock();
    checkFinishedTimer();
  }, 1000);
}

function updateClock() {
  seconds--;

  if (seconds === -1) {
    minutes--;
    seconds = 59;
  }
  
  if (minutes === -1) {
    hours--;
    minutes = 59;
  }
}

function displayClock() {
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  if (hours < 10) {
    hours = `0${hours}`;
  }

  clockContainer.innerHTML = `${hours}:${minutes}:${seconds}`;

  seconds = Number(seconds);
  minutes = Number(minutes);
  hours = Number(hours);
}

function checkFinishedTimer() {
  if (hours === 0 && minutes === 0 && seconds === 0) {
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'inline-block';

    clearInterval(intervalId);
  }
}

function validateInputs() {
  if (!Number.isInteger(hours) || hours < 0 || hours > 23 ||
      !Number.isInteger(minutes) || minutes < 0 || minutes > 59 ||
      !Number.isInteger(seconds) || seconds < 0 || seconds > 59 ||
      hours === 0 && minutes === 0 && seconds === 0) {
        alert('All inputs must be integers. Hours must be from 0 to 23. Minutes and seconds must be from 0 to 59. At least one input must be different from 0.');
  } else {
    changeInputPage = true;
  }
}