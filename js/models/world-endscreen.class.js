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
     * This is used to position elements centrally on the game over or win screens.
     * @returns {void}
     */
    calcCanvasCenter() {
        this.canvasCenterX = this.world.canvas.width / 2;
        this.canvasCenterY = this.world.canvas.height / 2;
    }

    /**
     * Draws the game over screen on the canvas.
     * This includes centering and scaling the game over image, playing the game over sound,
     * and making the restart button visible.
     * @returns {void}
     */
    drawGameOverScreen(){
        this.calcCanvasCenter();
        this.playGameOverSound();
        const scaledWidth = this.gameOverImg.width * 0.5;
        const scaledHeight = this.gameOverImg.height * 0.5;
        this.world.ctx.drawImage(
            this.gameOverImg,
            this.canvasCenterX - scaledWidth/2,
            this.canvasCenterY - scaledHeight/2,
            scaledWidth,
            scaledHeight
        );
        document.getElementById('restart-btn').classList.remove('d-none');
    }

    /**
     * Plays the game over sound effect if sound is enabled and the sound has not already been played.
     * This prevents the sound from playing multiple times.
     * @returns {void}
     */
    playGameOverSound(){
         if (isSoundActivated() && !this.gameOverSoundPlayed){
            this.gameOverSound.play();
            this.gameOverSoundPlayed = true;
        }
    }

    /**
     * Manages and draws the confetti animation on the canvas.
     * This function ensures the confetti particles are initialized, updates their positions and states,
     * and then draws them. The animation continues until all particles have landed.
     * @returns {void}
     */
    drawConfettiAnimation(){
        this._confettiEnsure(); 
        if (!this._confettiFinished) {
            if (this._winConfetti) {
                this._confettiTick(); 
                this._confettiDraw();
            }
        }
    }

    /**
     * Orchestrates the drawing of the entire 'You Won' screen Elements.
     * This function calculates a dynamic scale factor and then calls other drawing methods
     * to render the background, confetti animation, title, and game statistics.
     * @returns {void}
     */
    draw(){
        const scale = this._scale(this.world.canvas.width);
        this.drawBackground();
        this.drawConfettiAnimation();
        this.drawTitle(scale);
        this.drawStats(scale);
    }

    /**
     * Orchestrates the drawing of the 'You Won' screen.
     * This function centers the canvas, plays the win sound, resets the canvas transform to ensure
     * proper positioning, draws all the win screen elements (background, confetti, title, stats),
     * and makes the restart button visible. It also sets a timeout to stop the game loop,
     * effectively ending the game session after a short delay.
     * @returns {void}
     */
    drawYouWinScreen(){
        this.calcCanvasCenter();
        this.playWinSound();
        this.world.ctx.save();
        this.world.ctx.setTransform(1,0,0,1,0,0);
        this.draw();
        this.world.ctx.restore();
        document.getElementById('restart-btn').classList.remove('d-none');
        setTimeout(() => {
            this.world.gameRunning = false;
        }, 5000);
    }

    /**
     * Draws a semi-transparent background over the entire canvas.
     * This is used to dim the game view and provide a backdrop for the win screen elements.
     * @returns {void}
     */
    drawBackground() {
        this.world.ctx.fillStyle = 'rgba(76, 33, 0, 0.84)';
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

    _scale = W => Math.max(0.7, Math.min(1.2, W / 1280));

    getCoinsStatData() {
        const coins = this.world.character.collectedCoins ?? 0;
        const total = this.world.totalCoins ?? 1;
        return [coins, total, Math.round((coins / total) * 100)];
    }

    getKilledEnemiesStatData() {
        const enemies = this.world.level.enemies.filter(e => e.isDead()).length;
        const total = this.world.level.enemies.length;
        return [enemies, total, Math.round((enemies / total) * 100)];
    }

    drawCoinsStatLine(scale, y, collectedCoins, totalCoins, collectedCoinsPercentage) {
        const coinSize = 35 * scale;
        const textWidth = this.world.ctx.measureText(`${collectedCoins}/${totalCoins} (${collectedCoinsPercentage}%)`).width;
        const coinX = this.canvasCenterX - textWidth / 2 - coinSize - 10;
        this.world.ctx.drawImage(this.coinImage, coinX, y - coinSize / 2, coinSize, coinSize);
        const line = `${collectedCoins}/${totalCoins} (${collectedCoinsPercentage}%)`;
        this.world.ctx.strokeText(line, this.canvasCenterX, y);
        this.world.ctx.fillText(line, this.canvasCenterX, y);
    }

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

    drawBonusMessage(scale, y, collectedCoinsPercentage) {
        let bonus = collectedCoinsPercentage===100?'Perfect Collection! 🏆': collectedCoinsPercentage>=80?'Great Job! 🌟': collectedCoinsPercentage>=50?'Well Done! ⭐':'';
        if (bonus) { 
            this.world.ctx.font=`800 ${Math.round(24*scale)}px Trebuchet MS, Arial, sans-serif`; 
            this.world.ctx.fillStyle='#C8E6C9';
            this.world.ctx.strokeText(bonus, this.canvasCenterX, y + 80 * scale); // Changed from y+40*scale to y+80*scale
            this.world.ctx.fillText(bonus, this.canvasCenterX, y + 80 * scale);   // Changed from y+40*scale to y+80*scale
        }
    }

    setTextParameters(scale) {
        this.world.ctx.textAlign = 'center';
        this.world.ctx.textBaseline = 'middle';
        this.world.ctx.font = `400 ${Math.round(28 * scale)}px cooper-black-std, Arial, sans-serif`;
        this.world.ctx.fillStyle = '#e5e5e5ff';
    }

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

    _confettiEnsure() {
        if (this._winConfetti || this._confettiFinished) return;
        this._winConfetti = [];
        for (let i = 0; i < 15; i++) {
            this._winConfetti.push({
                x: Math.random() * this.world.canvas.width,
                y: -50,
                vx: (Math.random() - 0.5) * 4, 
                vy: Math.random() * 3 + 2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 0.5 + 0.8,
                hasLanded: false 
            });
        }
    }

    _confettiTick() {
        if (!this._winConfetti) return;
        this._winConfetti.forEach(particle => {
            if (!particle.hasLanded) {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.rotation += particle.rotationSpeed;
                if (particle.y > this.world.canvas.height + 50) {
                    particle.hasLanded = true;
                }
            }
        });
        
        const allLanded = this._winConfetti.every(particle => particle.hasLanded);
        
        if (allLanded) {
            this._winConfetti = null;
            this._confettiFinished = true;
        }
    }

    playWinSound(){
        if (isSoundActivated() && !this.winSoundPlayed) {
            this.winSound.volume = 0.5;
            this.winSound.loop = false;
            this.winSound.play();
            this.winSoundPlayed = true;
        }
    }

    _confettiDraw() {    
    if (!this._winConfetti) return;
    this._winConfetti.forEach(particle => {
        if (!particle.hasLanded) {
            this.world.ctx.save();
            this.world.ctx.translate(particle.x, particle.y);
            this.world.ctx.rotate(particle.rotation);
            this.world.ctx.scale(particle.size, particle.size);
            // Check if chili image is loaded before drawing
            if (this.chiliImage && this.chiliImage.complete) {
                this.world.ctx.drawImage(this.chiliImage, -20, -20, 40, 40);
            }
            this.world.ctx.restore();
        }
    });
}
}