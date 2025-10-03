let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];



function startGame(){
    showGameScreen();
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

function showHelpScreen(){
    let container = document.getElementById('container');
    document.getElementById('startScreen').classList.add('d-none');
    container.innerHTML = `
    <div>
        <div class="explanation">
            <img src="img/arrow-key.png" alt="Arrow to left">
            <span>Move forward</span>
        </div>
        <div class="explanation">
            <img src="img/arrow-key.png" alt="Arrow to left">
            <span>Move forward</span>
        </div>
        <div class="explanation">
            <img src="img/arrow-key.png" alt="Arrow to left">
            <span>Move forward</span>
        </div>
        <div class="explanation">
            <img src="img/arrow-key.png" alt="Arrow to left">
            <span>Move forward</span>
        </div>
        <div onclick="stopGame()">Stop Game</div>
        <img class="fullScreen" src="img/fullScreen.png" alt="fullScreen">
    </div>    
    `
}

function showSettingsScreen(){

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
    }   
});