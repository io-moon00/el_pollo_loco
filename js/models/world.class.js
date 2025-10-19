class World{
    character = new Character();
    level = level1;
    ctx;
    totalCoins = this.level.coins.length;
    canvas;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableBottles=[];
    qKeyPressed = false;
    gameWonMenuShown = false;
    gameRunning = true; 

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.physics = new WorldPhysics(this);
        this.endScreen = new WorldEndScreen(this, canvas);
        this.canvas = canvas;
        this.keyboard = keyboard;  
        this.setWorld();
        this.draw();
        this.run();
    };


    run(){
        this.gameLoop();
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.drawBackgroundObjects();   
        this.drawLevelObjects();
        this.ctx.restore();
        this.drawStatusBars();
    }

    gameLoop() {
        if (!this.gameRunning) return; 
        console.log('Game loop tick');
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

    draw(){
        console.log('Drawing world');
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackgroundObjects();
        this.drawStatusBars();
        this.drawLevelObjects();
        this.ctx.translate(-this.camera_x, 0);
    }

    drawLevelObjects(){
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.level.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.collectableBottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableBottles);
    }

    drawBackgroundObjects(){
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    drawStatusBars(){
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
    }

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

    setWorld(){
        this.character.world = this;
        this.statusBarCoin.world = this;
        this.statusBarBottle.world = this;
        this.level.endboss.world = this;
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

    isGameOver(){
        return this.character.isDead() && this.character.y > this.canvas.height;
    }

    isGameWon(){
        return this.level.endboss.isDead() && this.level.endboss.dead_animation_completed;
    }
}