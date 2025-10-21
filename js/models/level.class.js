class Level{
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    collectableBottles;
    coins;
    levelEndX;

    constructor(enemies, endboss, clouds, backgroundObjects, collectableBottles, coins){
        this.enemies = enemies;
        this.endboss = endboss[0];
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableBottles = collectableBottles;
        this.coins = coins;
        this.setLevelEndX();
    }

    /**
     * Calculates and sets the x-coordinate for the end of the level.
     * The calculation is based on the total number of background objects.
     * The value 719 corresponds to the width of a background object.
     */
    setLevelEndX(){
        this.levelEndX = (this.backgroundObjects.length / 4 - 2) * 719
    }
}