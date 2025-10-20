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
    x = 5 * 719;
    width = 350;
    height = 350;
    life = 20;
    speed = 1;
    first_contact = false;
    is_alert = false;
    world;
    attacking_sound = new Audio('audio/boss_attack.mp3');
    hurt_sound = new Audio('audio/boss_hurt.mp3');
    deadAnimationCompleted = false;
    dead_images_index = 0;

    constructor(){
        super().loadImage(this.IMAGES_WALKING[3]);
        this.loadImages(this.IMAGES_WALKING);  
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.offset = {
            top: 50,
            left: 50,
            right: 50,
            bottom: 50
        };
        this.animate();
    }

    /**
     * Checks if the character is within a certain range of the end boss.
     * This is used to trigger the boss's initial alert and subsequent actions.
     * @returns {boolean} - True if the character is within the defined range, otherwise false.
     */
    characterIsInRange() {
        return this.x - (this.world.character.x + this.world.character.width) < 350;
    }

    /**
     * Checks if the end boss is in an attacking state.
     * The boss is considered to be attacking if the character has made first contact
     * and is within the attack range (not behind or too far in front).
     * @returns {boolean} - True if the boss is attacking, otherwise false.
     */
    isAttacking(){
        return this.first_contact && !this.isBehindCharacter() && !this.isInFrontOfCharacter();
    }

    /**
     * Checks if the character is positioned behind the end boss.
     * The "behind" position is defined as the character's x-coordinate being greater than
     * the boss's center plus a offset.
     * @returns {boolean} - True if the character is behind the boss, otherwise false.
     */
    isBehindCharacter(){
        return this.world.character.x > this.x + this.width / 2 + 40;
    }

    /**
     * Checks if the character is positioned in front of the end boss.
     * The "in front" position is defined as the character's right edge being to the left of
     * the boss's center minus a specific offset.
     * @returns {boolean} - True if the character is in front of the boss, otherwise false.
     */
    isInFrontOfCharacter(){
        return this.world.character.x + this.world.character.width < this.x + this.width / 2 - 40;
    }

    /**
     * Determines if the end boss can move forward.
     * The boss can move forward under two conditions:
     * 1. If it has already made first contact with the character and is not dead or hurt.
     * 2. If first contact has not been made, but the character is within range.
     * @returns {boolean} - True if the boss is able to move forward, otherwise false.
     */
    canMoveForward(){
        return (!this.isDead() && !this.isHurt()) && this.first_contact || (!this.first_contact && this.characterIsInRange && this.world.character.x > 168);
    }

    /**
     * Starts the different animation loops for the end boss, separating action logic from image rendering.
     * It calls `actionAnimation` for movement and `imageAnimation` for visual updates because they have
     * different interval lengths.
     * @returns {void}
     */
    animate(){
        this.actionAnimation();
        this.imageAnimation();
    }

    /**
     * Manages the movement and action logic for the end boss.
     * This function sets up an interval that continuously checks the character's position
     * relative to the boss and triggers the appropriate movement (left or right).
     * The movement logic is only active when the boss is not in an 'alert' state.
     * @returns {void}
     */
    actionAnimation(){
        setStoppableInterval( () => {
            if(this.isBehindCharacter() && !this.is_alert){
                this.moveRight();
                this.otherDirection = true;
            } else if (this.canMoveForward() && !this.is_alert && this.isInFrontOfCharacter()){
                this.moveLeft();
                this.otherDirection = false;
            }
        }, 1000/60);
    }

    /**
     * Updates the alert state of the end boss based on an animation counter.
     * The boss is considered 'alert' for the first 8 frames of its initial animation sequence
     * after the character comes into range.
     * @param {number} i - The current animation frame counter.
     * @returns {void}
     */
    updateAlertState(i) {
        this.is_alert = i < 8;
    }

    /**
     * Selects and animates the appropriate images based on the end boss's current state.
     * The states are checked in a specific order of priority: dead, hurt, attacking, alert,
     * and finally walking as the default state.
     * @returns {void}
     */
    playCurrentAnimation() {
        this.attacking_sound.pause();
        this.hurt_sound.pause();
        if(this.isDead()){
            this.playAnimation(this.IMAGES_DEAD);
            this.dead_images_index++;
            if(this.dead_images_index >= this.IMAGES_DEAD.length*3){
                this.deadAnimationCompleted = true;
            }
        } else if(this.isHurt()){
            this.playSound(this.hurt_sound);
            this.playAnimation(this.IMAGES_HURT);
        } else if(this.isAttacking()){
            this.playSound(this.attacking_sound);
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.is_alert){
            this.playAnimation(this.IMAGES_ALERT);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Manages the visual animation loop for the end boss.
     * This function sets up an interval to continuously update the boss's animation based on its current state.
     * It also handles the logic for the initial "first contact" with the character, triggering the alert animation
     * and resetting the animation counter so that all alert frames are played.
     * @returns {void}
     */
    imageAnimation(){
        let i = 0;
        setStoppableInterval(() => {
            this.updateAlertState(i);
            this.playCurrentAnimation();
            if(this.characterIsInRange() && !this.first_contact){
                i = 0;
                this.first_contact = true;
            }
            i++;
        }, 100);
    }
}
