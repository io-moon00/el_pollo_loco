class Level{
    enemies;
    clouds;
    backgroundObjects;
    collectableBottles;
    coins;
    level_end_x = 1500;

    constructor(enemies, clouds, backgroundObjects, collectableBottles, coins){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableBottles = collectableBottles;
        this.coins = coins;
    }
}