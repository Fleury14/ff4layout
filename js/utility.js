// Assumes timer was loaded
console.log('Utility loaded.');
// vars
let padConnected = false;
let gameStarted = false;
let timerInterval = null;
let isInMenu = false;
let buttons = null;
let buttonDown = false;
let backButtonDown = false;
let selectButtonDown = false;
let menuPresses = {
    select: 0,
    back: 0,
}
let menuLevel = 0;

// hotkeys
let startKey = 'KeyZ';
let menuButton = 3;
let backButton = 0;
let selectButton = 1;

// page refs
const padStatus = document.getElementById('padStatus');
padStatus.innerText = "Disconnected";
const currentTime = document.getElementById('currentTime');
const gameStatus = document.getElementById('gameStatus');

function resetPresses() {
    menuPresses = {
        select: 0,
        back: 0,
    }
}

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
        if (buttons && buttons[menuButton].pressed) {
            buttonDown = true;
        } else {
            if (buttonDown) {
                buttonDown = false;
                menuButtonPressed();
            }
        }
        if (buttons[backButton].pressed) {
            backButtonDown = true;
        } else {
            if (backButtonDown) {
                backButtonDown = false;
                backButtonPressed();
            }
        }
        if (buttons[selectButton].pressed) {
            selectButtonDown = true;
        } else {
            if (selectButtonDown) {
                selectButtonDown = false;
                selectButtonPressed();
            }
        }
    
    }, 10)
}

function padGoodbye(e) {
    padConnected = false;
    padStatus.innerText = "Disconnected";
}

function checkKey(e) {
    console.log('keypress', e);
    if (e.code === startKey) {
        startKeyPressed();
    }
    
}

function backButtonPressed() {
    if (gameStarted && isInMenu) {
        if (menuLevel === 1) {
            isInMenu = false;
            menuTime.stopTimer();
        } else {
            menuLevel--;
            console.log(menuLevel);
        }
        
    }
}

function selectButtonPressed() {
    if (gameStarted && isInMenu) {
        if(menuLevel < 2) {
            menuLevel++;
            console.log(menuLevel);
        }
    }
}

function menuButtonPressed() {
    if (gameStarted) {
        if (!isInMenu) {
            isInMenu = true;
            menuLevel = 1;
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