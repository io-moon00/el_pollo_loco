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
 * Pauses all currently playing sounds in the game.
 * This includes the background music, character snoring, hurt, and walking sounds.
 * @returns {void}
 */
function stopAllSounds(){
    background_sound.pause();
    world.character.snoreSound.pause();
    world.character.hurtSound.pause();
    world.character.walkingSound.pause();
}

/**
 * Stops the game by pausing all sounds and clearing all game-related intervals.
 * @returns {void}
 */
function stopGame(){ 
    stopAllSounds();
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

/**
 * Initializes mobile touch controls after the DOM is fully loaded.
 * This function sets up event listeners for touch interactions on the
 * on-screen buttons for moving left, moving right, jumping, and throwing.
 * It maps these touch events to the corresponding keyboard state properties.
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", () => {
    moveLeftBtn = document.getElementById('btnLeft');
    moveRightBtn = document.getElementById('btnRight');
    jumpBtns = document.getElementsByClassName('jump');
    throwBtn = document.getElementById('btnThrow');

    moveLeftBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    }, { passive: false });

    moveRightBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    }, { passive: false });

    Array.from(jumpBtns).forEach(jumpBtn => {
        jumpBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.SPACE = true;
        }, { passive: false });
    });

    throwBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.Q = true;
    }, { passive: false });

    moveLeftBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    }, { passive: false });

    moveRightBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    }, { passive: false });

    Array.from(jumpBtns).forEach(jumpBtn => {
        jumpBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.SPACE = false;
        }, { passive: false });
    });

    throwBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.Q = false;
    }, { passive: false });

    moveLeftBtn.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    }, { passive: false });

    moveRightBtn.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    }, { passive: false });

    Array.from(jumpBtns).forEach(jumpBtn => {
        jumpBtn.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            keyboard.SPACE = false;
        }, { passive: false });
    });

    throwBtn.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        keyboard.Q = false;
    }, { passive: false });
});


/**
 * Checks if the device is in landscape mode.
 * This is determined by comparing the window's inner width and inner height.
 * @returns {boolean} - Returns `true` if the window's width is greater than its height, indicating landscape mode; otherwise, returns `false`.
 */
function isLandscapeMode() {
    return window.innerWidth > window.innerHeight;
}

/**
 * Handles the display of the orientation message based on the device's screen orientation.
 * If the device is in landscape mode, the orientation message is hidden.
 * If the device is in portrait mode, the orientation message is shown to prompt the user to rotate their device.
 * @returns {void}
 */
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

