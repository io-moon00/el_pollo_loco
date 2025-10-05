class Character extends MovableObject{

    y = 80;
    height= 250;
    width = 150;
    speed = 4;

    collectedBottles = 0;
    collectedCoins = 0;

    lastMove;

    hurt_sound = new Audio('audio/hurt.mp3');

    IMAGES_IDLE = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png'
    ]

    IMAGES_IDLE_LONG = [
        '../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png'
    ]

    world;
    walking_sound = new Audio('audio/running.mp3');


    constructor(){
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.setLastMove();
        this.animate();
        this.offset = {
            top: 100,
            left: 30,
            right: 40,
            bottom: 10
        };

    }

    animate(){   
        setInterval(() => {
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play().catch(e => console.log("Walking sound failed:", e));
                this.setLastMove();
            }

            if(this.world.keyboard.LEFT && this.x > -600){
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play().catch(e => console.log("Walking sound failed:", e));
                this.setLastMove();
            }

            if((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround()){
                this.jump();
                this.setLastMove();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000/60);

        setInterval(() => {
            this.hurt_sound.pause();
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(stopGame(), 1000);
            } else if(this.isAboveGround()){
                this.playAnimation(this.IMAGES_JUMPING);
            } else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
                this.hurt_sound.play().catch(e => console.log("Hurt sound failed:", e));
            } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                this.playAnimation(this.IMAGES_WALKING);
            } else if(this.isLongIdle()){
                this.playAnimation(this.IMAGES_IDLE_LONG)
            } else{
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 100);
    }

    isLongIdle() {
        let idleTime = new Date().getTime() - this.lastMove;
        idleTime = idleTime / 1000;
        return idleTime > 4;
    }

    setLastMove() {
        this.lastMove = new Date().getTime();
    }

    isFlyingDown() {
        console.log("check flying down");
        console.log(this.speedY, this.isAboveGround());
        if (this.speedY < 0 && this.isAboveGround()){
            console.log("Flying down");
            return true;
        }
        return false;
    }
}