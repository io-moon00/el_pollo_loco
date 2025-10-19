class Coin extends DrawableObject{

    width = 50;
    height = 50;
    collect_sound = new Audio('audio/collect_coin.mp3');
    is_collected = false;

    constructor(){
        super().loadImage('../img/8_coin/coin_1.png');
        this.x = this.getWeightedRandomPosition();
        this.y = 100 + Math.floor(Math.random() * 300);
    }

    /**
     * Plays the sound effect for collecting a coin.
     * This function sets the volume of the collect sound and then plays it.
     * @returns {void}
     */
    collect(){
        this.is_collected = true;
        this.collect_sound.volume = 0.1;
        this.playSound(this.collect_sound);
        this.removeFromWorld(50);
        setTimeout(() => {
            this.collect_sound.pause();
        }, 200);
    }
}