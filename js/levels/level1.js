let level1;

function initLevel() {
    console.log('Initializing level 1');
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
        new Chicken(),
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
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 3 * 719),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 3 * 719),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 3 * 719)
    ],
    [
        new OnGroundBottle('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new OnGroundBottle('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new OnGroundBottle('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new OnGroundBottle('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new CollectableBottle(),
        new CollectableBottle(),
        new CollectableBottle()
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