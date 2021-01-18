var canvas;

const STARS_PER_1000 = 100;
let stars = [];

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");

    frameRate(80);

    const nStars = ((width * height) / (1000 * 1000)) * STARS_PER_1000;
    for (let i = 0; i < nStars; i++) {
        stars.push(new Star());
    }
    for (let i = 0; i < 100; i++)
        stars.forEach((star) => star.update(warpSpeed));
}

function draw() {
    background("#0c0613");
    stars.forEach((star) => {
        star.update(warpSpeed);
        star.draw();
    });
}

class Star {
    constructor() {
        this.respawn();
    }

    respawn() {
        this.life = 0;
        this.pos = createVector(random(width), random(height));
    }

    update(speed) {
        if (
            this.pos.x < 0 ||
            this.pos.y < 0 ||
            this.pos.x > width ||
            this.pos.y > height
        )
            this.respawn();

        let center = createVector(width / 2, height / 2);

        let diff = p5.Vector.sub(this.pos, center);
        diff.mult((1 / 200) * speed);
        this.vel = diff;
        this.pos.add(this.vel);

        this.life++;
    }

    draw() {
        if (this.life === 0) return;
        stroke(255, 255, 255, map(this.life, 0, 40, 0, 100, true));
        strokeWeight(4);
        let streak = this.vel.copy();
        streak.setMag(pow(streak.mag(), 1.6));
        let streakPoint = p5.Vector.add(this.pos, streak);
        line(streakPoint.x, streakPoint.y, this.pos.x, this.pos.y);
    }
}
