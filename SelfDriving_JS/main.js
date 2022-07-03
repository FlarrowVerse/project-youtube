const canvas = document.getElementById("root")

canvas.width = 400;

const ctx = canvas.getContext("2d");

const road = new Road(canvas.width/2, canvas.width * 0.95);
// const road2 = new Road(canvas.width*3/4, canvas.width/2 * 0.95);
const car = new Car(road.getLaneCenter(1), window.innerHeight, 30, 60, "KEYS");

const traffic = [
    new Car(road.getLaneCenter(1), window.innerHeight-200, 30, 60, "DUMMY", 2)
];

animate();

function animate() {
    // car.update([...road.borders, ...road2.borders]);

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    // road2.draw(ctx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx, "gray");
    }
    car.draw(ctx, "blue");

    ctx.restore();
    requestAnimationFrame(animate);
}