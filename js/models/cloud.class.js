class Cloud extends MovableObject{
    y = 20;
    width = 300;
    height = 300;

    constructor(){
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = Math.floor(Math.random() * 1500);
        this.speed = 0.15 + Math.random() * 0.05;
        this.animate();
    }

    animate(){
        setInterval( () => {
            this.moveLeft();
        }, 1000/60);
    }
}