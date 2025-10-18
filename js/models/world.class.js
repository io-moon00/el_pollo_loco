class World{
    character = new Character();
    level = level1;
    ctx;
    totalCoins = this.level.coins.length;
    totalCollectableBottels = this.level.collectableBottles.length;
    canvas;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableBottles=[];
    qKeyPressed = false;
    gameOverSound = new Audio('audio/game_over.mp3');


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;  
        this.setWorld();
        this.run();
        this.draw();
    };

    /**
     * Starts the main game loop.
     * This function sets up a stoppable interval that runs at approximately 60 frames per second.
     * In each interval, it checks for collisions between game objects and checks if the player
     * has initiated a throw action.
     * @returns {void}
     */
    run(){
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000/60);
    }
    
    /**
     * Checks for all types of collisions within the game world.
     * This function serves as a central point to manage collision detection 
     * between the character and various game objects like enemies, coins, and bottles,
     * as well as collisions between thrown bottles and enemies.
     * @returns {void}
     */
    checkCollisions(){
        this.checkEnemyCollision();
        this.checkCoinCollision();
        this.checkBottleCollision();
        this.checkCollisionsBottleEnemy();
    }

    checkEnemyCollision(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && !enemy.isDead()){
                if(this.character.isFlyingDown()){
                    if (!(enemy instanceof Endboss)){
                    enemy.life = 0;
                    }
                } else if (!this.character.isHurt()){
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.life);
                }
            }
        })
    }

    /**
     * Checks for collisions between the character and coins.
     * Iterates through all coins in the level. If the character is colliding with a coin,
     * the coin is marked as collected and the character's collected coin count is incremented.
     * @returns {void}
     */
    checkCoinCollision(){
        this.level.coins.forEach((coin) => {
            if(this.character.isColliding(coin)){
                if (!coin.is_collected){
                    coin.collect();
                    this.character.collectedCoins += 1;
                }
            }
        })
    }

    /**
     * Checks for collisions between the character and collectable bottles.
     * Iterates through all collectable bottles in the level. If the character collides with a bottle,
     * the bottle is marked as collected, and the character's count of collected bottles is incremented.
     * @returns {void}
     */
    checkBottleCollision(){
        this.level.collectableBottles.forEach((bottle, index) => {
            if(this.character.isColliding(bottle)){
                if (!bottle.is_collected){
                    bottle.collect();
                    this.character.collectedBottles += 1;
                }
            } 
        })
    }

    checkCollisionsBottleEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.throwableBottles.forEach((bottle) => {
                if (enemy.isColliding(bottle)) {
                    bottle.startSplashing();
                    if(enemy instanceof Endboss && !enemy.isHurt()){
                        this.EndbossBottleCollision(enemy);
                    }else if (enemy instanceof Chicken){
                        this.ChickenBottleCollision(enemy);
                    }
                }
            });
        });
    }


    ChickenBottleCollision(enemy){
        enemy.life = 0;
    }

    EndbossBottleCollision(enemy){
        enemy.hit();
        console.log('Endboss life: ' + enemy.life);
    }
    
    checkThrowObjects(){
    if(this.keyboard.Q && !this.qKeyPressed){
        // Key was just pressed down - throw bottle here
        this.qKeyPressed = true;
        if (this.character.collectedBottles > 0){
            let bottle = new ThrowableBottle(this.character.x+100, this.character.y+100, this.character.otherDirection);
            this.throwableBottles.push(bottle);
            this.character.collectedBottles -= 1;
            this.character.setLastMove();
        }
    } else if(!this.keyboard.Q && this.qKeyPressed){
        // Key was just released - only reset the flag
        this.qKeyPressed = false;
    }
}

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
      
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectableBottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableBottles);
        
        this.ctx.translate(-this.camera_x, 0);
        let self = this;

        requestAnimationFrame(function() {
            if (!self.isGameOver() && !self.isGameWon()) {
                self.draw();
            } else if (self.isGameOver()) {
                self.drawGameOver();
                stopGame();
            } else if (self.isGameWon()) {
                self.drawGameWon();
                stopGame();
            }
        });
    };

    setWorld(){
        this.character.world = this;
        this.statusBarCoin.world = this;
        this.statusBarBottle.world = this;
        let endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss){
            endboss.world = this;
        }
    };

    addObjectsToMap(objects){
        objects.forEach(object =>{
            this.addToMap(object);
        });
    };

    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    };

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x* -1;
    }

    flipImageBack(mo){
        mo.x = mo.x* -1;
        this.ctx.restore();
    }

    drawGameOver(){
        if (isSoundActivated()){
            this.gameOverSound.play();
        }
        let gameOverImg = new Image();
        gameOverImg.src = 'img/9_intro_outro_screens/game_over/game over.png';
        gameOverImg.onload = () => {
            const scaledWidth = gameOverImg.width * 0.5;
            const scaledHeight = gameOverImg.height * 0.5;
            this.ctx.drawImage(
                gameOverImg, 
                this.canvas.width/2 - scaledWidth/2, 
                this.canvas.height/2 - scaledHeight/2,
                scaledWidth,
                scaledHeight
            );
        document.getElementById('gameOverMenu').classList.remove('d-none');
        };
    }

    // ...existing code...

    drawGameWon(){
        let gameWonImg = new Image();
        gameWonImg.src = 'img/9_intro_outro_screens/win/win_1.png'; // Use appropriate win image
        gameWonImg.onload = () => {
            // Draw the win image (if you have one)
            const scaledWidth = gameWonImg.width * 0.5;
            const scaledHeight = gameWonImg.height * 0.5;
            this.ctx.drawImage(
                gameWonImg, 
                this.canvas.width/2 - scaledWidth/2, 
                this.canvas.height/2 - scaledHeight/2,
                scaledWidth,
                scaledHeight
            );
            
            // Draw "You Won!" text
            this.drawWinText();
            
            // Show restart button
            document.getElementById('gameOverMenu').classList.remove('d-none');
        };
        
        // If no win image exists, just draw the text
        gameWonImg.onerror = () => {
            this.drawWinText();
            document.getElementById('gameOverMenu').classList.remove('d-none');
        };
    }

    drawWinText(){
        // Set text properties
        this.ctx.fillStyle = '#FFD700'; // Gold color
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 3;
        this.ctx.font = 'bold 60px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Draw text with stroke (outline)
        this.ctx.strokeText('YOU WON!', centerX, centerY);
        // Draw filled text
        this.ctx.fillText('YOU WON!', centerX, centerY);
    }

    isGameOver(){
        return this.character.isDead();
    }

    isGameWon(){
        return this.level.enemies.find(e => e instanceof Endboss).isDead();
    }

}