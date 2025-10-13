let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let background_sound = new Audio('audio/background.mp3');

function init(){
    background_sound.loop = true;
    background_sound.volume = 0.3;
}


function startGame(){
    initLevel();
    showGameScreen();
    if (isMusicActivated() === "true") {
    background_sound.play().catch(e => {
        console.log("Audio play failed:", e);
    });
    }
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
};

function stopGame(){  
    intervalIds.forEach(clearInterval);
    showStartscreen();
}

    
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push({ id, time, fn });
}

function showStartscreen(){
    document.getElementById('game').classList.add('d-none');
    document.getElementById('title').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('menu').classList.remove('d-none');
}

function showGameScreen(){
    document.getElementById('game').classList.remove('d-none');
    document.getElementById('title').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('menu').classList.add('d-none');
}

function fullScreen() {
    let element = document.getElementById("canvas");
    enterFullscreen(element);
}

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


function showEndScreen(){
    
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