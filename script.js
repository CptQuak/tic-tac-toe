const gameBoard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameState = true;
    //cache dom
    const cells = document.querySelectorAll(".card");
    cells.forEach((cell) => {
        cell.addEventListener("click", replace);
    });
    //do i even need render?
    // render();
    // function render() {
    //     cells.forEach((cell) => {
    //         cell.textContent = board[Number(cell.dataset.cell - 1)];
    //     });
    // }
    function replace(event, player) {
        if (gameState && event.target.textContent == "") {
            board[event.target.dataset.cell - 1] = "X";
            event.target.textContent = board[event.target.dataset.cell - 1];
        }
        stopGame(displayController.gameState);
    }
    function stopGame() {
        //need logic
        if (board[0] == "X" && board[1] == "X" && board[2] == "X") {
            gameState = false;
            displayController.updateDisplay("Quak");
        }
    }
    return {
        board,
    };
})();

const displayController = (function () {
    const display = document.querySelector(".display");
    //button to reset board using board api
    function updateDisplay(player) {
        display.textContent = `${player} won`;
    }

    return { updateDisplay };
})();

const playerFactory = (name, sign) => {
    const playerTurn = false;
    const isWinner = false;
    return { name, sign, playerTurn, isWinner };
};

const player1 = playerFactory("player1", "X");
const player2 = playerFactory("player2", "O");
