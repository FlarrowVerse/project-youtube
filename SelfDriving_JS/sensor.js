class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 3;
        this.rayLength = 100;
        this.raySpread = Math.PI/4;

        this.rays = [];
    }

    update() {
        this.rays = [];

        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(
                this.raySpread/2,
                -this.raySpread/2,
                i/(this.rayCount - 1)
            );

            const start = {x: this.car.x, y: this.car.y};
            const end = {
                x: start.x - Math.sin(rayAngle) * this.rayLength,
                y: start.y - Math.cos(rayAngle) * this.rayLength
            };

            this.rays.push([start, end]);
        }

        // console.table(this.rays);
    }

    draw(ctx) {
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = "yellow";

        this.rays.forEach(ray => {
            // console.table(ray);
            ctx.beginPath();
            ctx.moveTo(ray[0].x, ray[0].y);
            ctx.lineTo(ray[1].x, ray[1].y); 
            ctx.stroke();
        });
    }
}