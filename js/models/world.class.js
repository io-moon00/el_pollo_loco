class World{
    character = new Character();
    level = level1;
    ctx;
    totalCoins = this.level.coins.length;
    canvas;
    keyboard;
    cameraX = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarHealthEndboss();
    throwableBottles=[];
    qKeyPressed = false;
    gameWonMenuShown = false;
    gameRunning = true;
    dirtyRegions = [];

    constructor(canvas, keyboard){
        this.gameRunning = true;
        this.ctx = canvas.getContext('2d');
        this.physics = new WorldPhysics(this);
        this.endScreen = new WorldEndScreen(this, canvas);
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    };


    /**
     * Starts the main game loop.
     * @returns {void}
     */
    run(){
        this.gameLoop();
    }

    /**
     * Clears the canvas and redraws all game objects for the current frame.
     * This includes background, level objects, and status bars, adjusting for camera position.
     * @returns {void}
     */
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.cameraX, 0);
        this.drawBackgroundObjects();   
        this.drawLevelObjects();
        this.ctx.restore();
        this.drawStatusBars();
    }

    /**
     * The main game loop, responsible for updating game state, checking conditions, and rendering frames.
     * It continuously calls itself using requestAnimationFrame to create a smooth animation.
     * The loop checks for collisions, player actions, and game-ending conditions (win/lose).
     * @returns {void}
     */
    gameLoop() {
        if (!this.gameRunning) return; 
        this.physics.checkCollisions();
        this.checkThrowObjects();
        this.update();
        if (this.isGameOver()) {
            this.endScreen.drawGameOverScreen();
            stopGame();
            this.gameRunning = false;
        } else if (this.isGameWon()) {
            this.endScreen.drawYouWinScreen();
            stopGame();
        }
        requestAnimationFrame(() => this.gameLoop());
    }

    /**
     * Clears the canvas and draws all game elements for the initial frame.
     * This includes the background, status bars, and level objects, and sets the initial camera position.
     * @returns {void}
     */
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackgroundObjects();
        this.drawStatusBars();
        this.drawLevelObjects();
    }

    /**
     * Draws all movable and interactive objects within the game level.
     * This includes clouds, the end boss, enemies, the player character, and various collectible or throwable items.
     * The objects are drawn in a specific order to ensure correct layering.
     * @returns {void}
     */
    drawLevelObjects(){
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addToMap(this.level.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectableBottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableBottles);
    }

    /**
     * Draws all background objects of the current level.
     * @returns {void}
     */
    drawBackgroundObjects(){
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    /**
     * Draws all status bars (health, coin, bottle) on the canvas.
     * @returns {void}
     */
    drawStatusBars(){
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        if (this.level.endboss.firstContact) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    /**
     * Checks for player input to throw a bottle and manages the throwing action.
     * If the 'Q' key is pressed and there are bottles available, it creates a new ThrowableBottle,
     * adds it to the game world, and decrements the character's bottle count.
     * It also handles the key press state to prevent continuous throwing.
     * @returns {void}
     */
    checkThrowObjects(){
        if(this.keyboard.Q && !this.qKeyPressed){
            this.qKeyPressed = true;
            if (this.character.collectedBottles > 0){
                let bottle = new ThrowableBottle(this.character.x+100, this.character.y+100, this.character.otherDirection);
                this.throwableBottles.push(bottle);
                this.character.collectedBottles -= 1;
                this.character.setLastMove();
            }
        } else if(!this.keyboard.Q && this.qKeyPressed){
            this.qKeyPressed = false;
        }
    }

    /**
     * Sets the world reference for key game objects.
     * This allows objects like the character, status bars, and the end boss to have a reference
     * to the main world instance, enabling them to interact with it.
     * @returns {void}
     */
    setWorld(){
        this.character.world = this;
        this.statusBarCoin.world = this;
        this.statusBarBottle.world = this;
        this.level.endboss.world = this;
    };

    /**
     * Iterates over an array of game objects and adds each one to the map.
     * @param {MovableObject[]} objects - An array of game objects to be drawn on the canvas.
     * @returns {void}
     */
    addObjectsToMap(objects){
        objects.forEach(object =>{
            this.addToMap(object);
        });
    };

    /**
     * Draws a single movable object on the canvas, handling image flipping if necessary.
     * If the object's `otherDirection` property is true, the canvas context is flipped horizontally
     * before drawing, and then restored afterward.
     * @param {MovableObject} movableObject - The movable object to be drawn.
     * @returns {void}
     */
    addToMap(movableObject){
        if(movableObject.otherDirection){
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        if(movableObject.otherDirection){
            this.flipImageBack(movableObject);
        }
    };

    /**
     * Flips the canvas context horizontally to prepare for drawing a mirrored image.
     * This is used when an object is facing the opposite direction.
     * @param {MovableObject} movableObject - The game object to be flipped. Its width is used for translation and its x-coordinate is inverted.
     * @returns {void}
     */
    flipImage(movableObject){
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x* -1;
    }

    /**
     * Restores the canvas context after a horizontal flip and reverts the object's x-coordinate.
     * This is called after drawing a mirrored image to return the context and object's position to their original state.
     * @param {MovableObject} movableObject - The game object whose x-coordinate needs to be reverted.
     * @returns {void}
     */
    flipImageBack(movableObject){
        movableObject.x = movableObject.x* -1;
        this.ctx.restore();
    }

    /**
     * Checks if the game is over.
     * The game is considered over if the character is dead and has fallen below the canvas.
     * @returns {boolean} True if the game is over, otherwise false.
     */
    isGameOver(){
        return this.character.isDead() && this.character.y > this.canvas.height;
    }

    /**
     * Checks if the game has been won.
     * The game is considered won if the end boss is dead and its death animation has completed.
     * @returns {boolean} True if the game is won, otherwise false.
     */
    isGameWon(){
        return this.level.endboss.isDead() && this.level.endboss.deadAnimationCompleted;
    }
}