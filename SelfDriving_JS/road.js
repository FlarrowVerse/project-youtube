class Road {
    constructor(x, width, laneCount=3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width/2;
        this.right = x + width/2;

        const infinity = 100000000;
        this.top = -infinity;
        this.bottom = infinity;
    }

    getLaneCenter(laneIndex) {
        let laneWidth = this.width / this.laneCount;
        return this.left + (Math.min(laneIndex, this.laneCount-1) + 1/2) * laneWidth;
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i = 0; i <= this.laneCount; i++) {
            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount
            );
            ctx.beginPath(); 
            
            if (i > 0 && i < this.laneCount) {
                ctx.setLineDash([20,20]);
            } else {
                ctx.setLineDash([]);
            }                       
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }       
    }
}