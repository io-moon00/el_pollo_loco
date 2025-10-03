class StatusBarHealth extends DrawableObject{

    percentage;

    IMAGES = [
        '../img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    constructor(){
        super();
        super.loadImages(this.IMAGES)
        this.x = 20;
        this.y = 20;
        this.width = 140;
        this.height = 40;
        this.setPercentage(100);
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        } else if(this.percentage > 79){
             return 4;
        } else if(this.percentage > 59){
             return 3;
        } else if(this.percentage > 39){
            return 2;
        } else if(this.percentage > 19){
            return 1;
        } else{
            return 0;
        }
    }

}

class StatusBarCoin extends DrawableObject {
    IMAGE_COIN = [
        '../img/7_statusbars/3_icons/icon_coin.png'
    ];

    world;

    constructor() {
        super();
        this.loadImage(this.IMAGE_COIN);
        this.x = 20;
        this.y = 60;
        this.width = 40;
        this.height = 40;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.font = '32px zabars';
        ctx.fillStyle = 'black';
        ctx.fillText(this.world.character.collectedCoins, this.x + this.width, this.y + 32);
    }
}


class StatusBarBottle extends DrawableObject {
    IMAGE_COIN = [
        '../img/7_statusbars/3_icons/icon_salsa_bottle.png'
    ];

    world;

    constructor() {
        super();
        this.loadImage(this.IMAGE_COIN);
        this.x = 20;
        this.y = 100;
        this.width = 40;
        this.height = 40;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.font = '32px zabars';
        ctx.fillStyle = 'black';
        ctx.fillText(this.world.character.collectedBottles, this.x + this.width, this.y + 32);
    }
}
