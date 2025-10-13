class ThrowableBottle extends MovableObject{

    splash_sound = new Audio('audio/splash_bottle.mp3');
    throw_sound = new Audio('audio/throw_bottle.mp3');
    splash = false;
    splashed = false;
  

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

    throw(){
        this.speedY = 10;
        this.applyGravity();
        if (isSoundActivated()) {
            this.throw_sound.play();
        }
        setInterval(() => {
            if (this.isAboveGround()){
                this.x +=5;
            }
            else{
                this.speedY = 0;
            }
        }, 10)
    }

    removeFromWorld(){
        setTimeout(() => {
            this.x = -1000;
            this.y = -1000;
        }, 100);
    }

    is_splashing(){
        if (this.img.src.includes("bottle_splash/6_bottle_splash.png")){
            this.splashed = true;
            return false;
        }
        if (this.isAboveGround()){
            return this.splash;
        }
        return true;
    }

    animate(){
        this.splash_sound.pause();
        setInterval(() =>{
            if (!this.splashed  && this.is_splashing()) {
                this.playAnimation(this.SPLASH_IMAGES);
                if (isSoundActivated()) {
                    this.splash_sound.play().catch(e => console.log("Splash sound failed:", e));
                }
            } else if (this.isAboveGround()) {
                this.playAnimation(this.ROTATE_IMAGES);
            } else {
                this.removeFromWorld();
            }
        }, 100);
    }
}

class CollectableBottle extends DrawableObject{
    width = 60;
    height = 50;

    constructor(){
        super().loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.x = 200 + Math.floor(Math.random() * 1400);
        this.y = 100 + Math.floor(Math.random() * 300);
    }

    collect(){
        if (isSoundActivated()) {
            let collect_sound = new Audio('audio/collect_bottle.mp3');
            collect_sound.play();
        }
    }
}

class OnGroundBottle extends CollectableBottle{
    constructor(img){
        super().loadImage(img);
        this.x = 200 + Math.floor(Math.random() * 1400);
        this.y = 380;
    }
}