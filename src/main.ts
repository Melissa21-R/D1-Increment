//Creates the Button
const button = document.createElement("button");
button.innerHTML = "🍵";

//Display for the counter
const display = document.createElement("div");
let counter: number = 0;
let counterGrowth: number = 0;

//Create the Base Text
display.textContent = `${counter}mg of Caffine`;

//make an update text function
function updateDisplay() {
  display.textContent = `${counter.toFixed()}mg of Caffine`;
  buttonUp.disabled = counter < 10;
}

// add the clicking button event
button.addEventListener("click", () => {
  counter += 1;
  updateDisplay();
});

//button upgrade set up
const buttonUp = document.createElement("button");
buttonUp.textContent = "Drink some Coffee (+1 Sec)";
buttonUp.disabled = true;

//button upgrade click
buttonUp.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    counterGrowth += 1;
    updateDisplay();
  }
});

//make it go up on its ownnnn
let lastTime: number = performance.now();

function updateFrameTime(currentTime: number) {
  const deltaTime = currentTime - lastTime; //time per frame
  lastTime = currentTime;

  const increment = (deltaTime / 1000) * counterGrowth;

  counter += increment;
  updateDisplay();

  requestAnimationFrame(updateFrameTime);
}

//Adds the button to the page
document.body.appendChild(display);
requestAnimationFrame(updateFrameTime);
document.body.appendChild(button);
document.body.appendChild(buttonUp);
