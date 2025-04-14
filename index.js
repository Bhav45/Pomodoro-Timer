const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");

let interval;
let timeLeft = 1500; // 25 minutes in seconds
let isRunning = false;

// Create audio context for the beep sound
function createBeep() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.5;

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);

    setTimeout(() => {
        oscillator.stop();
    }, 1000);
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

    timerEl.innerHTML = formattedTime;
    document.title = `${formattedTime} - Pomodoro Timer`;
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            isRunning = false;
            createBeep();
            alert("Time's up!");
            resetTimer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    timeLeft = 1500;
    updateTimer();
}

startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);

// Initialize timer display
updateTimer();