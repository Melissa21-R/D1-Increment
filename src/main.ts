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
let purchased1: number = 0;
let purchased2: number = 0;
let purchased3: number = 0;

//Create the Base Text
display.textContent = `${counter}mg of Caffine`;

//make an update text function
function updateDisplay() {
  //juice for the display
  display.style.fontSize = "24px";
  display.style.fontFamily = "Comic Sans MS, cursive";
  display.style.margin = "10px 0";

  //normal update things
  display.textContent = `$${counter.toFixed(1)} made`;
  buttonUp1.disabled = counter < 10;
  buttonUp1.textContent =
    `Hire Green Tea Brewers (Make $0.1 each cup) (Green Tea brewers hired: ${purchased1})`;
  buttonUp2.disabled = counter < 100;
  buttonUp2.textContent =
    `Hire Oolong Tea Brewers (Make $2.00 each cup) (Oolong Tea brewers Hired: ${purchased2})`;
  buttonUp3.disabled = counter < 1000;
  buttonUp3.textContent =
    `Hire Black Tea Brewers (Make $50.00 each cup) (Black Tea brewers Hired: ${purchased3})`;
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

//button 1 upgrade set up
const buttonUp1 = document.createElement("button");
buttonUp1.textContent = "Hire Green Tea Brewers (Make $0.1 each cup)";
buttonUp1.disabled = true;

//buttonUp1 juice
buttonUp1.style.fontSize = "32px";
buttonUp1.style.fontFamily = "Comic Sans MS, cursive";
buttonUp1.style.padding = "15px 30px";
buttonUp1.style.backgroundColor = "#81654f";

//button 1 upgrade click
buttonUp1.addEventListener("click", () => {
  //buttonUp1 juice click
  buttonUp1.style.transform = "scale(0.75)";
  setTimeout(() => {
    buttonUp1.style.transform = "scale(1)";
  }, 100);

  //increase counter auto
  if (counter >= 10) {
    counter -= 10;
    counterGrowth += 0.1;
    purchased1 += 1;
    updateDisplay();
  }
});

//button 2 upgrade set up
const buttonUp2 = document.createElement("button");
buttonUp2.textContent = "Hire Oolong Tea Brewers (Make $2.00 each cup)";
buttonUp2.disabled = true;

//buttonUp2 juice
buttonUp2.style.fontSize = "32px";
buttonUp2.style.fontFamily = "Comic Sans MS, cursive";
buttonUp2.style.padding = "15px 30px";
buttonUp2.style.backgroundColor = "#81654f";

buttonUp2.addEventListener("click", () => {
  //buttonUp2 juice click
  buttonUp2.style.transform = "scale(0.75)";
  setTimeout(() => {
    buttonUp2.style.transform = "scale(1)";
  }, 100);

  //increase counter auto
  if (counter >= 100) {
    counter -= 100;
    counterGrowth += 2;
    purchased2 += 1;
    updateDisplay();
  }
});

//button 3 upgrade set up
const buttonUp3 = document.createElement("button");
buttonUp3.textContent = "Hire Black Tea Brewers (Make $50.00 each cup)";
buttonUp3.disabled = true;

//buttonUp3 juice
buttonUp3.style.fontSize = "32px";
buttonUp3.style.fontFamily = "Comic Sans MS, cursive";
buttonUp3.style.padding = "15px 30px";
buttonUp3.style.backgroundColor = "#81654f";

buttonUp3.addEventListener("click", () => {
  //buttonUp3 juice click
  buttonUp3.style.transform = "scale(0.75)";
  setTimeout(() => {
    buttonUp3.style.transform = "scale(1)";
  }, 100);

  //increase counter auto
  if (counter >= 1000) {
    counter -= 1000;
    counterGrowth += 50;
    purchased3 += 1;
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
document.body.appendChild(buttonUp1);
document.body.appendChild(buttonUp2);
document.body.appendChild(buttonUp3);
