console.log(new Date())

const canvas = document.querySelector('#canvasCircle')
const ctx = canvas.getContext('2d')

  // Set display size (vw/vh).
  var sizeWidth = 48 * window.innerWidth / 100
  var sizeHeight = 55 * window.innerHeight / 100
  
    //Setting the canvas site and width to be responsive 
    canvas.width = sizeWidth;
    canvas.height = sizeHeight;

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height)

// Set circle parameters
const center = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

const canvasW = canvas.width
const canvasH = canvas.height

const radiusInsideSeconds = canvasW / 16;
const radiusSeconds = radiusInsideSeconds + 5;
const radiusInsideMinutes = radiusSeconds + canvasW / 16;
const radiusMinutes = radiusInsideMinutes + 5;
const radiusInsideHours = radiusMinutes + canvasW / 16;
const radiusHours = radiusInsideHours + 5;
const outsideRadius = radiusHours + canvasW / 16;

// Get the time
let seconds = new Date().getSeconds();
let minutes = new Date().getMinutes();
let hours = new Date().getHours();

// Update the time
setInterval(updateTime, 1000);

// Draw first time
drawCircle('hours', hours);
drawCircle('insideHours', 1);
drawCircle('minutes', minutes);
drawCircle('insideMinutes', 1);
drawCircle('seconds', seconds);
drawCircle('insideSeconds', 1);

function updateTime() {
    const newSeconds = new Date().getSeconds();
    const newMinutes = new Date().getMinutes();
    const newHours = new Date().getHours();
  
    // Check if seconds reached 60
    if (newSeconds === 0 && seconds !== 0) {
      drawCircle('insideMinutes', 0);
      if (newMinutes === 0 && minutes !== 0) {
        drawCircle('insideHours', 0);
        if (newHours === 0 && hours !== 0) {
            drawCircle('outside', 0);
        } else {
          hours = newHours;
          drawCircle('hours', hours);
          drawCircle('insideHours', 1); // Redraw insideHours circle
        }
      } else {
        minutes = newMinutes;
        drawCircle('minutes', minutes);
        drawCircle('insideMinutes', 1); // Redraw insideMinutes circle
      }
    } else {
      seconds = newSeconds;
      drawCircle('seconds', seconds);
      drawCircle('insideSeconds', 1); // Redraw insideSeconds circle
    }
  }

  
function drawCircle(unit, value) {
    if (unit.startsWith('inside')) {
      ctx.fillStyle = 'black'; // Set fill color to black for "inside" circles
    } else {
      let gray = 255 / getMaxValue(unit) * value;
      ctx.fillStyle = 'rgb(' + gray + ',' + gray + ',' + gray + ')';
    }
    ctx.beginPath();
    ctx.arc(center.x, center.y, getRadius(unit), -Math.PI / 2, (Math.PI * 2 * value / getMaxValue(unit)) - Math.PI / 2);
    ctx.lineTo(center.x, center.y);
    ctx.closePath();
    ctx.fill();
  }
  

function getColor(unit) {
  switch (unit) {
    case 'seconds':
      return `rgb(255, 0, 0)`
    case 'minutes':
      return `rgb(0, 255, 0)`
    case 'hours':
      return `rgb(0, 0, 255)`
    default:
      return `rgb(255, 255, 255)`
  }
}

function getRadius(unit) {
  switch (unit) {
    case 'outside':
        return outsideRadius;
    case 'insideHours':
      return radiusInsideHours;
    case 'insideMinutes':
      return radiusInsideMinutes;
    case 'insideSeconds':
      return radiusInsideSeconds;
    case 'seconds':
      return radiusSeconds;
    case 'minutes':
      return radiusMinutes;
    case 'hours':
      return radiusHours;
    default:
      return 0;
  }
}

function getMaxValue(unit) {
  switch (unit) {
    case 'outside':
    case 'insideHours':
    case 'insideMinutes':
    case 'insideSeconds':
      return 1;
    case 'seconds':
      return 60;
    case 'minutes':
      return 60;
    case 'hours':
      return 24;
    default:
      return 0;
  }
}