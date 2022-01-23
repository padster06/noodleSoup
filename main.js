let canvas, display;
let r = 280;

let minRad = 15;
let maxRad = 75;

function pickStart(radius) {
    let randomAngle = Math.floor(Math.random() * (Math.PI * 2));
    let startPos = [
        300 - Math.cos(randomAngle) * (r - radius - 4),
        300 - Math.sin(randomAngle) * (r - radius - 4),
    ];
    // console.log(startPos);
    // // console.log((300 + ));
    // if (
    //     Math.sqrt((300 - startPos[0]) ** 2 + (300 - startPos[1]) ** 2) >
    //     r - 50
    // ) {
    //     return pickStart();
    // } else return startPos;
    return startPos;
}

function startNoodle() {
    let radius = Math.floor(Math.random() * (maxRad - minRad)) + minRad;
    startPos = pickStart(radius);

    let randStart = Math.random() * Math.PI + Math.PI;
    let randEnd = Math.random() * (Math.PI * 2) - Math.PI;

    display.beginPath();
    display.arc(startPos[0], startPos[1], radius, randStart, randEnd);
    display.lineWidth = 7;
    display.strokeStyle = "#000";
    display.stroke();
    display.beginPath();
    display.arc(startPos[0], startPos[1], radius, randStart, randEnd);
    display.lineWidth = 5;
    display.strokeStyle = "#f2caaa";
    display.stroke();

    return { randStart, randEnd, radius, startPos };
}

function continueNoodle(info) {}

function noodle() {
    const start = startNoodle();

    const endCords = [
        start.startPos[0] - Math.cos(start.randEnd - Math.PI) * start.radius,
        start.startPos[1] - Math.sin(start.randEnd - Math.PI) * start.radius,
    ];

    const radius = Math.floor(Math.random() * (maxRad - minRad)) + minRad;
    const centr = [
        endCords[0] - Math.cos(start.randEnd - Math.PI) * radius,
        endCords[1] - Math.sin(start.randEnd - Math.PI) * radius,
    ];

    display.beginPath();
    display.arc(
        centr[0],
        centr[1],
        radius,
        Math.atan2(centr[1] - endCords[1], centr[0] - endCords[0]) - Math.PI,
        0,
        true
    );
    display.lineWidth = 7;
    display.strokeStyle = "#000";
    display.stroke();
    display.beginPath();
    display.arc(
        centr[0],
        centr[1],
        radius,
        Math.atan2(centr[1] - endCords[1], centr[0] - endCords[0]) - Math.PI,
        0,
        true
    );
    display.lineWidth = 5;
    display.strokeStyle = "#f2caaa";
    display.stroke();

    // display.beginPath();
    // display.arc(startPos[0], startPos[1], radius, 0, 2 * Math.PI);
    // display.stroke();
}

function init() {
    canvas = document.getElementById("canvas");
    canvas.height = canvas.width = 600;

    display = canvas.getContext("2d");

    begin();
}

function begin() {
    draw();
    noodle();
    // setInterval(draw, 10);
}

function draw() {
    //clear screen
    display.fillStyle = "#ddd";
    display.fillRect(0, 0, canvas.width, canvas.height);

    //draw bowel
    display.beginPath();
    display.fillStyle = "#333";
    display.arc(300, 300, r + 10, 0, 2 * Math.PI);
    display.fill();
    display.beginPath();
    display.fillStyle = "#999";
    display.arc(300, 300, r, 0, 2 * Math.PI);
    display.fill();
}
