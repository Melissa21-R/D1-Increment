//Creates the Button
const button = document.createElement("button");
button.innerHTML = "🍵";

//Display for the counter
const display = document.createElement("div");
let counter: number = 0;

//Create the Base Text
display.textContent = `${counter}mg of Caffine`;

// add the clicking button event
button.addEventListener("click", () => {
  counter += 1;
  display.textContent = `${counter}mg of Caffine`;
});

//make it go up on its ownnnn
let lastTime: number = performance.now();

function updateFrameTime(currentTime: number) {
  const deltaTime = currentTime - lastTime; //time per frame
  lastTime = currentTime;

  const ammountPerSec = 1;
  const increment = (deltaTime / 1000) * ammountPerSec;

  counter += increment;
  display.textContent = `${counter.toFixed()}mg of Caffine`;

  requestAnimationFrame(updateFrameTime);
}

//Adds the button to the page
document.body.appendChild(display);
requestAnimationFrame(updateFrameTime);
document.body.appendChild(button);
