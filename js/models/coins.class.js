class Coin extends DrawableObject{

    width = 50;
    height = 50;
    collectedSound = new Audio('audio/collect_coin.mp3');
    isCollected = false;

    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.x = this.getWeightedRandomPosition();
        this.y = 100 + Math.floor(Math.random() * 300);
    }

    /**
     * Plays the sound effect for collecting a coin.
     * This function sets the volume of the collect sound and then plays it.
     * @returns {void}
     */
    collect(){
        this.isCollected = true;
        this.collectedSound.volume = 0.1;
        this.playSound(this.collectedSound);
        this.removeFromWorld(50);
    }
}