let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
// Logic for Player O
let turnO = true;
let count = 0;
const winPatterns = [
                      [0, 1, 2],
                      [0, 3, 6],
                      [0, 4, 8],
                      [1, 4, 7],
                      [2, 5, 8],
                      [2, 4, 6],
                      [3, 4, 5],
                      [6, 7, 8],
                    ];
// Logic to Reset the Game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Logic for Player turn O
        if(turnO){
            box.innerText = "0";
            turnO = false;
        }
        // Logic for Player turn X
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});
// Logic for Draw the Game
const gameDraw = () => {
    msg.innerText = `Game was Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
// Logic for Disable the Button 
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};
// Logic for Enable the Button 
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};
// Logic to see Winner
const showWinner = (Winner) => {
    msg.innerText = `Congratulations, Winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
// Logic to check Winner
const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        // check for Winning Pattern
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);