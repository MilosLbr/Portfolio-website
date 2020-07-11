import ImageObject from './canvasImageObject.js';
import {  checkCollision, resolveCollision } from './collisionFunctions.js';

const imageNames = ['bootstrap', 'css', 'html', 'javascript', 'jquery', 'react', 'redux', 'sass', 'webpack', 'ajax', 'git', 'angular', 'aspnet', 'csharp', 'sql', 'azure'];

window.addEventListener('resize', () => {
    // resize canvas on window size change
    let canvas = document.getElementById('myCanvas');
    canvas.width = window.innerWidth;
});

let canvasImages = [];

let windowWidth = window.innerWidth;
let imageSize = windowWidth < 768 ? 60 : 100;

imageNames.forEach(imgName => {
    let svgImageForCanvas = new ImageObject(imgName, imageSize, imageSize);
    svgImageForCanvas.src = svgImageForCanvas.source;
    svgImageForCanvas.setRandomPositionAndVelocity();

    canvasImages.push(svgImageForCanvas );
});


const canvasControler = () =>{
    let canvas = document.getElementById('myCanvas');

    let ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height =  400;
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.offsetWidth + 20, 400);

        for(let i = 0 ; i < canvasImages.length; i++){
            let currentObject = canvasImages[i];
            
            for(let j = 0; j < canvasImages.length; j++){
                let nextObject = canvasImages[i+j] ? canvasImages[i+j] : undefined;

                if(nextObject && (currentObject.imageName === nextObject.imageName)){
                    continue;
                }

                if(nextObject && checkCollision(currentObject, nextObject)){
                     resolveCollision(currentObject, nextObject);                
                }
            }
            
            currentObject.move(ctx);
            currentObject.render(ctx);
        }

        requestAnimationFrame(animate);
    }

    let animateInterval = requestAnimationFrame(animate);
}


export{
    canvasControler
}