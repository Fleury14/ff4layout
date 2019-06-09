// Assumes timer was loaded
console.log('Utility loaded.');
// vars
let padConnected = false;
let gameStarted = false;
let timerInterval = null;
let isInMenu = false;
let buttons = null;
let buttonDown = false;

// hotkeys
let startKey = 'Numpad1';
let menuButton = 3;

// page refs
const padStatus = document.getElementById('padStatus');
padStatus.innerText = "Disconnected";
const currentTime = document.getElementById('currentTime');
const gameStatus = document.getElementById('gameStatus');

function padInit(e) {
    padConnected = true;
    padStatus.innerText = "Connected";
    buttons = e.gamepad.buttons;
    readButtons();
    console.log(e);
    console.log('Pad initialized.');
}

function readButtons() {
    setInterval(() => {
        const pad = navigator.getGamepads();
        buttons = pad[0].buttons;
        if (buttons[menuButton].pressed) {
            buttonDown = true;
        } else {
            if (buttonDown) {
                buttonDown = false;
                menuButtonPressed();
            }
        }

    
    }, 10)
}

function padGoodbye(e) {
    padConnected = false;
    padStatus.innerText = "Disconnected";
}

function checkKey(e) {
    // console.log('keypress', e);
    if (e.key === 'z') {
        startKeyPressed();
    }
    
}

function menuButtonPressed() {
    if (gameStarted) {
        if (isInMenu) {
            isInMenu = false;
            menuTime.stopTimer();
        } else {
            isInMenu = true;
            menuTime.startTimer();
        }
    }
}

function displayTime() {
    timerInterval = setInterval(() => {
        currentTime.innerHTML = menuTime.returnTime();
    }, 100);
}

function startKeyPressed() {
    gameStarted = !gameStarted;
    if (gameStarted) {
        displayTime();
    }
    gameStatus.innerText = gameStarted ? 'ON' : 'OFF';
}

window.addEventListener("gamepadconnected", padInit);
window.addEventListener("gamepaddisconnected", padGoodbye);
const menuTime = new GameTimer();
window.addEventListener("keypress", checkKey);