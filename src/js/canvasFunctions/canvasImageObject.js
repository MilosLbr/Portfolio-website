import { images } from '../imageLoader/imageLoader.js';
import { checkCollision } from './collisionFunctions.js';

let coordinates = [];

class ImageObject extends Image {
    constructor(src, width, height){
        super();
        this.imageName = src;
        this.source = images[src];
        this.velX = 0;
        this.velY = 0;
        this.xPos = 0;
        this.yPos = 0;
        this.imgObjectWidth = width;
        this.imgObjectHeight = height;
        this.mass = 1;
        
    }  
    setRandomPositionAndVelocity(){
        let xRange = window.innerWidth;

        let randomX = this.getRandomInt(0, xRange);
        let randomY = this.getRandomInt(0, 320);
        let imgWidth = this.imgObjectWidth;
        let imgHeight = this.imgObjectHeight;

        // first try this sample coordinates
        let coords = {
            xPos: randomX,
            yPos: randomY,
            imgObjectWidth: imgWidth +10,
            imgObjectHeight: imgHeight +10
        }
        
        for(let i =0 ; i< coordinates.length; i++){
            // make sure the elements are not rendered overlapping
            if(checkCollision(coordinates[i], coords)){
                
                randomX = this.getRandomInt(0, xRange);
                randomY = this.getRandomInt(0, 320);
                coords.xPos = randomX;
                coords.yPos = randomY;

                i = -1;
            }
        }
        
        coordinates.push(coords);

        this.xPos = coords.xPos;
        this.yPos = coords.yPos;

        this.velX = this.getRandomFloat(0.5, 1);
        this.velY = this.getRandomFloat(0.5, 1);

    }


    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomFloat(min, max){
        return parseFloat((Math.random() * (max -min)).toFixed(2));
    }

    move(ctx){
        
        if(((this.xPos + this.imgObjectWidth) > ctx.canvas.width && this.velX > 0 )|| (this.xPos + this.imgObjectWidth ) < this.imgObjectWidth ){
            // prevent x overflow
            this.velX = this.velX * -1;
        }
        if(((this.yPos + this.imgObjectHeight) > ctx.canvas.height && this.velY > 0) || (this.yPos + this.imgObjectHeight) < this.imgObjectHeight){
            // prevent y overflow
            this.velY = this.velY * -1;
        }
        this.xPos = parseFloat(this.xPos + this.velX);
        this.yPos = parseFloat(this.yPos + this.velY);
        
    };

    render(ctx){
        ctx.save();
        ctx.drawImage(this, this.xPos, this.yPos, this.imgObjectWidth, this.imgObjectHeight);
        ctx.restore();
    }
};


export default ImageObject;