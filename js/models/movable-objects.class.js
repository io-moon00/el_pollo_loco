class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    life = 100;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Applies a gravity effect to the object, causing it to fall.
     * This function sets an interval that continuously updates the object's y-coordinate
     * to simulate falling, as long as the object is above the ground or has upward momentum.
     * @returns {void} This function does not return a value.
     */
    applyGravity(){
        setStoppableInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    /**
     * Checks if the object is currently above the ground.
     * The ground level varies depending on the type of the object.
     * For instance, a `ThrowableBottle` has a different ground level than a `Character`.
     * @returns {boolean} Returns `true` if the object is above its specific ground level, otherwise `false`.
     */
    isAboveGround(){
        if(this instanceof ThrowableBottle){
            return this.y < 400;
        }else if (this instanceof Character){
            return this.y < 192;
        } else {
            return false;
        }
    }

    /**
     * Moves the object to the right by increasing its x-coordinate by its speed.
     * @returns {void} This function does not return a value.
     */
    moveRight(){
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decreasing its x-coordinate by its speed.
     * @returns {void} This function does not return a value.
     */
    moveLeft(){
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     * @returns {void} This function does not return a value.
     */
    jump(){
        this.speedY = 30;
    }

    /**
     * Checks if this object is colliding with another movable object.
     * The collision detection is based on the rectangular bounding boxes of the objects,
     * adjusted by their individual offsets.
     * @param {MovableObject} mo - The other movable object to check for collision with.
     * @returns {boolean} Returns `true` if the objects are colliding, otherwise `false`.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
     * Reduces the object's life points by 5 when it is hit.
     * If the life points drop below 0, they are set to 0.
     * Otherwise, it records the timestamp of the hit.
     * @returns {void} This function does not return a value.
     */
    hit(){
        this.life -= 5;
        if (this.life < 0){
            this.life = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently in a "hurt" state.
     * The hurt state is active for a short period (500 milliseconds) after being hit.
     * @returns {boolean} Returns `true` if the time passed since the last hit is less than 500 milliseconds, otherwise `false`.
     */
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 500; // Difference in s
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead.
     * An object is considered dead if its life points are 0.
     * @returns {boolean} Returns `true` if the object's life is 0, otherwise `false`.
     */
    isDead(){
        return this.life == 0;
    }
}