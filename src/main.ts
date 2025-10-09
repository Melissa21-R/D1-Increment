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
setInterval(() => {
  counter++;
  display.textContent = `${counter}mg of Caffine`;
}, 1000);

//Adds the button to the page
document.body.appendChild(display);
document.body.appendChild(button);
