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
   

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;  
        this.setWorld();
        this.run();
        this.draw();
    };


    run(){
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000/60);
    }

    
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

    checkCoinCollision(){
        this.level.coins.forEach((coin, index) => {
            if(this.character.isColliding(coin)){
                coin.collect();
                this.character.collectedCoins += 1;
                this.level.coins.splice(index, 1);
            }
        })
    }

    checkBottleCollision(){
        this.level.collectableBottles.forEach((bottle, index) => {
            if(this.character.isColliding(bottle)){
                bottle.collect();
                this.character.collectedBottles += 1;
                this.level.collectableBottles.splice(index, 1);
            } 
        })
    }

    checkCollisionsBottleEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.throwableBottles.forEach((bottle) => {
                if (enemy.isColliding(bottle)) {
                    bottle.splash = true;
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
            let bottle = new ThrowableBottle(this.character.x+100, this.character.y+100);
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
            self.draw();
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
        if(mo instanceof MovableObject){
            mo.drawFrame(this.ctx);
        }
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
        return this.character.isDead() || this.level.enemies.find(e => e instanceof Endboss).isDead();
    }
}