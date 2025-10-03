class Coin extends DrawableObject{

    width = 50;
    height = 50;

    constructor(){
        super().loadImage('../img/8_coin/coin_1.png');
        this.x = 200 + Math.floor(Math.random() * 1100);
        this.y = 100 + Math.floor(Math.random() * 300);
    }

    collect_sound = new Audio('audio/collect_coin.mp3');

    collect(){
        this.collect_sound.play();
    }
}