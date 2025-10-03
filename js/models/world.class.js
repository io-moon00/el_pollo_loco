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
    throwableBottels=[];
   

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
        }, 200)
    }

    
    checkCollisions(){
        this.checkEnemyCollision();
        this.checkCoinCollision();
        this.checkBottleCollision();
        this.checkCollisionsBottleEnemy();
    }

    checkEnemyCollision(){
        this.level.enemies.forEach( (enemy, index) => {
            if(this.character.isColliding(enemy) && !enemy.isDead()){
                console.log(this.character.isFlyingDown());
                if(this.character.y + this.character.height > enemy.y && this.character.isFlyingDown()){
                    enemy.life = 0;
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1)
                    }, 600);
                }else{
                    this.character.hit();
                }
            }
        })
    }

    checkCoinCollision(){
        this.level.coins.forEach( (coin, index) => {
            if(this.character.isColliding(coin)){
                coin.collect();
                this.character.collectedCoins += 1;
                this.level.coins.splice(index, 1);
            }
        })
    }

    checkBottleCollision(){
        this.level.collectableBottles.forEach( (bottle, index) => {
            if(this.character.isColliding(bottle)){
                this.character.collectedBottles += 1;
                this.level.collectableBottles.splice(index, 1);

            }
        })
    }

    checkCollisionsBottleEnemy() {
        this.level.enemies.forEach((enemy, indexEnemy) => {
            this.throwableBottels.forEach((bottle, indexBottle) => {
                if (enemy.isColliding(bottle)) {
                    if(enemy instanceof Endboss){
                        this.EndbossBottleCollision(enemy, indexBottle);
                    }else{    
                        this.ChickenBottleCollision(enemy, indexEnemy, indexBottle);
                    }
                    bottle.splash = true;     
                }
            });
        });
    }

    ChickenBottleCollision(enemy, indexEnemy, indexBottle){
        enemy.life = 0;
        setTimeout(() => {
            this.throwableBottels.splice(indexBottle, 1);
            this.level.enemies.splice(indexEnemy, 1);
        }, 600);
    }

    EndbossBottleCollision(enemy, indexBottle){
        enemy.hit();
        this.throwableBottels.splice(indexBottle, 1);
    }
    
    checkThrowObjects(){
        if(this.keyboard.D){
            if (this.character.collectedBottles > 0){
                let bottle = new ThrowableBottle(this.character.x+100, this.character.y+100);
                this.throwableBottels.push(bottle);
                this.character.collectedBottles -= 1;
                this.character.setLastMove();
            }
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
        this.addObjectsToMap(this.throwableBottels);
        
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

}
