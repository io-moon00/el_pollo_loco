class Character extends MovableObject{

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png'
    ]

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    y = 80;
    height= 250;
    width = 150;
    speed = 4;
    collectedBottles = 0;
    collectedCoins = 0;
    lastMove;
    world;

    hurtSound = new Audio('audio/hurt.mp3');
    walkingSound = new Audio('audio/running.mp3');
    snoreSound = new Audio('audio/snore_sound.mp3');
    startSlowdownThreshold = 850;
    currentDirection = "right";
    previousDirection = "right";

    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
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
        
        this.targetCameraOffset = 100;
        this.currentCameraOffset = 100;
        this.cameraTransitionSpeed = 2;
    }

    /**
     * Starts the character's movement and image animations.
     * @returns {void}
     */
    animate(){
        if (!this.animationStarted) {
            this.moveAnimation();
            this.animateImages();
            this.animationStarted = true;
        }
    }

    /**
     * Simulates the character falling down and forward after dying.
     * @returns {void}
     */
    fallDown(){
        this.y += 30;
        this.x += 30;
    }

    /**
     * Checks if the character should move to the right.
     * This is true if the right arrow key or 'D' key is pressed and the character has not reached the end of the level.
     * @returns {boolean} - True if the character should move right, false otherwise.
     */
    shouldMoveRight(){
        let rightEdge = this.world.level.levelEndX;
        return (this.world.keyboard.RIGHT || this.world.keyboard.D) && this.x < rightEdge - this.width;
    }

    /**
     * Checks if the character should move to the left.
     * This is true if the left arrow key or 'A' key is pressed and the character has not reached the left boundary of the level.
     * @returns {boolean} - True if the character should move left, false otherwise.
     */
    shouldWalkLeft(){
        return (this.world.keyboard.LEFT || this.world.keyboard.A) && this.x > -200;
    }

    /**
     * Checks if the character should perform a jump.
     * This is true if the space, up arrow, or 'W' key is pressed and the character is not currently in the air.
     * @returns {boolean} - True if the jump conditions are met, false otherwise.
     */
    shouldJump(){
        return (this.world.keyboard.SPACE || this.world.keyboard.UP || this.world.keyboard.W) && !this.isAboveGround();
    }

    /**
     * Handles the character's rightward movement.
     * Sets the direction, plays the walking sound, and updates the last move timestamp.
     * @returns {void}
     */
    walkRight(){
        this.moveRight();
        this.otherDirection = false;
        this.walkingSound.volume = 1;
        this.playSound(this.walkingSound);
        this.setLastMove();
        this.currentDirection = 'right';
    }

    /**
     * Handles the character's leftward movement.
     * Sets the direction, plays the walking sound, and updates the last move timestamp.
     * @returns {void}
     */
    walkLeft(){
        this.moveLeft();
        this.otherDirection = true;
        this.walkingSound.volume = 1;
        this.playSound(this.walkingSound);
        this.setLastMove();
        this.currentDirection = 'left';
    }

    /**
     * Manages the character's speed and camera movement as they approach the end of the level.
     * @returns {void}
     */
    levelEndSpeedControl(){
        let distance_to_end = this.world.level.levelEndX - (this.x + this.width - 3);
        let cameraSpeed = (1 - (distance_to_end / (this.startSlowdownThreshold - this.width))) * 400;
        this.slowDownCharacter(distance_to_end);
        this.updateCameraOffset(0.009);
        this.world.cameraX = Math.round(-this.x + this.currentCameraOffset + cameraSpeed);
    }

    /**
     * Gradually reduces the character's speed as they approach the end of the level.
     * The speed is calculated based on the remaining distance, ensuring a smooth slowdown.
     * @param {number} distance_to_end - The remaining distance to the end of the level.
     * @returns {void}
     */
    slowDownCharacter(distance_to_end){ 
        let factor = distance_to_end / (this.startSlowdownThreshold - this.width);
        let speedMultiplier = 0.75 + (factor * 0.25);
        this.speed = 4 * speedMultiplier;
        this.speed = Math.max(3, Math.min(4, this.speed));
    }

    /**
     * Smoothly updates the camera's horizontal offset based on the character's direction.

     * @param {number} [speedFactor=0.02] - The speed at which the camera transitions to the new offset. A higher value results in a faster transition.
     * @returns {void}
     */
    updateCameraOffset(speedFactor = 0.02) {
        if (this.currentDirection === 'left') {
            this.targetCameraOffset = this.world.canvas.width - 250;
        } else if (this.currentDirection === 'right') {
            this.targetCameraOffset = 100;
        }
        let offsetDifference = this.targetCameraOffset - this.currentCameraOffset;
        if (Math.abs(offsetDifference) > 1) {
            this.currentCameraOffset += offsetDifference * speedFactor;
        } else {
            this.currentCameraOffset = this.targetCameraOffset;
        }
    }

    /**
     * Controls the camera's horizontal position by updating its offset and recalculating its position relative to the character.
     * This creates a smooth transition when the character changes direction.
     * @returns {void}
     */
    directionChangSpeedControl() {
        this.updateCameraOffset();
        this.world.cameraX = Math.round(-this.x + this.currentCameraOffset);
    }


    /**
     * Updates the camera's horizontal position to follow the character.
     * If the character is within the level boundaries, the camera moves with them.
     * Once the character reaches the end of the level, his speed is reduced.
     * @returns {void}
     */
    updateCameraPosition(){
        this.updateDirectionChanged();
        if (this.x < this.world.level.levelEndX - this.startSlowdownThreshold) {
            this.directionChangSpeedControl();
        } else {
            this.levelEndSpeedControl();
        }
    }

     /**
     * Updates the character's previous direction to match the current direction.
     * @returns {void}
     */
    updateDirectionChanged() {
        if (this.currentDirection === this.previousDirection) {
            return false;
        } else { 
            this.previousDirection = this.currentDirection;
            return true;
        }
    }

    /**
     * Sets up a recurring interval to handle the character's movement based on keyboard input.
     * It checks for movement and jump conditions and updates the character's position and camera accordingly.
     * @returns {void}
     */
    moveAnimation(){
        setStoppableInterval(() => {
            this.walkingSound.pause();
            if (this.isDead()) return;
            if (this.shouldMoveRight()) {
                this.walkRight();
            } else if (this.shouldWalkLeft()) {
                this.walkLeft();
            }
            if (this.shouldJump()) {
                this.jump();
                this.setLastMove();
            }
            this.updateCameraPosition();
        }, 1000/60);
    }

    /**
     * Sets up a recurring interval to manage the character's image animations based on its current state.
     * It checks for conditions such as being dead, in the air, hurt, walking, or idle, and plays the corresponding animation.
     * @returns {void}
     */
    animateImages(){
        setStoppableInterval(() => {
            this.hurtSound.pause();
            this.snoreSound.pause();
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
                this.fallDown();
            } else if(this.isAboveGround()){
                this.playJumpingAnimation();
            } else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
                this.playSound(this.hurtSound);
            } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.D || this.world.keyboard.A){
                this.playAnimation(this.IMAGES_WALKING);
            } else if(this.isLongIdle()){
                this.playAnimation(this.IMAGES_IDLE_LONG)
                this.playSound(this.snoreSound);
            } else{
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 100);
    }

    /**
     * Plays the jumping animation, filtering out takeoff and landing frames when high above ground.
     * @returns {void}
     */
    playJumpingAnimation() {
        const groundOffset = 50; // Adjust this value to define "high above ground"
        const distanceFromGround = this.y - (480 - this.height); // Assuming 480 is ground level
        
        if (Math.abs(distanceFromGround) > groundOffset) {
            // Character is high above ground, use only middle frames (skip first 2 and last 1)
            const midAirFrames = this.IMAGES_JUMPING.slice(2, -1);
            this.playAnimation(midAirFrames);
        } else {
            // Character is close to ground, use all frames
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    /**
     * Checks if the character has been idle for a long period.
     * Calculates the time elapsed since the last recorded movement.
     * @returns {boolean} - True if the idle time is greater than 4 seconds, otherwise false.
     */
    isLongIdle() {
        let idleTime = new Date().getTime() - this.lastMove;
        idleTime = idleTime / 1000;
        return idleTime > 4;
    }

    /**
     * Updates the timestamp of the character's last recorded movement.
     * This is used to determine if the character has been idle for a long time.
     * @returns {void}
     */
    setLastMove() {
        this.lastMove = new Date().getTime();
    }

    /**
     * Checks if the character is currently falling down.
     * This is determined by checking if the vertical speed is negative (indicating downward movement)
     * and if the character is above the ground.
     * @returns {boolean} - True if the character is falling, false otherwise.
     */
    isFlyingDown() {
        if (this.speedY < 0 && this.isAboveGround()){
            return true;
        }
        return false;
    }
}