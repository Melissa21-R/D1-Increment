//1. Creates the main Button
const button = document.createElement("button");
let clickValue: number = 1;
button.innerHTML = `Brew 🍵 (+${clickValue})`;

//2. all the initial juice, button juice, and background juice
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

//Set the whole thing in the center
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";
document.body.style.position = "relative";
document.body.style.backgroundColor = "#927465ff"; // Chocolate brown

//Slightly larger on hover
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

//visual feedback: creates a rising steam particle when tea is brewed.
//Enhances click satisfaction -- like a hit effect in a rhythm games
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

  // Random horizontal position across screen width
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

//this is the container to hold all the upgraded buttons
const upgradesContainer = document.createElement("div");
upgradesContainer.style.display = "flex";
upgradesContainer.style.flexDirection = "column";
upgradesContainer.style.alignItems = "center";
upgradesContainer.style.textAlign = "center";
upgradesContainer.style.width = "100%";
upgradesContainer.style.margin = "10px 0";

//3. initial variables and initial button varaibles (dom elements)
//Display for the counter
const display = document.createElement("div");
let counter: number = 0;

//initiate some variables
let counterGrowth: number = 0;
let autoClickerProgress: number = 0;

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
  isMultiplier?: boolean;
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
  {
    name: "Stronger Brewing",
    cost: 2000,
    rate: 1,
    purchased: 0,
    description:
      "Upgrades the players brewing ability, brewing more per click!",
    colorTheme: {
      bg: "#d891d2ff",
      text: "#745d72ff",
      border: "#581e54ff",
    },
  },
  {
    name: "Brewing Training",
    cost: 5000,
    rate: 1,
    purchased: 0,
    description:
      "Trains all your brewers, they now produce better quality tea!",
    colorTheme: {
      bg: "#95cfc8ff",
      text: "#577470ff",
      border: "#2d4e4aff",
    },
    isMultiplier: false,
  },
];

//4. All of the functions
//updates the passive income rate based on owned upgrades
//called whenever an upgrade is purchased to recalculate total output
//recalculate the growth for my modifiersss
function updateBrewerRates() {
  const baseRates = [
    { rate: 1, count: items[0].purchased },
    { rate: 2, count: items[1].purchased },
    { rate: 5, count: items[2].purchased },
  ];
  const brewingTraining = getItemByName("Brewing Training");
  const multiplier = brewingTraining?.isMultiplier && brewingTraining.purchased
    ? brewingTraining.purchased
    : 0;

  counterGrowth = 0;
  baseRates.forEach(({ rate, count }) => {
    const boostedRate = rate + multiplier;
    counterGrowth += boostedRate * count;
  });
}

//helper function to get the name
const getItemByName = (name: string) =>
  items.find((item) => item.name === name);

//getting the new rate of an tea
function getEffectiveRate(item: Item): number {
  const baseRate = item.rate;
  const brewingTraining = getItemByName("Brewing Training");
  const trainingBonus = brewingTraining?.purchased || 0;
  return baseRate + trainingBonus;
}

const updateFunctions: (() => void)[] = [];

function updateDisplay() {
  display.style.fontSize = "40px";
  display.style.color = "#421f0dff";
  display.style.fontFamily = "Comic Sans MS, cursive";
  display.style.margin = "10px 0";

  display.textContent = `Tea Profits: $${counter.toFixed(1)}`;
  updateFunctions.forEach((updateFn) => updateFn());
}

//make it go up on its ownnnn
//Allows the counter to increment on its own
//continues to increase the counter by a set amount adding to the old upgrade when another is purchased
let lastTime: number = performance.now();

function updateFrameTime(currentTime: number) {
  const deltaTime = currentTime - lastTime; //time per frame
  lastTime = currentTime;

  const increment = (deltaTime / 1000) * counterGrowth;
  counter += increment;
  autoClickerProgress += increment;

  while (autoClickerProgress >= 1) {
    spawnSteam();
    autoClickerProgress -= 1;
    spawnSteam();
  }
  updateDisplay();

  requestAnimationFrame(updateFrameTime);
}

items.forEach((item) => {
  const upgradeButtons = document.createElement("button");
  styleUpgradeButton(upgradeButtons);

  function updateButton() {
    const effectiveRate = getEffectiveRate(item);
    let effectText: string;

    if (item.name === "Brewing Training") {
      const bonusPerLevel = 1; // Or = item.rate
      const totalBonus = item.purchased * bonusPerLevel;
      effectText = `Hire ${item.name} ($${
        item.cost.toFixed(1)
      }) +${totalBonus} profit/cup to all brewers (${item.purchased} hired)`;
    } else if (item.name === "Stronger Brewing") {
      const bonus = 1; // Or = item.rate
      const totalB = item.purchased * bonus;
      effectText = `${item.name} ($${
        item.cost.toFixed(1)
      }) +${totalB} profit/cup to you (${item.purchased} purcahsed)`;
    } else {
      effectText = `Hire ${item.name} ($${
        item.cost.toFixed(1)
      }) — Making $${effectiveRate}/cup (${item.purchased} hired)`;
    }

    upgradeButtons.textContent = `${effectText}`;
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

  //5. all of the event listeners

  upgradeButtons.addEventListener("mouseover", () => {
    if (!upgradeButtons.disabled) {
      upgradeButtons.style.transform = "scale(1.05)";
    }
  });
  upgradeButtons.addEventListener("mouseout", () => {
    upgradeButtons.style.transform = "scale(1)";
  });

  upgradeButtons.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      item.cost *= 1.15;
      item.purchased++;
      if (
        item.name !== "Stronger Brewing" && item.name !== "Brewing Training"
      ) {
        updateBrewerRates();
      } else if (item.name === "Stronger Brewing") {
        clickValue += item.rate;
        button.innerHTML = `Brew 🍵 (+${clickValue})`;
      }

      updateDisplay();
      updateButton();
      updateFunctions.forEach((fn) => fn());
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

button.addEventListener("click", () => {
  counter += clickValue;
  updateDisplay();
  spawnSteam(); // Visual feedback!

  // Satisfying squish animation
  button.style.transform = "scale(0.75)";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 100);
});

//6. initial UI set up

//Adds the button to the page
document.body.appendChild(display);
requestAnimationFrame(updateFrameTime);
document.body.appendChild(button);
document.body.appendChild(upgradesContainer);
