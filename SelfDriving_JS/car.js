class Car {
    constructor(x, y, width, height) {
        // init position and dim
        this.x = x; this.y = y;
        this.width = width; this. height = height;

        // mechanics
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.maxRevSpeed = -1.5;
        this.friction = 0.05;
        this.angle = 0;

        this.controls = new Controls();
    }

    update() {       

        this.#move();
    }

    #move() {
        /**
         * Forward & Reverse mechanics
         */
        if (this.controls.forward) {
            this.speed += this.acceleration;
        } else if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
        if (this.speed < this.maxRevSpeed) this.speed = this.maxRevSpeed;

        if (this.speed > 0) this.speed -= this.friction;
        if (this.speed < 0) this.speed += this.friction;
        
        if (Math.abs(this.speed) < this.friction) this.speed = 0;

        this.y -= Math.cos(this.angle) * this.speed;

        /**
         * Direction control mechanics
         */
        const flip = (this.speed == 0)? 0 : (this.speed > 0) ? 1: -1; 
        if (this.controls.left) {
            this.angle += 0.03 * flip;
        } else if (this.controls.right) {
            this.angle -= 0.03 * flip;
        }
        this.x -= Math.sin(this.angle) * this.speed;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();
        ctx.restore();
    }
}