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

function createArc(start) {
    const endCords = [
        start.startPos[0] - Math.cos(start.randEnd - Math.PI) * start.radius,
        start.startPos[1] - Math.sin(start.randEnd - Math.PI) * start.radius,
    ];

    const radius = Math.floor(Math.random() * (maxRad - minRad)) + minRad;
    const centr = [
        endCords[0] - Math.cos(start.randEnd - Math.PI) * radius,
        endCords[1] - Math.sin(start.randEnd - Math.PI) * radius,
    ];

    let randRad = Math.random() * (50 * ((2 * Math.PI) / 100));

    return { centr, radius, randRad, endCords };
}

function continueNoodle(start) {
    let no;
    if (start.no) {
        no = start.no + 1;
    } else {
        no = 1;
    }

    const arc = createArc(start);
    const endCords = arc.endCords;
    const radius = arc.radius;
    const centr = arc.centr;
    const randRad = arc.randRad;

    display.beginPath();
    display.arc(
        centr[0],
        centr[1],
        radius,
        Math.atan2(centr[1] - endCords[1], centr[0] - endCords[0]) - Math.PI,
        randRad,
        no % 2 != 0
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
        randRad,
        no % 2 != 0
    );
    display.lineWidth = 5;
    display.strokeStyle = "#f2caaa";
    display.stroke();

    if (no > 10) return;

    continueNoodle({
        randStart:
            Math.atan2(centr[1] - endCords[1], centr[0] - endCords[0]) -
            Math.PI,
        randEnd: randRad,
        radius,
        startPos: centr,
        no: no,
    });
}

function noodle() {
    const start = startNoodle();
    continueNoodle(start);

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
