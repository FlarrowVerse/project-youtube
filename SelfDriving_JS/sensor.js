class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 5;
        this.rayLength = 150;
        this.raySpread = Math.PI/2;

        this.rays = [];
        this.readings = []; // sensor outputs
    }

    #getReading(ray, roadBorders) {
        let touches = [];

        for (let i = 0; i < roadBorders.length; i++) {
            const touch = getIntersection(
                ray[0], ray[1],
                roadBorders[i][0], roadBorders[i][1]
            );

            if (touch) touches.push(touch);
        }

        if (touches.length === 0) {
            return null;
        } else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset === minOffset);
        }
    }

    update(roadBorders) {
        this.#castRays();
        this.readings = [];

        for (let i = 0; i < this.rayCount; i++) {
            this.readings.push(
                this.#getReading(this.rays[i], roadBorders)
            );
        }
    }

    #castRays() {
        this.rays = [];

        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(
                this.raySpread/2,
                -this.raySpread/2,
                (this.rayCount === 1)? 0.5: i/(this.rayCount - 1)
            ) + this.car.angle;

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
        

        this.rays.forEach((ray, index) => {
            // console.table(ray);
            let end = ray[1];
            if (this.readings[index]) {
                end = this.readings[index];
            }

            // actual sensors
            ctx.strokeStyle = "yellow";
            ctx.beginPath();
            ctx.moveTo(ray[0].x, ray[0].y);
            ctx.lineTo(end.x, end.y); 
            ctx.stroke();

            // sensors outside perimeter
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.moveTo(ray[1].x, ray[1].y);
            ctx.lineTo(end.x, end.y); 
            ctx.stroke();
        });
    }
}