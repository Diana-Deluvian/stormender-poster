
// spray functionality courtesy of Cameron Little, https://codepen.io/apexskier/pen/BzoYJg

// The code works by basically appending a box-shadow of various colours to our mouse cursor

let cursorSettings = {
  colourChangeSpeed: 0.1,
  trailLength: 75,
  diameter: 18,
  fadeStart: 0.8
}

const cursor = document.getElementById('cursor');

let cursorPos = {
  x: -100,
  y: -100
};

function getPos(e) {
  return {
    x: e.pageX,
    y: e.pageY
  }
}

document.addEventListener('mousemove', function(e) {
  cursorPos = getPos(e);
});

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
  cursorPos = getPos(e.changedTouches[0]); 
});

function hideCursor(e) {
  cursorPos.x = -1000;
  cursorPos.y = -1000;
}

document.addEventListener('mouseleave', hideCursor);
document.addEventListener('touchend', hideCursor);
document.addEventListener('click', function(e) {
  console.log(JSON.stringify(cursorTrail));
});

let cursorTrail = [];

function sprayPaint(time){
  let hue = (time * cursorSettings.colourChangeSpeed) % 360;
  //360 because the hue colour wheel, is, in fact, a circle

  cursorTrail.push(Object.assign({
    hue: hue,
    speed: cursorTrail.length <= 1 ? 0 : ((pos, lastPos) => {
      return Math.sqrt(Math.pow(lastPos.x - pos.x, 2) + Math.pow(lastPos.y - pos.y, 2));
    })(cursorPos, cursorTrail[cursorTrail.length - 1])
  }, cursorPos));
  if (cursorTrail.length > cursorSettings.trailLength) {
    cursorTrail.shift();
  }

  cursor.style.top = `${cursorPos.y}px`;
  cursor.style.left = `${cursorPos.x}px`;

  cursor.style.backgroundColor = `hsl(${hue}, 50%, 50%)`;;

  cursor.style.boxShadow = cursorTrail.map((pos, i) => {
    const offsetX = pos.x - cursorPos.x;
    const offsetY = pos.y - cursorPos.y;
    const age = (cursorSettings.trailLength - i) / cursorSettings.trailLength;
    const fadeOut = age < cursorSettings.fadeStart ? 0 : Math.pow(4 * (age - cursorSettings.fadeStart), 2); 
    const color = `hsla(${pos.hue}, 50%, 50%, ${1 - fadeOut})`;
    return `${offsetX}px ${offsetY}px ${pos.speed + 1}px ${cursorSettings.diameter}px ${color}`;
  }).reverse().join(', ');

  //reversing the boxShadow places it under our mouse rather than above it

  window.requestAnimationFrame(sprayPaint);
}

window.requestAnimationFrame(sprayPaint);

