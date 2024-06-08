const boxes = document.querySelectorAll(".box");
const win = document.querySelector("h2");
const btn = document.querySelector("#btn");
const newBtn = document.querySelector(".new-btn");
const start = document.querySelectorAll(".start");
const section1 = document.querySelector(".section-1");
const section2 = document.querySelector(".section-2");
const opponent = document.querySelector(".opponent");

let turn0 = true;
let count = 0;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Event listeners for start buttons
start.forEach(button => {
    button.addEventListener("click", () => {
        opponent.innerHTML = button.innerHTML;
        section1.classList.remove("old-btn");
        section2.classList.add("old-btn");
    });
});

// Event listeners for each box
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (opponent.innerHTML === "Friend") {
            handlePlayerMove(box);
        } else {
            handlePlayerMove(box);
            if (count < 9 && !checkWin()) {
                const compMove = computerMove();
                setTimeout(handlePlayerMove,1000,compMove);
            }
        }
    });
});

// Determine the computer's move
const computerMove = () => {
    let index;
    do {
        index = Math.floor(Math.random() * 9);
    } while (boxes[index].disabled);
    return boxes[index];
};

// Handle a player's move
const handlePlayerMove = (box) => {
    if (turn0) {
        box.innerHTML = "O";
    } else {
        box.innerHTML = "X";
    }
    box.disabled = true;
    turn0 = !turn0;
    count++;

    if (checkWin()) {
        displayWinner(box);
    } else if (count === 9) {
        displayDraw();
    }
};

// Check if there is a winning combination
const checkWin = () => {
    for (let combination of winningCombinations) {
        if (boxes[combination[0]].innerText !== "" &&
            boxes[combination[0]].innerText === boxes[combination[1]].innerText &&
            boxes[combination[1]].innerText === boxes[combination[2]].innerText) {
            return true;
        }
    }
    return false;
};

// Display the winner
const displayWinner = (box) => {
    win.innerText = `${box.innerText} WON THE GAME`;
    newBtn.classList.remove("old-btn");
    disableAllBoxes();
};

// Display a draw
const displayDraw = () => {
    win.innerText = `DRAW THE GAME`;
    newBtn.classList.remove("old-btn");
};

// Disable all boxes
const disableAllBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Enable all boxes
const enableAllBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Reset the game
const resetGame = () => {
    count = 0;
    turn0 = true;
    newBtn.classList.add("old-btn");
    win.innerText = "";
    enableAllBoxes();
};

// Full reset, including sections
const fullReset = () => {
    resetGame();
    section1.classList.add("old-btn");
    section2.classList.remove("old-btn");
};

// Event listeners for reset buttons
btn.addEventListener("click", fullReset);
newBtn.addEventListener("click", resetGame);