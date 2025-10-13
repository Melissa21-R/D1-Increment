//Creates the Button
const button = document.createElement("button");
button.innerHTML = "Brew 🍵";

//button juice
// Style the main tea button
button.style.fontSize = "36px"; // Big, bold, beautiful
button.style.margin = "14px 0";
button.style.padding = "20px 40px"; // Generous padding — feels tappable
button.style.backgroundColor = "#D4A5A5"; // Soft rose (like tea steam)
button.style.color = "#694545ff"; // Rich dark brown — earthy tea vibe
button.style.border = "6px solid #922d2dff"; // Bronze outline — like a teapot rim
button.style.borderRadius = "50px"; // Super rounded (pill-shaped)
button.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)"; // Soft depth
button.style.cursor = "pointer"; // Shows it's clickable
button.style.fontFamily = "Comic Sans MS, cursive"; // Fun, handcrafted feel
button.style.transition = "all 0.1s ease"; // Smooth for squish effect

// Optional: Slightly larger on hover
button.addEventListener("mouseover", () => {
  button.style.transform = "scale(1.05)";
  button.style.borderColor = "#922d2dff"; // Warmer on hover
});

button.addEventListener("mouseout", () => {
  button.style.transform = "scale(1)";
  button.style.borderColor = "#a84444ff";
});

//rest of button juice
// Style all upgrade buttons consistently
const styleUpgradeButton = (btn: HTMLButtonElement) => {
  btn.style.width = "80%";
  btn.style.maxWidth = "700px";
  btn.style.margin = "14px 0";
  btn.style.padding = "18px 24px";
  btn.style.fontSize = "18px";
  btn.style.borderRadius = "50px";
  btn.style.fontFamily = "Comic Sans MS, cursive";
  btn.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)";
  btn.style.cursor = "not-allowed"; // Initial state
  btn.style.opacity = "0.7";
  btn.style.transition = "all 0.1s ease";
  btn.style.textAlign = "center";
};

//add some steam juice when tea is brewed
function spawnSteam() {
  const steam = document.createElement("div");
  steam.style.position = "absolute";
  steam.style.width = "50px";
  steam.style.height = "50px";
  steam.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
  steam.style.borderRadius = "50%";
  steam.style.boxShadow = "0 0 15px 8px rgba(255, 255, 255, 0.3)";
  steam.style.pointerEvents = "none"; // No clicks
  steam.style.bottom = "60px"; // Rise from just above the floor

  // 🌫️ Random horizontal position across screen width
  const randomX = Math.random() * globalThis.innerWidth;
  steam.style.left = `${randomX}px`;

  // Start opacity and transition
  steam.style.opacity = "1";
  steam.style.transition = "transform 3s ease-out, opacity 3s ease-out";

  // Give it upward motion with a little drift
  const drift = Math.random() * 100 - 50; // -50 to +50px drift
  setTimeout(() => {
    steam.style.transform = `translate(-50%, -200px) translateX(${drift}px)`;
    steam.style.opacity = "0";
  }, 10);

  setTimeout(() => {
    if (steam.parentElement) steam.remove();
  }, 2100);

  document.body.appendChild(steam);
}

//Display for the counter
const display = document.createElement("div");
let counter: number = 0;

//initiate some variables
let counterGrowth: number = 0;
let teaAccumulator: number = 0;
let purchased1: number = 0;
let purchased2: number = 0;
let purchased3: number = 0;
let greenTeaHireCost = 10;
let oolongTeaHireCost = 100;
let blackTeaHireCost = 1000;

//make an update text function
function updateDisplay() {
  //juice for the display
  display.style.fontSize = "40px";
  display.style.color = "#421f0dff";
  display.style.fontFamily = "Comic Sans MS, cursive";
  display.style.margin = "10px 0";

  //normal update things
  display.textContent = `Tea Profits: $${counter.toFixed(1)}`;
  buttonUp1.disabled = counter < greenTeaHireCost;
  buttonUp1.textContent = `Hire Green Tea Brewers $${
    greenTeaHireCost.toFixed(1)
  } (Make $0.1 each cup) (Green Tea brewers hired: ${purchased1})`;
  buttonUp2.disabled = counter < oolongTeaHireCost;
  buttonUp2.textContent = `Hire Oolong Tea Brewers $${
    oolongTeaHireCost.toFixed(1)
  } (Make $2.00 each cup) (Oolong Tea brewers hired: ${purchased2})`;
  buttonUp3.disabled = counter < blackTeaHireCost;
  buttonUp3.textContent = `Hire Black Tea Brewers $${
    blackTeaHireCost.toFixed(1)
  } (Make $50.00 each cup) (Black Tea brewers hired: ${purchased3})`;

  //update button juice
  if (counter < greenTeaHireCost) {
    buttonUp1.style.cursor = "not-allowed";
    buttonUp1.style.opacity = "0.7";
  } else {
    buttonUp1.style.cursor = "pointer";
    buttonUp1.style.opacity = "1.0";
  }

  if (counter < oolongTeaHireCost) {
    buttonUp2.style.cursor = "not-allowed";
    buttonUp2.style.opacity = "0.7";
  } else {
    buttonUp2.style.cursor = "pointer";
    buttonUp2.style.opacity = "1.0";
  }

  if (counter < blackTeaHireCost) {
    buttonUp3.style.cursor = "not-allowed";
    buttonUp3.style.opacity = "0.7";
  } else {
    buttonUp3.style.cursor = "pointer";
    buttonUp3.style.opacity = "1.0";
  }
}

// add the clicking button event
button.addEventListener("click", () => {
  counter += 1;
  updateDisplay();
  spawnSteam();

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

buttonUp1.style.backgroundColor = "#a9d4a5ff"; // Soft rose (like tea steam)
buttonUp1.style.color = "#738871ff"; // Rich dark brown — earthy tea vibe
buttonUp1.style.border = "6px solid #708f6dff"; // Bronze outline — like a teapot rim
styleUpgradeButton(buttonUp1);

// Remove the old mouseover/out listeners first

buttonUp1.addEventListener("mouseover", () => {
  if (counter >= greenTeaHireCost) {
    buttonUp1.style.transform = "scale(1.05)";
    buttonUp1.style.borderColor = "#708f6dff";
  }
});

buttonUp1.addEventListener("mouseout", () => {
  buttonUp1.style.transform = "scale(1)";
  buttonUp1.style.borderColor = "#85a382ff";
});

//button 1 upgrade click
buttonUp1.addEventListener("click", () => {
  //buttonUp1 juice click
  buttonUp1.style.transform = "scale(0.75)";
  setTimeout(() => {
    buttonUp1.style.transform = "scale(1)";
  }, 100);

  //increase counter auto
  if (counter >= greenTeaHireCost) {
    counter -= greenTeaHireCost;
    greenTeaHireCost *= 1.15;
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
buttonUp2.style.backgroundColor = "#ceb871ff"; // Soft rose (like tea steam)
buttonUp2.style.color = "#837853ff"; // Rich dark brown — earthy tea vibe
buttonUp2.style.border = "6px solid #77693aff"; // Bronze outline — like a teapot rim
styleUpgradeButton(buttonUp2);

buttonUp2.addEventListener("mouseover", () => {
  if (counter >= oolongTeaHireCost) {
    buttonUp2.style.transform = "scale(1.05)";
    buttonUp2.style.borderColor = "#77693aff";
  }
});

buttonUp2.addEventListener("mouseout", () => {
  buttonUp2.style.transform = "scale(1)";
  buttonUp2.style.borderColor = "#918252ffff";
});

buttonUp2.addEventListener("click", () => {
  //buttonUp2 juice click
  buttonUp2.style.transform = "scale(0.75)";
  setTimeout(() => {
    buttonUp2.style.transform = "scale(1)";
  }, 100);

  //increase counter auto
  if (counter >= oolongTeaHireCost) {
    counter -= oolongTeaHireCost;
    oolongTeaHireCost *= 1.15;
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
buttonUp3.style.backgroundColor = "#b89160ff"; // Soft rose (like tea steam)
buttonUp3.style.color = "#705b42ff"; // Rich dark brown — earthy tea vibe
buttonUp3.style.border = "6px solid #664d2eff"; // Bronze outline — like a teapot rim
styleUpgradeButton(buttonUp3);

buttonUp3.addEventListener("mouseover", () => {
  if (counter >= blackTeaHireCost) {
    buttonUp3.style.transform = "scale(1.05)";
    buttonUp3.style.borderColor = "#664d2eff";
  }
});

buttonUp3.addEventListener("mouseout", () => {
  buttonUp3.style.transform = "scale(1)";
  buttonUp3.style.borderColor = "#796145ff";
});

buttonUp3.addEventListener("click", () => {
  //buttonUp3 juice click
  buttonUp3.style.transform = "scale(0.75)";
  setTimeout(() => {
    buttonUp3.style.transform = "scale(1)";
  }, 100);

  //increase counter auto
  if (counter >= blackTeaHireCost) {
    counter -= blackTeaHireCost;
    blackTeaHireCost *= 1.15;
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
  teaAccumulator += increment;

  while (teaAccumulator >= 1) {
    spawnSteam();
    teaAccumulator -= 1;
    spawnSteam();
  }
  updateDisplay();

  requestAnimationFrame(updateFrameTime);
}

//Set the whole thing in the center
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";
document.body.style.position = "relative";
document.body.style.backgroundColor = "#927465ff"; // Chocolate brown

//Adds the button to the page
document.body.appendChild(display);
requestAnimationFrame(updateFrameTime);
document.body.appendChild(button);
document.body.appendChild(buttonUp1);
document.body.appendChild(buttonUp2);
document.body.appendChild(buttonUp3);
