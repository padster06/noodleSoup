let canvas, display;
let r = 280;

let minRad = 10;
let maxRad = 100;

function pickStart(radius) {
    let randomAngle = Math.floor(Math.random() * (Math.PI * 2));
    let startPos = [
        300 - Math.cos(randomAngle) * (r - radius - 4),
        300 - Math.sin(randomAngle) * (r - radius - 4),
    ];

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

    return { randStart, randEnd, radius, startPos, num: 0 };
}

function createArc(start, num) {
    let no;
    if (start.no) {
        no = start.no + 1;
    } else {
        no = 1;
    }

    let num2 = num + 1 || 0;

    const arcDir = no % 2 != 0;

    const endCords = [
        start.startPos[0] - Math.cos(start.randEnd - Math.PI) * start.radius,
        start.startPos[1] - Math.sin(start.randEnd - Math.PI) * start.radius,
    ];

    const radius =
        Math.floor(Math.random() * (maxRad - minRad)) +
        1.5 * minRad -
        minRad / 2;
    const centr = [
        endCords[0] - Math.cos(start.randEnd - Math.PI) * radius,
        endCords[1] - Math.sin(start.randEnd - Math.PI) * radius,
    ];

    const startRad =
        Math.atan2(centr[1] - endCords[1], centr[0] - endCords[0]) - Math.PI;

    const dist = Math.sqrt((300 - centr[0]) ** 2 + (300 - centr[1]) ** 2);

    let randRad = (Math.random() * Math.PI) / 2;

    if (num > 4000) {
        return false;
    }

    if (dist < r - radius) {
        return { centr, radius, randRad, endCords, no, arcDir, startRad };
    } else return createArc(start, num2);
}

function continueNoodle(start) {
    const arc = createArc(start);
    if (!arc) {
        return;
    }
    const num = start.num;
    const endCords = arc.endCords;
    const radius = arc.radius;
    const centr = arc.centr;
    const randRad = arc.randRad;
    const no = arc.no;
    const arcDir = arc.arcDir;
    const startRad = arc.startRad;

    display.beginPath();
    display.arc(centr[0], centr[1], radius, startRad, randRad, arcDir);
    display.lineWidth = 7;
    display.strokeStyle = "#000";
    display.stroke();
    display.beginPath();
    display.arc(centr[0], centr[1], radius, startRad, randRad, arcDir);
    display.lineWidth = 5;
    display.strokeStyle = "#f2caaa";
    display.stroke();

    return continueNoodle({
        randStart:
            Math.atan2(centr[1] - endCords[1], centr[0] - endCords[0]) -
            Math.PI,
        randEnd: randRad,
        radius,
        startPos: centr,
        no: no,
        num,
    });
}

function noodle() {
    setInterval(() => {
        const start = startNoodle();
        continueNoodle(start);
    }, 100);
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
