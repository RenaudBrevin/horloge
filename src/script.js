console.log(new Date())

const canvas = document.querySelector('#canvasRect')
const ctx = canvas.getContext('2d')


  // Set display size (vw/vh).
var sizeWidth = 48 * window.innerWidth / 100
var sizeHeight = 55 * window.innerHeight / 100

  //Setting the canvas site and width to be responsive 
  canvas.width = sizeWidth;
  canvas.height = sizeHeight;

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height)


// Set my containers sizes
const canvasW = canvas.width
const canvasH = canvas.height

const containerW = canvasW / 4
const containerH = canvasH - canvasH / 10

// Set my alpha value
let gray = 0;

// Draw my containers 
ctx.strokeStyle = 'white';
ctx.lineWidth = 2;

// Get the time
let secondes = new Date().getSeconds()
let minutes = new Date().getMinutes()
let hours = new Date().getHours()

const secondesH = containerH / 60
const minutesH = containerH / 60
const hoursH = containerH / 24

let originSecondesX = containerW * 3 + containerW * 0.75
let originSecondesY = canvasH * 0.95

let originMinutesX = containerW * 2 + containerW * 0.5
let originMinutesY = canvasH * 0.95

let originHoursX = containerW + containerW * 0.25
let originHoursY = canvasH * 0.95

for (let i = 0; i < 3; i++) {
    ctx.strokeRect((containerW * i + containerW * (i + 1) / 4) - 2, (canvasH / 20) - 2, containerW + 4, containerH + 4);
}

// Draw the time
firstDrawSeconds()
firstDrawMinutes()
firstDrawHours()

// Update the time
setInterval(() => {
    const newSeconds = new Date().getSeconds();
    const newMinutes = new Date().getMinutes();
    const newHours = new Date().getHours();

    // Check if seconds reached 60
    if (newSeconds === 0 && secondes !== 0) {
        animateSecondsReset();

        // Update minutes
        if (newMinutes === 0 && minutes !== 0) {
            animateMinutesReset();

            // Update hours
            if (newHours === 0 && hours !== 0) {
                animateHoursReset();
            } else {
                hours = newHours;
                drawHours();
            }
        } else {
            minutes = newMinutes;
            drawMinutes();
        }
    } else {
        secondes = newSeconds;
        drawSeconds();
    }




}, 1000);


// Function to animate seconds reset
function animateSecondsReset() {
    let interval = setInterval(() => {
        if (secondes === 0) {
            clearInterval(interval);
            drawSeconds();
        } else {
            ctx.save();
            ctx.fillStyle = 'black';
            ctx.translate(originSecondesX, originSecondesY);
            ctx.rotate(90 * Math.PI / 2);
            ctx.translate(-(originSecondesX), -(originSecondesY));
            ctx.fillRect(originSecondesX, originSecondesY, containerW, containerH);
            ctx.restore();

            // Decrement seconds smoothly
            secondes -= 1;
            drawSeconds();
        }
    }, 1000 / 60);
}

// Function to animate minutes reset
function animateMinutesReset() {
    let interval = setInterval(() => {
        if (minutes === 0) {
            clearInterval(interval);
            drawMinutes();
        } else {
            ctx.save();
            ctx.fillStyle = 'black';
            ctx.translate(originMinutesX, originMinutesY);
            ctx.rotate(90 * Math.PI / 2);
            ctx.translate(-(originMinutesX), -(originMinutesY));
            ctx.fillRect(originMinutesX, originMinutesY, containerW, containerH);
            ctx.restore();

            // Decrement minutes smoothly
            minutes -= 1;
            drawMinutes();
        }
    }, 1000 / 60);
}

// Function to animate hours reset  
function animateHoursReset() {
    let interval = setInterval(() => {
        if (hours === 0) {
            clearInterval(interval);
            drawHours();
        } else {
            ctx.save();
            ctx.fillStyle = 'black';
            ctx.translate(originHoursX, originHoursY);
            ctx.rotate(90 * Math.PI / 2);
            ctx.translate(-(originHoursX), -(originHoursY));
            ctx.fillRect(originHoursX, originHoursY, containerW, containerH);
            ctx.restore();

            // Decrement hours smoothly
            hours -= 1;
            drawHours();
        }
    }, 1000 / 60);
}

// Function to draw seconds
function drawSeconds() {
    gray = 255 / 60 * secondes;

    ctx.fillStyle = 'rgb(' + gray + ',' + gray + ',' + gray + ')';
    ctx.save();
    ctx.translate(originSecondesX, originSecondesY);
    ctx.rotate(90 * Math.PI / 2);
    ctx.translate(-(originSecondesX), -(originSecondesY));
    ctx.fillRect(originSecondesX, (originSecondesY + secondes * secondesH) - 1, containerW, secondesH + 1);
    ctx.restore();

    fillDraw('seconds');
}

// Function to draw minutes
function drawMinutes() {
    gray = 255 / 60 * minutes;

    ctx.fillStyle = 'rgb(' + gray + ',' + gray + ',' + gray + ')';
    ctx.save();
    ctx.translate(originMinutesX, originMinutesY);
    ctx.rotate(90 * Math.PI / 2);
    ctx.translate(-(originMinutesX), -(originMinutesY));
    ctx.fillRect(originMinutesX, (originMinutesY + minutes * minutesH) - 1, containerW, minutesH + 1);
    ctx.restore();

    fillDraw('minutes');
}

// Function to draw hours
function drawHours() {
    gray = 255

    ctx.fillStyle = 'rgb(' + gray + ',' + gray + ',' + gray + ')';
    ctx.save();
    ctx.translate(originHoursX, originHoursY);
    ctx.rotate(90 * Math.PI / 2);
    ctx.translate(-(originHoursX), -(originHoursY));
    ctx.fillRect(originHoursX, (originHoursY + hours * hoursH) - 1, containerW, hoursH + 1);
    ctx.restore();

    fillDraw('hours');
}

function firstDrawSeconds() {
    for (let i = 0; i < secondes + 1; i++) {
        gray = 255 / 60 * i;

        ctx.fillStyle = 'rgb(' + gray + ',' + gray + ',' + gray + ')';
        ctx.save();
        ctx.translate(originSecondesX, originSecondesY);
        ctx.rotate(90 * Math.PI / 2);
        ctx.translate(-(originSecondesX), -(originSecondesY));
        ctx.fillRect(originSecondesX, (originSecondesY + i * secondesH) - 1, containerW, secondesH + 1);
        ctx.restore();

        fillDraw('seconds')
    }
}

function firstDrawMinutes() {
    for (let i = 0; i < minutes + 1; i++) {
        gray = 255 / 60 * i;

        ctx.fillStyle = 'rgb(' + gray + ',' + gray + ',' + gray + ')';
        ctx.save();
        ctx.translate(originMinutesX, originMinutesY);
        ctx.rotate(90 * Math.PI / 2);
        ctx.translate(-(originMinutesX), -(originMinutesY));
        ctx.fillRect(originMinutesX, (originMinutesY + i * minutesH) - 1, containerW, minutesH + 1);
        ctx.restore();

        fillDraw('minutes');
    }
}

function firstDrawHours() {
    for (let i = 0; i < hours + 1; i++) {
        gray = 255 / 24 * i;

        ctx.fillStyle = 'rgb(' + gray + ',' + gray + ',' + gray + ')';
        ctx.save();
        ctx.translate(originHoursX, originHoursY);
        ctx.rotate(90 * Math.PI / 2);
        ctx.translate(-(originHoursX), -(originHoursY));
        ctx.fillRect(originHoursX, (originHoursY + i * hoursH) - 1, containerW, hoursH + 1);
        ctx.restore();

        fillDraw('hours');
    }
}


function fillDraw(unit){
    if(unit === 'seconds'){
        var unitH = secondesH;
        var originX = containerW * 2 + containerW * 0.75;
        var originY = originSecondesY;
        var unitsMax = 60;
    } else if(unit === 'minutes'){
        var unitH = minutesH;
        var originX = containerW + containerW * 0.5;
        var originY = originMinutesY;
        var unitsMax = 60;
    } else if(unit === 'hours'){
        var unitH = hoursH;
        var originX =  containerW * 0.25;
        var originY = originHoursY;
        var unitsMax = 24;
    }

    ctx.fillStyle = 'white';
    ctx.fillRect(originX, originY - unitsMax * 0.25 * unitH, containerW, 3);
    ctx.fillRect(originX, originY - unitsMax * 0.5 * unitH, containerW, 3);
    ctx.fillRect(originX, originY - unitsMax * 0.75 * unitH, containerW, 3);
}




