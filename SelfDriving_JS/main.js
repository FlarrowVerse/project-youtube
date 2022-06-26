const canvas = document.getElementById("root")

canvas.width = 200;

const ctx = canvas.getContext("2d");

const road = new Road(canvas.width/2, canvas.width * 0.95);
const car = new Car(road.getLaneCenter(1), window.innerHeight - 20, 15, 30);

animate();

function animate() {
    car.update();
    canvas.height = window.innerHeight;
    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);
}