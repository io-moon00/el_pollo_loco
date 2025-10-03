class ThrowableBottle extends MovableObject{

    splash = false;

    SPLASH_IMAGES = [
        
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    ROTATE_IMAGES = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
        super.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.ROTATE_IMAGES);
        this.loadImages(this.SPLASH_IMAGES);
        this.height= 60;
        this.width = 50;
        this.throw(100, 200);
        this.animate();
    }

    throw_sound = new Audio('audio/throw_bottle.mp3')

    throw(){
        this.speedY = 10;
        this.applyGravity();
        this.throw_sound.play();
        setInterval(() => {
            if (this.isAboveGround() && !this.splash){
                this.x +=5;
            }
            else{
                this.splash = true;
                this.speedY = 0;
            }
        }, 10)
    }

    animate(){
        setInterval(() =>{
            if(this.splash){
                this.playAnimation(this.SPLASH_IMAGES);
            }
            else{
                this.playAnimation(this.ROTATE_IMAGES);
            }

        }, 100)
       
    }

}

class CollectableBottle extends DrawableObject{
    width = 60;
    height = 50;

    constructor(){
        super().loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.x = 200 + Math.floor(Math.random() * 1100);
        this.y = 100 + Math.floor(Math.random() * 300);
    }
}

class OnGroundBottle extends CollectableBottle{
    constructor(img){
        super().loadImage(img);
        this.x = 200 + Math.floor(Math.random() * 1100);
        this.y = 380;
    }
}