const checkCollision = (rect1, rect2) => {
        // rect1.bottom < rect2.top 
    let bottomEdge = rect1.yPos + rect1.imgObjectHeight < rect2.yPos;
        // rect1.top > rect2.bottom
    let topEdge = rect1.yPos > rect2.yPos + rect2.imgObjectHeight;
        // rect1.left > rect2.rigth
    let leftEdge = rect1.xPos > rect2.xPos + rect2.imgObjectWidth;
        // rect1.rigth < rect2.left
    let rightEdge = rect1.xPos + rect1.imgObjectWidth < rect2.xPos;

    // if all edges are true, there is no collision

    return !(bottomEdge || topEdge || leftEdge || rightEdge);
}

const rotate = (velX, velY, angle) => {
    const rotatedVelocities = {
        velX: velX * Math.cos(angle) - velY * Math.sin(angle),
        velY: velX * Math.sin(angle) + velY * Math.cos(angle)
    };

    return rotatedVelocities;
}

const resolveCollision = (particle, otherParticle) => {

    // source https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc
    
    const xVelocityDiff = particle.velX - otherParticle.velX;
    const yVelocityDiff = particle.velY - otherParticle.velY;

    const xDist = otherParticle.xPos - particle.xPos;
    const yDist = otherParticle.yPos - particle.yPos;
    
    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.yPos - particle.yPos, otherParticle.xPos - particle.xPos);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velX, particle.velY, angle);
        const u2 = rotate(otherParticle.velX, otherParticle.velY, angle);

        // Velocity after 1d collision equation
        const v1 = { velX: u1.velX * (m1 - m2) / (m1 + m2) + u2.velX * 2 * m2 / (m1 + m2), velY: u1.velY };
        const v2 = { velX: u2.velX * (m1 - m2) / (m1 + m2) + u1.velX * 2 * m2 / (m1 + m2), velY: u2.velY };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1.velX, v1.velY, -angle);
        const vFinal2 = rotate(v2.velX, v2.velY, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velX = vFinal1.velX;
        particle.velY = vFinal1.velY;

        otherParticle.velX = vFinal2.velX;
        otherParticle.velY = vFinal2.velY;
    }
}

export{
    checkCollision,
    resolveCollision
}
