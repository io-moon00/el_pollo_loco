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

    currentAnimationImage = null;


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
 
    }

    playAnimation(images){
        // Reset currentImage if animation changed
        if (this.currentAnimationImages !== images) {
            this.currentImage = 0;
            this.currentAnimationImages = images;
        }
        
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

}