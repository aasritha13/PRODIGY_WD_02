let startTime, updatedTime, difference, tInterval, savedTime, paused = 0, running = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (savedTime || 0);
        tInterval = setInterval(getShowTime, 1);
        paused = 0;
        running = 1;
    }
}

function pause() {
    if (!paused && running) {
        clearInterval(tInterval);
        savedTime = difference;
        paused = 1;
        running = 0;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    paused = 0;
    running = 0;
    display.innerHTML = '00:00:00';
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement('div');
        lapTime.innerText = display.innerHTML;
        lapsContainer.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    display.innerHTML = hours + ':' + minutes + ':' + seconds;
}
