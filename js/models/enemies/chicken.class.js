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
        this.x = 200 + Math.floor(Math.random() * 1600);
        this.speed = 0.15 + Math.random() * 0.25;
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
                this.loadImage('../img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
            } else {
                this.playAnimation(this.IMAGES_WALKING);
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

