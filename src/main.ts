//Creates the Button
const button = document.createElement("button");
button.innerHTML = "🍵";

//button juice
button.style.fontSize = "32px";
button.style.padding = "15px 30px";
button.style.backgroundColor = "#BFE3B4";

//Display for the counter
const display = document.createElement("div");
let counter: number = 0;
let counterGrowth: number = 0;

//Create the Base Text
display.textContent = `${counter}mg of Caffine`;

//make an update text function
function updateDisplay() {
  //juice for the display
  display.style.fontSize = "24px";
  display.style.fontFamily = "Comic Sans MS, cursive";
  display.style.margin = "10px 0";

  //normal update things
  display.textContent = `${counter.toFixed()}mg of Caffine`;
  buttonUp.disabled = counter < 10;
}

// add the clicking button event
button.addEventListener("click", () => {
  counter += 1;
  updateDisplay();

  //adding some juice when button pressed
  button.style.transform = "scale(0.75)";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 100);
});

//button upgrade set up
const buttonUp = document.createElement("button");
buttonUp.textContent = "Drink some Coffee (+1 mg)";
buttonUp.disabled = true;

//buttonUp juice
buttonUp.style.fontSize = "32px";
buttonUp.style.fontFamily = "Comic Sans MS, cursive";
buttonUp.style.padding = "15px 30px";
buttonUp.style.backgroundColor = "#81654f";

//button upgrade click
buttonUp.addEventListener("click", () => {
  //buttonUp juice click
  buttonUp.style.transform = "scale(0.75)";
  setTimeout(() => {
    buttonUp.style.transform = "scale(1)";
  }, 100);

  //increase counter auto
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

//Set the whole thing in the center
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";

//Adds the button to the page
document.body.appendChild(display);
requestAnimationFrame(updateFrameTime);
document.body.appendChild(button);
document.body.appendChild(buttonUp);
