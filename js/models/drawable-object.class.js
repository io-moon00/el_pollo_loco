class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 0;
    y = 0;
    height;
    width;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    range = 5 * 719 - 400;


    /**
     * Loads an image from the given path and assigns it to the object's img property.
     * @param {string} path - The file path to the image.
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of paths into the image cache.
     * @param {string[]} arr - An array of strings, where each string is a path to an image file.
     */
    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
 
    }

    /**
     * Plays an animation by cycling through a series of images.
     * It updates the object's current image to the next one in the sequence.
     * If a new animation sequence is provided, it resets to the beginning of that sequence.
     * @param {string[]} images - An array of image paths that constitute the animation frames.
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Draws the object's image on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Plays a sound if the sound is globally activated.
     * @param {HTMLAudioElement} sound - The audio element to be played.
     */
    playSound(sound){
        if (isSoundActivated()) {
            sound.play();
        }
    }

    /**
     * Removes the object from the visible game world after a specified delay.
     * This is achieved by moving the object to a y-coordinate far off-screen.
     * @param {number} [timeout=600] - The delay in milliseconds before the object is removed. Defaults to 600ms.
     * @returns {void} This function does not return a value.
     */
    removeFromWorld(timeout = 600){
        setTimeout(() => {
            this.y = -1000;
        }, timeout);
    }

    /**
     * Defines and returns an array of zones for object placement, each with a specific start, end, and weight.
     * The weights influence the probability of an object spawning within that zone.
     * @returns {Array<Object>} An array of zone objects, where each object has `start`, `end`, and `weight` properties.
     */
    getZones() {
        return [
            { start: 200, end: 719, weight: 0.15 },
            { start: 720, end: 2*719, weight: 0.25 },   
            { start: 2*719+1, end: 3*719, weight: 0.3 },
            { start: 3*719+1, end: 4*719, weight: 0.3 },
            { start: 4*719+1, end: this.range, weight: 0.1 }
        ];
    }

    /**
     * Calculates and returns a random position based on a weighted distribution across predefined zones.
     * This method uses the zones defined in `getZones()` to determine a spawn position.
     * Zones with higher weights are more likely to be chosen.
     * @returns {number} A randomly generated position within one of the weighted zones.
     */
    getWeightedRandomPosition() {
        const zones = this.getZones();
        const totalWeight = zones.reduce((sum, zone) => sum + zone.weight, 0);
        const random = Math.random() * totalWeight;
        let cumulativeWeight = 0;
        for (let zone of zones) {
            cumulativeWeight += zone.weight;
            if (random <= cumulativeWeight) {
                const position = zone.start + Math.random() * (zone.end - zone.start);
                return position;
            }
        }
    }
}