class Chicken extends MovableObject{

    IMAGES_WALKING_CHICKEN = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_WALKING_CHICK = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    life = 5;
    range = 4 * 719 - 200;
    size = 'normal';
    speed = 0.15 + Math.random() * 0.25;
    y = 350;
    width = 80;
    height = 80;
    deadImage;

    constructor(size = 'normal'){
        let imagePath = `img/3_enemies_chicken/chicken_${size}/1_walk/1_w.png`;
        super().loadImage(imagePath);
        this.size = size;
        this.loadImages(this.IMAGES_WALKING_CHICKEN);
        this.loadImages(this.IMAGES_WALKING_CHICK);
        this.deadImage = `img/3_enemies_chicken/chicken_${size}/2_dead/dead.png`;
        this.walkingImages = size === 'normal' ? this.IMAGES_WALKING_CHICKEN : this.IMAGES_WALKING_CHICK;
        if(size === 'small'){
            this.speed = 0.1 + Math.random() * 0.2;
            this.y = 380;
            this.width = 60;
            this.height = 50;
        }
        
        this.x = this.getWeightedRandomPosition();
        this.animate();
        this.offset = {
            top: 20,
            left: 10,
            right: 10,
            bottom: 20
        };
    }

    /**
     * Initializes the animation loops for the chicken.
     * This includes both the movement (action) and image animations.
     * @returns {void}
     */
    animate(){
        this.actionAnimation();
        this.imageAnimation();
    }

    /**
     * Sets an interval to animate the chicken's images.
     * If the chicken is dead, it displays the dead chicken image.
     * Otherwise, it plays the walking animation.
     * @returns {void}
     */
    imageAnimation(){
        setStoppableInterval(() => {
            if(this.isDead()){
                this.loadImage(this.deadImage); 
            } else {
                this.playAnimation(this.walkingImages);
            }
        }, 100);
    }

    /**
     * Sets an interval for the chicken's actions.
     * If the chicken is alive, it continuously moves to the left.
     * If the chicken is dead, it is removed from the world.
     * @returns {void}
     */
    actionAnimation(){
        setStoppableInterval( () => {
            if(!this.isDead()){
                this.moveLeft();
            } else {
                this.removeFromWorld();
            }
        }, 1000/60);
    }
}

