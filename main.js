let canvas, display;
let r = 280;

let minRad = 15;
let maxRad = 75;

function pickStart() {
    let startPos = [
        Math.floor(Math.random() * 600),
        Math.floor(Math.random() * 600),
    ];
    console.log(startPos);
    // console.log((300 + ));
    if (
        Math.sqrt((300 - startPos[0]) ** 2 + (300 - startPos[1]) ** 2) >
        r - 50
    ) {
        return pickStart();
    } else return startPos;
}

function pickRandAng(startPos, rad) {
    let randAng = Math.floor(Math.random() * 360);
    const x = Math.cos((randAng * Math.PI) / 180) * rad + startPos[0];
    const y = Math.sin((randAng * Math.PI) / 180) * rad + startPos[1];

    // display.fillStyle = "#f00";
    // display.fillRect(x, y, 5, 5);

    if (Math.sqrt((300 - x) ** 2 + (300 - y) ** 2) > r - 10) {
        return pickRandAng(startPos, rad);
    } else return randAng;
}

function noodle() {
    startPos = pickStart();
    let radius = Math.floor(Math.random() * (maxRad - minRad)) + minRad;

    const randAng = pickRandAng(startPos, radius);
    const centrX = Math.cos((randAng * Math.PI) / 180) * radius + startPos[0];
    const centrY = Math.sin((randAng * Math.PI) / 180) * radius + startPos[1];

    let arcRad = Math.random() * (Math.PI * 2);

    display.beginPath();
    display.arc(
        centrX,
        centrY,
        radius,
        Math.atan2(startPos[1] - centrY, startPos[0] - centrX),
        arcRad
    );
    display.lineWidth = 7;
    display.strokeStyle = "#000";
    display.stroke();
    display.beginPath();
    display.arc(
        centrX,
        centrY,
        radius,
        Math.atan2(startPos[1] - centrY, startPos[0] - centrX),
        arcRad
    );
    display.lineWidth = 5;
    display.strokeStyle = "#f2caaa";
    display.stroke();

    display.fillStyle = "#000";
    display.fillRect(startPos[0], startPos[1], 5, 5);

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
