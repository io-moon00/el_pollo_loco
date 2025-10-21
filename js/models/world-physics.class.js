class WorldPhysics {
    
    constructor(world) {
        this.world = world;
    }

    /**
     * Manages all collision checks within the game world.
     * It calls specific methods to handle each type of collision.
     * @returns {void}
     */
    checkCollisions(){
        this.checkEnemyCollision();
        this.checkCoinCollision();
        this.checkBottleCollision();
        this.checkCollisionsBottleEnemy();
        this.checkEndbossCollision();
        this.checkCollisionsBottleEndboss();
    }

    /**
     * Checks if the character is colliding with a specific chicken enemy that is still alive.
     * @param {MovableObject} enemy - The enemy object (expected to be a Chicken) to check for collision against the character.
     * @returns {boolean} - Returns `true` if the character is colliding with the given enemy, the enemy is an instance of Chicken, and the enemy is not dead. Otherwise, returns `false`.
     */
    isCollidingWithChicken(enemy){
        return this.world.character.isColliding(enemy) && !enemy.isDead();
    }

    /**
     * Checks if the character is colliding with the Endboss enemy.
     * @param {MovableObject} enemy - The enemy object to check for collision against the character. Expected to be an Endboss.
     * @returns {boolean} - Returns `true` if the character is colliding with the Endboss and the Endboss is alive. Otherwise, returns `false`.
     */
    isCollidingWithEndboss(){
        return this.world.character.isColliding(this.world.level.endboss) && !this.world.level.endboss.isDead();
    }

    /**
     * Checks for and handles collisions between the character and enemies.
     * This method iterates through all enemies in the level. It handles two main scenarios:
     * 1. If the character is jumping down on a chicken, the chicken is defeated.
     * 2. If the character collides with a chicken or the endboss under normal circumstances (not jumping on them),
     *    the character takes damage, and the health status bar is updated.
     * @returns {void}
     */
    checkEnemyCollision(){
        this.world.level.enemies.forEach((enemy) => {
            const collidingWithChicken = this.isCollidingWithChicken(enemy);
            if (collidingWithChicken && this.world.character.isFlyingDown()){
                enemy.life = 0;
            } else if (collidingWithChicken && !this.world.character.isHurt()){
                this.world.character.hit();
                this.world.statusBarHealth.setPercentage(this.world.character.life);
            }
        });
    }

    /**
     * Checks for and handles collisions between the character and the endboss.
     * If the character collides with the endboss and is not currently in a hurt state,
     * the character takes damage, and the health status bar is updated to reflect the new health percentage.
     * @returns {void}
     */
    checkEndbossCollision(){
        if (this.isCollidingWithEndboss() && !this.world.character.isHurt()){
            this.world.character.hit();
            this.world.statusBarHealth.setPercentage(this.world.character.life);
        }
    }

    /**
     * Checks for collisions between the character and coins.
     * Iterates through all coins in the level. If the character is colliding with a coin,
     * the coin is marked as collected and the character's collected coin count is incremented.
     * @returns {void}
     */
    checkCoinCollision(){
        this.world.level.coins.forEach((coin) => {
            if(this.world.character.isColliding(coin) && !coin.isCollected){
                coin.collect();
                this.world.character.collectedCoins += 1;
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
        this.world.level.collectableBottles.forEach((bottle) => {
            if(this.world.character.isColliding(bottle) && !bottle.isCollected){
                bottle.collect();
                this.world.character.collectedBottles += 1;
            } 
        })
    }

    /**
     * Checks for and handles collisions between thrown bottles and enemies.
     * This method iterates through all active throwable bottles and all enemies in the level.
     * If a collision is detected between a bottle and an enemy, the bottle is set to its splashing state,
     * the enemy's `hit()` method is called to register damage, and the loop for that enemy is broken
     * to ensure one bottle hits only one enemy per check.
     * @returns {void}
     */
    checkCollisionsBottleEnemy() {
        if (this.world.throwableBottles.length === 0) return;
        this.world.level.enemies.forEach((enemy) => {
            for (let i = 0; i < this.world.throwableBottles.length; i++) {
                const bottle = this.world.throwableBottles[i];
                if (enemy.isColliding(bottle)) {
                    bottle.startSplashing();
                    enemy.hit();
                    break;
                }
            }
        });
    }

    /**
     * Checks for and handles collisions between thrown bottles and the endboss.
     * It iterates through all active throwable bottles. If a bottle collides with the endboss
     * and the endboss is not currently in a hurt state, the bottle starts its splashing animation,
     * the endboss takes damage, and the loop is broken to prevent one bottle from hitting
     * the endboss multiple times in a single check.
     * @returns {void}
     */
    checkCollisionsBottleEndboss() {
        if (this.world.throwableBottles.length === 0) return;
        for (let i = 0; i < this.world.throwableBottles.length; i++) {
            const bottle = this.world.throwableBottles[i];
            if (this.world.level.endboss.isColliding(bottle) && !this.world.level.endboss.isHurt()) {
                bottle.startSplashing();
                this.world.level.endboss.hit();
                this.world.statusBarEndboss.setPercentage(this.world.level.endboss.life);
                break;
            }
        }
    }
}