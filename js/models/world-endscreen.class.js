class WorldEndScreen {
    winSound = new Audio('audio/win_sound.mp3');
    gameOverSound = new Audio('audio/game_over.mp3');
    gameOverSoundPlayed = false;
    gameOverImg = new Image();
    chiliImage = new Image();
    coinImage = new Image();
    bottleImage = new Image();
    enemyImage = new Image();

    constructor(world) {
        this.world = world;
        this.gameOverImg.src = 'img/9_intro_outro_screens/game_over/game over.png';
        this.chiliImage.src = 'img/chili.png';
        this.coinImage.src = 'img/8_coin/coin_1.png';
        this.bottleImage.src = 'img/6_salsa_bottle/salsa_bottle.png';
        this.enemyImage.src = 'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png';
    }

    /**
     * Calculates the center coordinates of the canvas and stores them as properties of the instance.
     * @returns {void}
     */
    calcCanvasCenter() {
        this.canvasCenterX = this.world.canvas.width / 2;
        this.canvasCenterY = this.world.canvas.height / 2;
    }

    /**
     * Manages the visibility of HTML elements for the game over screen.
     * @returns {void}
     */
    handleGameOverScreenHTMLVisibility(){
        elements = document.getElementsByClassName('hide-on-start');
        for (let btn of elements) {
            btn.classList.remove('d-none');
        }
        document.getElementById('mobile-game-controls').classList.add('d-none');
    }

    /**
     * Draws the 'Game Over' image on the canvas.
     * @returns {void}
     */
    drawGameOverImage(){
        this.calcCanvasCenter();
        const scaledWidth = this.gameOverImg.width * 0.5;
        const scaledHeight = this.gameOverImg.height * 0.5;
        this.world.ctx.drawImage(
            this.gameOverImg,
            this.canvasCenterX - scaledWidth/2,
            this.canvasCenterY - scaledHeight/2,
            scaledWidth,
            scaledHeight
        );
    }

    /**
     * Orchestrates the drawing of the 'Game Over' screen.
     * @returns {void}
     */
    drawGameOverScreen(){
        this.playGameOverSound();
        this.drawGameOverImage();
        this.handleGameOverScreenHTMLVisibility();
    }

    /**
     * Plays the game over sound effect if sound is enabled and the sound has not already been played.
     * @returns {void}
     */
    playGameOverSound(){
         if (isSoundActivated() && !this.gameOverSoundPlayed){
            this.gameOverSound.play();
            this.gameOverSoundPlayed = true;
        }
    }

    /**
     * Manages the confetti animation on the 'You Won' screen.
     * @returns {void}
     */
    drawConfettiAnimation(){
        this.confettiEnsure(); 
        if (!this.confettiFinished) {
            if (this.winConfetti) {
                this.confettiAnimation(); 
            }
        }
    }

    /**
     * Orchestrates the drawing of the entire 'You Won' screen Elements.
     * @returns {void}
     */
    draw(){
        const scaledWidth = Math.max(0.7, Math.min(1.2, this.world.canvas.width / 1280));
        this.drawBackground();
        this.drawConfettiAnimation();
        this.drawTitle(scaledWidth);
        this.drawStats(scaledWidth);
    }

    /**
     * Orchestrates the drawing of the 'You Won' screen.
     * @returns {void}
     */
    drawYouWinScreen(){
        this.calcCanvasCenter();
        this.playWinSound();
        this.world.ctx.save();
        this.world.ctx.setTransform(1,0,0,1,0,0);
        this.draw();
        this.world.ctx.restore();
        this.waitForConfettiCompletion();
    }

    /**
     * Waits for all confetti particles to complete their animation before ending the game.
     * @returns {void}
     */
    waitForConfettiCompletion() {
        const checkInterval = setInterval(() => {
            if (this.confettiFinished || this.allConfettiLanded()) {
                clearInterval(checkInterval);
                this.world.gameRunning = false;
                this.handleGameOverScreenHTMLVisibility();
            }
        }, 100);
    }

    /**
     * Draws a semi-transparent background over the entire canvas.
     * This is used to dim the game view and provide a backdrop for the win screen elements.
     * @returns {void}
     */
    drawBackground() {
        this.world.ctx.fillStyle = 'rgba(96, 180, 47, 0.84)';
        this.world.ctx.fillRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    }

    /**
     * Draws the 'YOU WON!' title on the canvas.
     * This function configures the text style, including font, color, shadow, and stroke,
     * and then renders the title at a calculated position, which is adjusted by the provided scale factor.
     * @param {number} scale - A dynamic scaling factor based on the canvas width, used to adjust the font size,
     * line width, shadow properties, and vertical position of the title to ensure it looks good on different screen sizes.
     * @returns {void}
     */
    drawTitle(scale) {
        const y = this.canvasCenterY - 110 * scale + 45 * scale;
        this.world.ctx.save();
        this.world.ctx.textAlign = 'center';
        this.world.ctx.textBaseline = 'middle';
        this.world.ctx.font = `400 ${Math.round(64 * scale)}px cooper-black-std, Arial, sans-serif`;
        this.world.ctx.lineWidth = 6 * scale;
        this.world.ctx.strokeStyle = '#3e2723';
        this.world.ctx.fillStyle = '#ff9501ff';
        this.world.ctx.shadowColor = 'rgba(0,0,0,.35)';
        this.world.ctx.shadowBlur = 14 * scale;
        this.world.ctx.shadowOffsetY = 6 * scale;
        this.world.ctx.fillText('YOU WON!', this.canvasCenterX, y);
        this.world.ctx.restore();
    }

    /**
     * Retrieves and calculates statistics about the collected coins.
     * It fetches the number of coins collected by the character and the total number of coins in the world,
     * then calculates the collection percentage.
     * @returns {number[]} An array containing three elements: 
     *                     1. The number of collected coins.
     *                     2. The total number of coins available in the level.
     *                     3. The percentage of coins collected, rounded to the nearest integer.
     */
    getCoinsStatData() {
        const coins = this.world.character.collectedCoins ?? 0;
        const total = this.world.totalCoins ?? 1;
        return [coins, total, Math.round((coins / total) * 100)];
    }

    /**
     * Retrieves and calculates statistics about the killed enemies.
     * It counts the number of enemies that are dead and the total number of enemies in the world,
     * then calculates the kill percentage.
     * @returns {number[]} An array containing three elements: 
     *                     1. The number of killed enemies.
     *                     2. The total number of enemies in the level.
     *                     3. The percentage of enemies killed, rounded to the nearest integer.
     */
    getKilledEnemiesStatData() {
        const enemies = this.world.level.enemies.filter(e => e.isDead()).length;
        const total = this.world.level.enemies.length;
        return [enemies, total, Math.round((enemies / total) * 100)];
    }

    /**
     * Draws the coin statistics line on the 'You Won' screen.
     * This function renders a line of text showing the number and percentage of collected coins,
     * preceded by a coin icon. The position and size of the elements are adjusted based on the provided scale.
     * @param {number} scale - A dynamic scaling factor to adjust the size of the text and icon.
     * @param {number} y - The vertical (y-coordinate) position on the canvas where the stat line will be drawn.
     * @param {number} collectedCoins - The number of coins collected by the player.
     * @param {number} totalCoins - The total number of coins available in the level.
     * @param {number} collectedCoinsPercentage - The percentage of coins collected.
     * @returns {void}
     */
    drawCoinsStatLine(scale, y, collectedCoins, totalCoins, collectedCoinsPercentage) {
        const coinSize = 35 * scale;
        const textWidth = this.world.ctx.measureText(`${collectedCoins}/${totalCoins} (${collectedCoinsPercentage}%)`).width;
        const coinX = this.canvasCenterX - textWidth / 2 - coinSize - 10;
        this.world.ctx.drawImage(this.coinImage, coinX, y - coinSize / 2, coinSize, coinSize);
        const line = `${collectedCoins}/${totalCoins} (${collectedCoinsPercentage}%)`;
        this.world.ctx.strokeText(line, this.canvasCenterX, y);
        this.world.ctx.fillText(line, this.canvasCenterX, y);
    }

    /**
     * Draws the enemy kill statistics line on the 'You Won' screen.
     * @param {number} scale - A dynamic scaling factor to adjust the size of the text and icon.
     * @param {number} y - The base vertical (y-coordinate) position on the canvas from which the stat line's position will be calculated.
     * @param {number} killedEnemies - The number of enemies killed by the player.
     * @param {number} totalEnemies - The total number of enemies available in the level.
     * @param {number} killedEnemiesPercentage - The percentage of enemies killed.
     * @returns {void}
     */
    drawEnemyStatLine(scale, y, killedEnemies, totalEnemies, killedEnemiesPercentage) {
        const enemySize = 50 * scale;
        const textWidth = this.world.ctx.measureText(`${killedEnemies}/${totalEnemies} (${killedEnemiesPercentage}%)`).width;
        const enemyX = this.canvasCenterX - textWidth / 2 - enemySize - 10;
        const textY = y + 40 * scale;
        this.world.ctx.drawImage(this.enemyImage, enemyX, textY - enemySize / 2, enemySize, enemySize);
        const line2 = `${killedEnemies}/${totalEnemies} (${killedEnemiesPercentage}%)`;
        this.world.ctx.strokeText(line2, this.canvasCenterX, textY);
        this.world.ctx.fillText(line2, this.canvasCenterX, textY);
    }

    /**
     * Draws a bonus message on the 'You Won' screen based on the percentage of coins collected.
     * @param {number} scale - A dynamic scaling factor to adjust the size and position of the text.
     * @param {number} y - The base vertical (y-coordinate) position on the canvas from which the message's position will be calculated.
     * @param {number} collectedCoinsPercentage - The percentage of coins collected, used to determine which bonus message to display.
     * @returns {void}
     */
    drawBonusMessage(scale, y, collectedCoinsPercentage) {
        let bonus = collectedCoinsPercentage===100?'Perfect Collection! 🏆': collectedCoinsPercentage>=80?'Great Job! 🌟': collectedCoinsPercentage>=50?'Well Done! ⭐':'';
        if (bonus) { 
            this.world.ctx.font=`800 ${Math.round(36*scale)}px cooper-black-std, Arial, sans-serif`; 
            this.world.ctx.fillStyle='#C8E6C9';
            this.world.ctx.strokeText(bonus, this.canvasCenterX, y + 80 * scale); // Changed from y+40*scale to y+80*scale
            this.world.ctx.fillText(bonus, this.canvasCenterX, y + 80 * scale);   // Changed from y+40*scale to y+80*scale
        }
    }

    /**
     * Sets the text rendering parameters for the canvas context.
     * @param {number} scale - A dynamic scaling factor based on the canvas width, used to adjust the font size.
     * @returns {void}
     */
    setTextParameters(scale) {
        this.world.ctx.textAlign = 'center';
        this.world.ctx.textBaseline = 'middle';
        this.world.ctx.font = `400 ${Math.round(36 * scale)}px cooper-black-std, Arial, sans-serif`;
        this.world.ctx.fillStyle = '#e5e5e5ff';
    }

    /**
     * Orchestrates the drawing of all game statistics on the 'You Won' screen.
     * @param {number} scale - A dynamic scaling factor based on the canvas width, used to adjust the size and position of the statistics to ensure they are well-proportioned on different screen sizes.
     * @returns {void}
     */
    drawStats(scale) {
        const [collectedCoins, totalCoins, collectedCoinsPercentage] = this.getCoinsStatData();
        const [killedEnemies, totalEnemies, killedEnemiesPercentage] = this.getKilledEnemiesStatData();
        const y = this.canvasCenterY + 30 * scale;
        this.world.ctx.save();
        this.setTextParameters(scale);
        this.drawCoinsStatLine(scale, y, collectedCoins, totalCoins, collectedCoinsPercentage);
        this.drawEnemyStatLine(scale, y + 40 * scale, killedEnemies, totalEnemies, killedEnemiesPercentage);
        this.drawBonusMessage(scale, y + 80 * scale, collectedCoinsPercentage);
        this.world.ctx.restore();
    }

    /**
     * Ensures that the confetti particles are initialized for the win screen animation.
     * @returns {void}
     */
    confettiEnsure() {
        if (this.winConfetti || this.confettiFinished) return;
        this.winConfetti = [];
        for (let i = 0; i < 15; i++) {
            this.winConfetti.push({
                x: Math.random() * this.world.canvas.width,
                y: -50,
                speedX: (Math.random() - 0.5) * 4, 
                speedY: Math.random() * 3 + 2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 0.5 + 0.8,
                hasLanded: false
            });
        }
    }

    /**
     * Checks if all confetti particles have completed their animation and landed.
     * @returns {boolean} - Returns `true` if every particle in the `winConfetti` array has landed, otherwise returns `false`.
     */
    allConfettiLanded() {
        return this.winConfetti.every(particle => particle.hasLanded);
    }

    /**
     * Updates the position and rotation of a single confetti particle for one animation frame.
     * @param {object} particle - The confetti particle object to update. It contains properties for position (x, y), speed (speedX, speedY), rotation, and state (hasLanded).
     * @returns {void}
     */
    updateParticle(particle) {
        if (!particle.hasLanded) {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.rotation += particle.rotationSpeed;
            if (particle.y > this.world.canvas.height + 50) {
                particle.hasLanded = true;
            }
        }
    }

    /**
     * Manages a single frame of the confetti animation on the 'You Won' screen.
     * @returns {void}
     */
    confettiAnimation() {
        if (!this.winConfetti) return;
        this.winConfetti.forEach(particle => {
            this.updateParticle(particle);
        });
        if (this.allConfettiLanded()) {
            this.winConfetti = null;
            this.confettiFinished = true;
        }
        this.confettiDraw();
    }

    /**
     * Plays the win sound effect if sound is enabled and the sound has not already been played.
     * @returns {void}
     */
    playWinSound(){
        if (isSoundActivated() && !this.winSoundPlayed) {
            this.winSound.volume = 0.5;
            this.winSound.loop = false;
            this.winSound.play();
            this.winSoundPlayed = true;
        }
    }

    /**
     * Draws all active confetti particles on the canvas for the 'You Won' screen.
     * @returns {void}
     */
    confettiDraw() {    
        if (!this.winConfetti) return;
        this.winConfetti.forEach(particle => {
            if (!particle.hasLanded) {
                this.world.ctx.save();
                this.world.ctx.translate(particle.x, particle.y);
                this.world.ctx.rotate(particle.rotation);
                this.world.ctx.scale(particle.size, particle.size);
                if (this.chiliImage && this.chiliImage.complete) {
                    this.world.ctx.drawImage(this.chiliImage, -20, -20, 40, 40);
                }
                this.world.ctx.restore();
            }
        });
    }
}