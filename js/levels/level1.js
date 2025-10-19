let level1;

function initLevel() {
    level1 =new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken()
    ],
    [
        new Endboss()
    ],
    [
        new Cloud(),
        new Cloud()
    ],
    [
        new BackgroundObject('../img/5_background/layers/air.png', -719),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('../img/5_background/layers/air.png', 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('../img/5_background/layers/air.png', 719),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('../img/5_background/layers/air.png', 2 * 719),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 2 * 719),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 2 * 719),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 2 * 719),

        new BackgroundObject('../img/5_background/layers/air.png', 3 * 719),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 3 * 719),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 3 * 719),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 3 * 719),

        new BackgroundObject('../img/5_background/layers/air.png', 4 * 719),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 4 * 719),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 4 * 719),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 4 * 719)
    ],
    [
        new CollectableBottle('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 380),
        new CollectableBottle('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 380),
        new CollectableBottle('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 380),
        new CollectableBottle('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 380),
        new CollectableBottle('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 380),
        new CollectableBottle('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 380),
        new CollectableBottle('../img/6_salsa_bottle/salsa_bottle.png'),
        new CollectableBottle('../img/6_salsa_bottle/salsa_bottle.png'),
        new CollectableBottle('../img/6_salsa_bottle/salsa_bottle.png')
    ],
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ],
);
}