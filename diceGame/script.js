let displayTime = document.getElementById("displayTime");
let timer = 0;
let sum = 0;
let currentSum = 0;
let numDice = 1;
let dicePrice = 25;
let multiPrice = 100;
let multiplier = 1;
let timeRollPrice = 50;
let rebirthMultiplier = 1;
let rebirthPrice = 50000;

let buyButton = document.getElementsByClassName("buy");
let description = document.getElementsByClassName("description");

let timeRoll = 5000;
const timeRollReuce = 500;

let total = 0;

const numDiceDisplay = document.getElementById("diceCount");
const multiplierDisplay = document.getElementById("multiplyCount");
const totalDisplay = document.getElementById("total");
const timeRollDisplay = document.getElementById("timeRoll");
const rebirthDisplay = document.getElementById("rebirth");

//roll the dice
function rollDice() {

    const diceResult = document.getElementById("diceResult");
    const diceImg = document.getElementById("diceImg");
    currentSum = 0;

    const imgs = [];

    for (let i = 1; i <= numDice; i++) {
        //random the number 1-6
        const value = Math.floor(Math.random() * 6) + 1;
        imgs.push(`<img src="img/Dice${value}.png" alt="Dice ${value}" width="100">`);
        currentSum += value * multiplier * rebirthMultiplier;
    }
    diceImg.innerHTML = imgs.join(" ");
    sum += currentSum;
    total += currentSum;
    
}

//update the timer
function updateTime(){
    timer++;
    if(timer >= timeRoll/10){
        rollDice();
        timer = 1;
    }
    let sec = Math.floor(timer / 100).toString().padStart(2, '0');
    let mnSec = Math.floor((timer % 100)).toString().padStart(2, '0');
    displayTime.textContent = sec + ':' + mnSec;
}

//update the display
function update() {
    diceResult.textContent = `Money: $${sum} | + $${currentSum}`;
    
    numDiceDisplay.textContent = "Dice: " + numDice;
    multiplierDisplay.textContent = "Multiplier: " + multiplier;
    totalDisplay.textContent = "Total: $" + total;
    timeRollDisplay.textContent = "Time Roll: " + (timeRoll / 1000).toFixed(1) + "s";
    rebirthDisplay.textContent = "Rebirth: " + rebirthMultiplier;

    buyButton[1].textContent = `Buy x${(multiplier + 1)}`;
    description[0].textContent = `$${dicePrice}`;
    description[1].textContent = `$${multiPrice}`;
    description[2].textContent = `$${timeRollPrice}`;
    description[3].textContent = `$${rebirthPrice}`;
    
}

//add 1 dice
buyButton[0].addEventListener("click", function () {
    if (sum >= dicePrice) {
        sum -= dicePrice;
        numDice++;
        dicePrice += 50 * numDice;
        update();
    }
});

//add 1 multiplier
buyButton[1].addEventListener("click", function () {
    if (sum >= multiPrice) {
        sum -= multiPrice;
        multiplier++;
        multiPrice += 100 * multiplier;
        update();
    }
});

//reduce timeRoll by 0.5s
buyButton[2].addEventListener("click", function () {
    if (sum >= timeRollPrice && timeRoll > 500) {
        sum -= timeRollPrice;
        timeRoll -= timeRollReuce;
        timeRollPrice += 100;
        update();
    }
});

//rebirth
buyButton[3].addEventListener("click", function () {
    if (sum >= rebirthPrice) {
        sum = 0;
        diceImg.innerHTML = "";
        currentSum = 0;
        rebirthMultiplier++;
        rebirthPrice *= 3;
        numDice = 1;
        dicePrice = 25 *rebirthMultiplier;
        multiplier = 1;
        multiPrice = 100 * rebirthMultiplier;
        timeRoll = 5000;
        timeRollPrice = 100 * rebirthMultiplier;
        update();
    }
});

Array.from(buyButton).forEach((button) => {
    button.addEventListener("mouseover", function () {
        button.classList.add("hovered");
    });
    button.addEventListener("mouseout", function () {
        button.classList.remove("hovered");
    });
});

setInterval(update, 10);
setInterval(updateTime, 10);