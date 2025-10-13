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

button.addEventListener("click", () => {
  counter += 1;
  updateDisplay();
  spawnSteam(); // Visual feedback!

  // Satisfying squish animation
  button.style.transform = "scale(0.75)";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 100);
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

//refractoring my buttons
interface Item {
  name: string;
  cost: number;
  rate: number;
  purchased: number;
  description: string;
  colorTheme: {
    bg: string;
    text: string;
    border: string;
  };
}

const items: Item[] = [
  {
    name: "Green Tea Apprentice",
    cost: 10,
    rate: 1,
    purchased: 0,
    description: "Brews Green tea with fresh leaves. Steady and slow.",
    colorTheme: {
      bg: "#a9d4a5ff",
      text: "#738871ff",
      border: "#708f6dff",
    },
  },
  {
    name: "Oolong Tea Artisan",
    cost: 100,
    rate: 2,
    purchased: 0,
    description: "Makes Oolong tea with flare, quick and efficent.",
    colorTheme: {
      bg: "#ceb871ff",
      text: "#837853ff",
      border: "#77693aff",
    },
  },
  {
    name: "Black Tea Master",
    cost: 500,
    rate: 5,
    purchased: 0,
    description:
      "Brews the best Black tea in the world, with quality and refinery",
    colorTheme: {
      bg: "#b89160ff",
      text: "#705b42ff",
      border: "#664d2eff",
    },
  },
];

//this is the contaien to hold all the upgraded buttons
const upgradesContainer = document.createElement("div");
upgradesContainer.style.display = "flex";
upgradesContainer.style.flexDirection = "column";
upgradesContainer.style.alignItems = "center";
upgradesContainer.style.textAlign = "center";
upgradesContainer.style.width = "100%";
upgradesContainer.style.margin = "10px 0";

const updateFunctions: (() => void)[] = [];

items.forEach((item) => {
  const upgradeButtons = document.createElement("button");
  styleUpgradeButton(upgradeButtons);

  function updateButton() {
    upgradeButtons.textContent = `Hire ${item.name} ($${
      item.cost.toFixed(1)
    }) — Making $${item.rate}/cup (${item.purchased} hired)`;
    upgradeButtons.style.backgroundColor = item.colorTheme.bg;
    upgradeButtons.style.color = item.colorTheme.text;
    upgradeButtons.style.borderColor = item.colorTheme.border;
    upgradeButtons.disabled = counter < item.cost;
    upgradeButtons.style.opacity = upgradeButtons.disabled ? "0.7" : "1.0";
    upgradeButtons.style.cursor = upgradeButtons.disabled
      ? "not-allowed"
      : "pointer";
  }
  updateFunctions.push(updateButton);

  upgradeButtons.addEventListener("mouseover", () => {
    if (!upgradeButtons.disabled) {
      upgradeButtons.style.transform = "scale(1.05)";
      upgradeButtons.style.borderColor = "#708f6dff";
    }
  });
  upgradeButtons.addEventListener("mouseout", () => {
    upgradeButtons.style.transform = "scale(1)";
    upgradeButtons.style.borderColor = "#85a382ff";
  });

  upgradeButtons.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      item.cost *= 1.15;
      counterGrowth += item.rate;
      item.purchased++;
      updateDisplay();
      updateButton();
      spawnSteam();
      upgradeButtons.style.transform = "scale(0.75)";
      setTimeout(() => {
        upgradeButtons.style.transform = "scale(1)";
      }, 100);
    }
  });

  updateButton();
  upgradesContainer.appendChild(upgradeButtons);
});

function updateDisplay() {
  display.style.fontSize = "40px";
  display.style.color = "#421f0dff";
  display.style.fontFamily = "Comic Sans MS, cursive";
  display.style.margin = "10px 0";

  display.textContent = `Tea Profits: $${counter.toFixed(1)}`;
  updateFunctions.forEach((updateFn) => updateFn());
}

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
document.body.appendChild(upgradesContainer);
