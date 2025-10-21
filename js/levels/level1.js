let level1;
let numberOfChickens = 15;
let numberOfSmallChickens = 6;
let numberOfBottlesOnGround = 9;
let numberOfBottlesOnAir = 5;
let numberOfCoins = 20;

function initLevel() {

    level1 = new Level(
        createEnemies(),
        [
            new Endboss()
        ],
        [
            new Cloud(),
            new Cloud()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 2 * 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2 * 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2 * 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2 * 719),

            new BackgroundObject('img/5_background/layers/air.png', 3 * 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 3 * 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 3 * 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 3 * 719),

            new BackgroundObject('img/5_background/layers/air.png', 4 * 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 4 * 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 4 * 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 4 * 719)
        ],
        createBottles(),
        createCoins()
    );
}

/**
 * Creates and returns an array of enemy objects for the level.
 * It generates a specific number of normal and small chickens based on predefined variables.
 * @returns {Chicken[]} An array of Chicken instances.
 */
function createEnemies() {
    enemies = [];
    for (let i = 0; i < numberOfChickens; i++) {
        enemies.push(new Chicken('normal'));
    }
    for (let i = 0; i < numberOfSmallChickens; i++) {
        enemies.push(new Chicken('small'));
    }
    return enemies;
}

/**
 * Creates and returns an array of collectable coin objects for the level.
 * It generates a specific number of coins based on the predefined `numberOfCoins` variable.
 * @returns {Coin[]} An array of Coin instances.
 */
function createCoins() {
    coins = [];
    for (let i = 0; i < numberOfCoins; i++) {
        coins.push(new Coin());
    }
    return coins;
}


/**
 * Creates and returns an array of collectable bottle objects for the level.
 * It generates a specific number of bottles on the ground and in the air based on predefined variables.
 * @returns {CollectableBottle[]} An array of CollectableBottle instances.
 */
function createBottles() {
    bottles = [];
    for (let i = 0; i < numberOfBottlesOnGround; i++) {
        bottles.push(new CollectableBottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 380));
    }
    for (let i = 0; i < numberOfBottlesOnAir; i++) {
        bottles.push(new CollectableBottle('img/6_salsa_bottle/salsa_bottle.png'));
    }
    return bottles;
}
