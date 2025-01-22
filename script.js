const pictures = document.querySelectorAll('.Picture');
var previousTouch = undefined;

function updateElementPosition(element, event) {
  var movementX, movementY;

  if (event.type === 'touchmove') {
    const touch = event.touches[0];
    movementX = previousTouch ? touch.clientX - previousTouch.clientX : 0;
    movementY = previousTouch ? touch.clientY - previousTouch.clientY : 0;
    previousTouch = touch;
  } else {
    movementX = event.movementX;
    movementY = event.movementY;
  }
  
  const elementY = parseInt(element.style.top || 0) + movementY;
  const elementX = parseInt(element.style.left || 0) + movementX;

  element.style.top = elementY + "px";
  element.style.left = elementX + "px";
}

function startDrag(element, event) {
  const updateFunction = (event) => updateElementPosition(element, event);
  const stopFunction = () => stopDrag({ update: updateFunction, stop: stopFunction });
  document.addEventListener("mousemove", updateFunction);
  document.addEventListener("touchmove", updateFunction);
  document.addEventListener("mouseup", stopFunction);
  document.addEventListener("touchend", stopFunction);
}

function stopDrag(functions) {
  previousTouch = undefined;
  document.removeEventListener("mousemove", functions.update);
  document.removeEventListener("touchmove", functions.update);
  document.removeEventListener("mouseup", functions.stop);
  document.removeEventListener("touchend", functions.stop);
}

pictures.forEach(picture => {
  const range = 100;
  const randomX = Math.random() * (range * 2) - range;
  const randomY = Math.random() * (range * 2) - range;
  const randomRotate = Math.random() * (range / 2) - range / 4;
  const startFunction = (event) => startDrag(picture, event);
  picture.style.top = `${randomY}px`;
  picture.style.left = `${randomX}px`;
  picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;
  picture.addEventListener("mousedown", startFunction);
  picture.addEventListener("touchstart", startFunction);
});

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.textContent = '❄'; // Snowflake symbol
  snowflake.classList.add('snowflake');

  // Random horizontal position
  const startPosX = Math.random() * window.innerWidth; 
  // Random size for variety
  const size = Math.random() * 10 + 10; 
  // Random fall speed/duration
  const duration = Math.random() * 5 + 5; 
  // Random delay to stagger animation start
  const delay = Math.random() * 5; 

  // Apply styles directly to the snowflake
  snowflake.style.left = `${startPosX}px`;  // Horizontal position
  snowflake.style.fontSize = `${size}px`;  // Random size
  snowflake.style.animationDuration = `${duration}s`; // Falling speed
  snowflake.style.animationDelay = `${delay}s`;  // Staggered start

  // Add snowflake to body
  document.body.appendChild(snowflake);

  // Remove snowflake when it has finished falling
  snowflake.addEventListener('animationend', () => {
    snowflake.remove();
  });
}

// Create snowflakes at regular intervals
setInterval(createSnowflake, 150);
