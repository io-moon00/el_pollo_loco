class ThrowableBottle extends MovableObject{
    splashSound = new Audio('audio/splash_bottle.mp3');
    throw_sound = new Audio('audio/throw_bottle.mp3');
    splash = false;
    splashed = false;
    otherDirection = false;
    height = 60;
    width = 50

    SPLASH_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    ROTATE_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y, otherDirection){
        super();
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.animationState = 'rotating'; // 'rotating', 'splashing', 'finished'
        this.splashAnimationIndex = 0;
        super.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.ROTATE_IMAGES);
        this.loadImages(this.SPLASH_IMAGES);
        this.throw(100, 200);
        this.animate();
    }

    /**
     * Initiates the throwing animation and physics for the bottle.
     * Sets the initial vertical speed, applies gravity, plays a throwing sound,
     * and starts an interval for horizontal movement.
     * @returns {void}
     */
    throw(){
        this.speedY = 10;
        this.applyGravity();
        this.playSound(this.throw_sound);
        setStoppableInterval(() => {
           this.handleHorizontalMovement();
        }, 10)
    }

    /**
     * Handles the horizontal movement of the bottle while it is in the air.
     * Moves the bottle to the left or right depending on the 'otherDirection' property.
     * Stops vertical movement by setting speedY to 0 once the bottle is no longer above ground.
     * @returns {void}
     */
    handleHorizontalMovement(){
        if (this.isAboveGround() && this.otherDirection){
            this.x -= 5;
        } else if (this.isAboveGround() && !this.otherDirection){
            this.x += 5;
        } else {
            this.speedY = 0;
        }
    }

    /**
     * Initiates the splashing animation sequence for the bottle.
     * Sets the animation state to 'splashing', resets the splash animation index,
     * and plays the splash sound. The sound is stopped after 1 second.
     * @returns {void}
     */
    startSplashing(){
        this.animationState = 'splashing';
        this.splashAnimationIndex = 0;
        this.playSound(this.splashSound);
        setTimeout(() => {
            this.splashSound.pause();
        }, 300);
    }

    /**
     * Manages the animation lifecycle of the throwable bottle.
     * Sets an interval to continuously check the bottle's animation state ('rotating', 'splashing', 'finished')
     * and calls the corresponding animation method or removes the bottle from the game world.
     * @returns {void}
     */
    animate(){
        setStoppableInterval(() => {
            switch(this.animationState) {
                case 'rotating':
                    this.rotatingAnimation();
                    break;
                case 'splashing':
                    this.splashingAnimation();
                    break;
                case 'finished':
                    this.removeFromWorld(100);
                    break;
            }
        }, 50);
    }

    /**
     * Manages the rotating animation of the bottle.
     * If the bottle is above the ground, it plays the rotation animation.
     * Otherwise, it initiates the splashing animation.
     * @returns {void}
     */
    rotatingAnimation(){
        this.splashSound.pause();
        if (this.isAboveGround()) {
            this.playAnimation(this.ROTATE_IMAGES);
        } else {
            this.startSplashing();
        }          
    }

    /**
     * Manages the splashing animation of the bottle.
     * It iterates through the SPLASH_IMAGES array to display the splash effect frame by frame.
     * Once all splash images have been displayed, it sets the animation state to 'finished'.
     * @returns {void}
     */
    splashingAnimation(){
        if (this.splashAnimationIndex < this.SPLASH_IMAGES.length) {
            this.img = this.imageCache[this.SPLASH_IMAGES[this.splashAnimationIndex]];
            this.splashAnimationIndex++;
        } else {
            this.animationState = 'finished';
        }
    }
}


class CollectableBottle extends DrawableObject{
    width = 60;
    height = 50;
    collectedSound = new Audio('audio/collect_bottle.mp3');
    isCollected = false;

    constructor(img, y = undefined){
        super().loadImage(img);
        this.x = this.getWeightedRandomPosition();
        this.y = y !== undefined ? y : 100 + Math.floor(Math.random() * 300);
    }


    /**
     * Handles the collection of the bottle.
     * Plays a collection sound and removes the bottle from the game world after a short delay.
     * @returns {void}
     */
    collect(){
        this.isCollected = true;
        this.playSound(this.collectedSound);
        this.removeFromWorld(50);
    }
}