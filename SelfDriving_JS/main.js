const carCanvas = document.getElementById("carCanvas")
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas")
networkCanvas.width = 1000;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width * 0.95);
// const road2 = new Road(canvas.width*3/4, canvas.width/2 * 0.95);
const car = new Car(road.getLaneCenter(1), window.innerHeight, 30, 50, "KEYS");

const traffic = [
    new Car(road.getLaneCenter(1), window.innerHeight-200, 30, 50, "DUMMY", 2)
];

animate();

function animate() {
    // car.update([...road.borders, ...road2.borders]);

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);


    // canvas config stuff
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    // starting car drawing
    carCtx.save();
    carCtx.translate(0, -car.y + carCanvas.height * 0.7);
    road.draw(carCtx);
    // road2.draw(ctx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "gray");
    }
    car.draw(carCtx, "blue");

    carCtx.restore();

    // starting NN drawing
    Visualizer.drawNetwork(networkCtx, car.brain);

    requestAnimationFrame(animate);
}