class CollectableObject extends DrawableObject {
    width = 50;
    height = 50;
    is_collected = false;
    collect_sound = null; // Will be set by child classes

    constructor(imagePath, x = undefined, y = undefined) {
        super();
        this.loadImage(imagePath);
        this.x = x !== undefined ? x : 200 + Math.floor(Math.random() * 1400);
        this.y = y !== undefined ? y : 100 + Math.floor(Math.random() * 300);
    }

    /**
     * Handles the collection of the object.
     * Plays a collection sound and removes the object from the game world after a short delay.
     * @returns {void}
     */
    collect() {
        if (this.is_collected) return; // Prevent double collection
        
        this.is_collected = true;
        this.playCollectionSound();
        this.removeFromWorld(50);
        this.stopSoundAfterDelay();
    }

    /**
     * Plays the collection sound if it exists.
     * Can be overridden by child classes for custom behavior.
     * @returns {void}
     */
    playCollectionSound() {
        if (this.collect_sound) {
            this.playSound(this.collect_sound);
        }
    }

    /**
     * Stops the collection sound after a delay.
     * Can be overridden by child classes for custom timing.
     * @returns {void}
     */
    stopSoundAfterDelay() {
        if (this.collect_sound) {
            setTimeout(() => {
                this.collect_sound.pause();
            }, 200);
        }
    }
}