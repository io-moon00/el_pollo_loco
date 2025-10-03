class Chicken extends MovableObject{

    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    y = 350;
    width = 80;
    height = 80;
    life = 100;

    constructor(){
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.floor(Math.random() * 1100);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.offset = {
            top: 20,
            left: 10,
            right: 10,
            bottom: 20
        };
    }

        animate(){
            setInterval( () => {
                if(!this.isDead()){
                    this.moveLeft();
                }
            }, 1000/60);
            
            setInterval(() => {
                if(this.isDead()){
                    this.loadImage('../img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
                }else{
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }, 100)
    }

}


class Endboss extends MovableObject {


    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
    ]  

    IMAGES_ALERT = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'        
    ]

    IMAGES_ATTACK = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'        
    ]
    
    IMAGES_HURT = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DEAD = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png'
    ]


    y = 100;
    width = 350;
    height = 350;
    life = 20;

    constructor(){
        super().loadImage(this.IMAGES_WALKING[3]);
        this.loadImages(this.IMAGES_WALKING);  
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1800;
        this.offset = {
            top: 50,
            left: 50,
            right: 50,
            bottom: 50
        };
        this.animate();
    }

    isAlert(){
        return this.life ==15;
    }

    animate(){
        setInterval(() => {
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
            } else if(this.isHurt()){
                this.playAnimation(this.IMAGES_ALERT);
            } else if(this.isAlert()){
                this.playAnimation(this.IMAGES_HURT);
            } else{
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
}
