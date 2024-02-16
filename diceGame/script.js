let timer = 0;
let totalTimer = 0;
let sum = 0;
let currentSum = 0;
let numDice = 1;
let dicePrice = 25;
let multiPrice = 100;
let multiplier = 1;
let timeRollPrice = 50;
let rebirthMultiplier = 1;
let rebirthPrice = 50000;
let maxDice = 5;
let startGame = true;

let displayTime = document.getElementById("displayTime");
let totalTimerDisplay = document.getElementById("totalTimerDisplay");
let buyButton = document.getElementsByClassName("buy");
let description = document.getElementsByClassName("description");

let timeRoll = 5000;
const timeRollReuce = 500;

let isTrigger = [false, false, false, false];

let total = 0;

let stateGame = 1; //1 - playing, 0 - pause

const numDiceDisplay = document.getElementById("diceCount");
const multiplierDisplay = document.getElementById("multiplyCount");
const totalDisplay = document.getElementById("total");
const timeRollDisplay = document.getElementById("timeRoll");
const rebirthDisplay = document.getElementById("rebirth");
const stopDisplay = document.getElementById("modal-stop");

function intialize() {
    const diceImg = document.getElementById("diceImg");
    diceImg.innerHTML = "<img src='img/Dice1.png' alt='Dice 1' width='100'>";
    diceImg.style.visibility = "hidden";
    startGame = false;
}

//roll the dice
function rollDice() {
    const diceResult = document.getElementById("diceResult");
    const diceImg = document.getElementById("diceImg");
    diceImg.style.visibility = "visible";
    
    currentSum = 0;

    let hasCombo = [0, 0, 0, 0, 0, 0];
    isTrigger = [false, false, false, false];

    const imgs = [];

    for (let i = 1; i <= numDice; i++) {
        //random the number 1-6
        const value = Math.floor(Math.random() * 6) + 1;
        hasCombo[value - 1]++;
        imgs.push(`<img src="img/Dice${value}.png" alt="Dice ${value}" width="100">`);
        currentSum += value * multiplier * rebirthMultiplier;
    }
    for(let i = 0; i < 6; i++) {
        if(hasCombo[i] >= 5) {
            isTrigger[3] = true;
            hasCombo[i] -= 5;
            currentSum *= 5;
        }
        if(hasCombo[i] >= 4) {
            isTrigger[2] = true;
            hasCombo[i] -= 4;
            currentSum *= 4;
        }
        if(hasCombo[i] >= 3) {
            isTrigger[1] = true;
            hasCombo[i] -= 3;
            currentSum *= 3;
        }
        if(hasCombo[i] >= 2) {
            isTrigger[0] = true;
            hasCombo[i] -= 2;
            currentSum *= 2;
        }

    }
    diceImg.innerHTML = imgs.join(" ");
    sum += currentSum;
    total += currentSum;

}

//update the timer
function updateTime() {
    if(stateGame == 1){
        totalTimer++;
        timer++;
        if (timer >= timeRoll / 10) {
            rollDice();
            timer = 1;
        }
        let sec = Math.floor(timer / 100).toString().padStart(2, '0');
        let mnSec = Math.floor((timer % 100)).toString().padStart(2, '0');
        
        let totalMnSec = Math.floor((totalTimer % 100)).toString().padStart(2, '0');
        let totalSec = Math.floor((totalTimer / 100) % 60).toString().padStart(2, '0');
        let totalMinute = Math.floor((totalTimer / 6000) % 60).toString().padStart(2, '0');
        let totalHour = Math.floor(totalTimer / 360000).toString().padStart(2, '0');
        totalTimerDisplay.style.fontFamily = "monospace";
        displayTime.style.fontFamily = "monospace";
        totalTimerDisplay.textContent = totalHour + ':' + totalMinute + ':' + totalSec + ':' + totalMnSec;
        displayTime.textContent = sec + ':' + mnSec;
    }
}

//update the display
function updateDisplay() {
    
    diceResult.textContent = `Money: $${sum} | + $${currentSum}`;
    switch(isTrigger.indexOf(true)) {
        case 0:
            diceResult.textContent += " | Double";
            break;
        case 1:
            diceResult.textContent += " | Triple";
            break;
        case 2:
            diceResult.textContent += " | Quad";
            break;
        case 3:
            diceResult.textContent += " | Penta";
            break;
    }

    numDiceDisplay.textContent = "Dice: " + numDice + "/" + maxDice;
    multiplierDisplay.textContent = "Multiplier: " + multiplier;
    totalDisplay.textContent = "Total: $" + total;
    timeRollDisplay.textContent = "Time Roll: " + (timeRoll / 1000).toFixed(1) + "s";
    rebirthDisplay.textContent = "Rebirth: " + rebirthMultiplier;

    buyButton[1].textContent = `Buy x${(multiplier + 1)}`;
    description[0].textContent = `$${dicePrice}`;
    description[1].textContent = `$${multiPrice}`;
    description[2].textContent = `$${timeRollPrice}`;
    description[3].textContent = `$${rebirthPrice}`;

    if(numDice >= maxDice) {
        buyButton[0].textContent = "Max Dice";
        buyButton[0].classList.add("buttonDisabled");
    }else {
        buyButton[0].textContent = `Buy +1 Dice`;
        buyButton[0].classList.remove("buttonDisabled");
    }

    if(timeRoll <= 500 && rebirthMultiplier <= 5) {
        buyButton[2].classList.add("buttonDisabled");
    }else if(timeRoll <= 100 && rebirthMultiplier > 5){
        buyButton[2].classList.add("buttonDisabled");
    }else{
        buyButton[2].classList.remove("buttonDisabled");
    }
    if(rebirthMultiplier > 5 && timeRoll <= 500) {
        buyButton[2].textContent = "Time Roll - 0.1s";
    }else {
        buyButton[2].textContent = "Time Roll - 0.5s";
    }

}

//add 1 dice
buyButton[0].addEventListener("click", function () {
    if (sum >= dicePrice && numDice < maxDice) {
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
    if (rebirthMultiplier <= 5) {
        if (sum >= timeRollPrice && timeRoll > 500) {
            sum -= timeRollPrice;
            timeRoll -= timeRollReuce;
            timeRollPrice += 100;
            update();
        }
    } else {
        if (sum >= timeRollPrice && timeRoll > 100 && timeRoll <= 500) {
            sum -= timeRollPrice;
            timeRoll -= 100;
            timeRollPrice += 1000;
            update();
        }else if(sum >= timeRollPrice && timeRoll > 500){
            sum -= timeRollPrice;
            timeRoll -= timeRollReuce;
            timeRollPrice += 100;
            update();
        }
    }
});

//rebirth
buyButton[3].addEventListener("click", function () {
    if (sum >= rebirthPrice) {
        maxDice+=2;
        sum = 0;
        diceImg.innerHTML = "";
        currentSum = 0;
        rebirthMultiplier++;
        rebirthPrice *= 3;
        numDice = 1;
        dicePrice = 25 * rebirthMultiplier;
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

let c = addEventListener("keydown", function (e) {
    if (e.key === "p") {
        if(stateGame == 1)
            pauseGame();
        else
            resumeGame();
    } else if (e.key === "r") {
        resumeGame();
    } else if (e.key === "Escape") {
        resetGame();
    }
});

function pauseGame(){
    stateGame = 0;
    stopDisplay.style.visibility = "visible";
}

function resumeGame(){
    stopDisplay.style.visibility = "hidden";
    stateGame = 1;
}

function resetGame(){
    stateGame = 1;
    stopDisplay.style.visibility = "hidden";
    sum = 0;
    total = 0;
    timer = 0;
    currentSum = 0;
    numDice = 1;
    dicePrice = 25;
    multiPrice = 100;
    multiplier = 1;
    timeRollPrice = 50;
    rebirthMultiplier = 1;
    rebirthPrice = 50000;
    maxDice = 5;
    timeRoll = 5000;
    update();
}

if(stateGame == 1) {
    
    //update the display
    setInterval(updateDisplay, 10);
    //update the timer
    setInterval(updateTime, 5);
}

stopDisplay.style.visibility = "hidden";
if(startGame)
    intialize();
