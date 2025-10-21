let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let background_sound = new Audio('audio/background.mp3');

/**
 * Initializes and starts the game.
 * This function hides the game over menu, initializes the level,
 * displays the game screen, starts the background music,
 * resets interval tracking, and creates a new game world instance.
 * @returns {void}
 */
function startGame(){
    document.getElementById('title').classList.add('game-title');
    elements = document.getElementsByClassName('hide-on-start');
    for (let btn of elements) {
        btn.classList.add('d-none');
    }
    document.getElementById('mobile-game-controls').classList.remove('d-none');
    intervalIds = [];
    initLevel();
    showGameScreen();
    playMusic();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
};

/**
 * Stops the game by pausing the background music and clearing all game-related intervals.
 * @returns {void}
 */
function stopGame(){ 
    background_sound.pause();
    intervalIds.forEach(clearInterval);
}

/**
 * Resets the game to the start screen.
 * This function stops all game-related processes and displays the initial start screen.
 * @returns {void}
 */
function resetGame(){
    stopGame();
    showStartscreen();
}
    
/**
 * Sets a stoppable interval by wrapping setInterval and storing its ID.
 * This allows all created intervals to be cleared later by iterating through the `intervalIds` array.
 * @param {function} fn - The function to be executed repeatedly.
 * @param {number} time - The interval time in milliseconds.
 * @returns {void}
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Displays the start screen of the game.
 * This function hides the game canvas and title, sets the start screen background,
 * and shows the main menu and the start game button.
 * @returns {void}
 */
function showStartscreen(){
    document.getElementById('title').classList.remove('game-title');
    document.getElementById('mobile-game-controls').classList.add('d-none');
    document.getElementById('game').classList.add('d-none');
    document.getElementById('title').classList.remove('d-none');
    document.getElementById('body').style.backgroundImage = "url('img/start-screen.png')";
    document.getElementById('menu').classList.remove('d-none');
    document.getElementById('start-game-btn').classList.remove('d-none');
    document.getElementById('restart-btn').classList.add('d-none');
    elements = document.getElementsByClassName('hide-on-start');
}

/**
 * Displays the main game screen.
 * This function hides the main menu and start button, shows the game canvas and title,
 * and sets the background image for the game.
 * @returns {void}
 */
function showGameScreen(){
    document.getElementById('game').classList.remove('d-none');
    document.getElementById('title').classList.remove('d-none');
    document.getElementById('body').style.backgroundImage = "url('img/game-background.png')";
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('start-game-btn').classList.add('d-none');
}

/**
 * Toggles fullscreen mode for the game canvas.
 * This function retrieves the canvas element and calls the `enterFullscreen`
 * function to switch the display to fullscreen.
 * @returns {void}
 */
function fullScreen() {
    let element = document.getElementById("canvas");
    enterFullscreen(element);
}

/**
 * Configures and plays the background music for the game.
 * This function sets the background music to loop, adjusts its volume,
 * and plays it only if the music setting is enabled.
 * @returns {void}
 */
function playMusic() {
    background_sound.loop = true;
    background_sound.volume = 0.3;
    setStoppableInterval(() => {
        if (isMusicActivated()) {
            background_sound.play();
        } else {
            background_sound.pause();
        }
    }, 500);
}

/**
 * Requests to display a given HTML element in fullscreen mode, handling browser-specific implementations.
 * This function checks for the standard `requestFullscreen` method and falls back to vendor-prefixed
 * versions for compatibility with different browsers like Firefox, Chrome, Safari, Opera, and IE/Edge.
 * @param {HTMLElement} element - The HTML element to be displayed in fullscreen.
 * @returns {void}
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode for the document.
 * This function checks for and calls the appropriate method to exit fullscreen
 * based on the browser being used (standard, Firefox, Chrome/Safari/Opera, IE/Edge).
 * @returns {void}
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}


window.addEventListener("keydown", (e) => {
    switch (e.code) {
        case 'ArrowUp':
            keyboard.UP = true;
            break;

        case 'ArrowDown': 
            keyboard.DOWN = true;
            break;

        case 'ArrowRight':
            keyboard.RIGHT = true;
            break;

        case 'ArrowLeft':
            keyboard.LEFT = true;
            break;

        case 'Space':
            keyboard.SPACE = true;
            break;  
        
        case 'KeyD':
            keyboard.D = true;
            break;
        
        case 'KeyQ':
            keyboard.Q = true;
            break;

        case 'KeyA':
            keyboard.A = true;
            break;
        
        case 'KeyW':
            keyboard.W = true;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.code) {
        case 'ArrowUp':
            keyboard.UP = false;
            break;

        case 'ArrowDown': 
            keyboard.DOWN = false;
            break;

        case 'ArrowRight':
            keyboard.RIGHT = false;
            break;

        case 'ArrowLeft':
            keyboard.LEFT = false;
            break;
             
        case 'Space':
            keyboard.SPACE = false;
            break;

        case 'KeyD':
            keyboard.D = false;
            break;
        
        case 'KeyQ':
            keyboard.Q = false;
            break;

        case 'KeyA':
            keyboard.A = false;
            break;
        
        case 'KeyW':
            keyboard.W = false;
            break;
        
    }   
});

document.addEventListener("DOMContentLoaded", () => {
    moveLeftBtn = document.getElementById('btnLeft');
    moveRightBtn = document.getElementById('btnRight');
    jumpBtn = document.getElementById('btnJump');
    throwBtn = document.getElementById('btnThrow');

    // Movement buttons
    moveLeftBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    }, { passive: false });

    moveRightBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    }, { passive: false });

    // Jump button
    jumpBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    }, { passive: false });

    // Throw button
    throwBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.Q = true;
    }, { passive: false });

    // Add touchend events to reset the keyboard state
    moveLeftBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    }, { passive: false });

    moveRightBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    }, { passive: false });

    jumpBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    }, { passive: false });

    throwBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.Q = false;
    }, { passive: false });

    // Also handle touchcancel in case the touch is interrupted
    moveLeftBtn.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    }, { passive: false });

    moveRightBtn.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    }, { passive: false });

    jumpBtn.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    }, { passive: false });

    throwBtn.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        keyboard.Q = false;
    }, { passive: false });
});


function isLandscapeMode() {
    return window.innerWidth > window.innerHeight;
}

function handleOrientation(){
    if (isLandscapeMode()) {
        document.getElementById('orientation-message').classList.add('d-none');
    } else {
        document.getElementById('orientation-message').classList.remove('d-none');
    }
}

window.addEventListener("load", () => {
    setTimeout(() => {
        handleOrientation();
    }, 50);
});

document.addEventListener("resize", () => {
    setTimeout(() => {
        handleOrientation();
    }, 200);
});


window.addEventListener("orientationchange", () => {
    setTimeout(() => {
        handleOrientation();
    }, 50);
});

