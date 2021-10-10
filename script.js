const gameBoard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
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
    function replace(event, currentPlayer) {
        if (event.target.textContent == "") {
            event.target.textContent = "X";
            board[event.target.dataset.cell - 1] = event.target.textContent;
        }
        stopGame(displayController.gameState);
    }
    function stopGame(gameState) {
        console.log(board);
        if (board.includes("X")) {
        }
    }
    return {
        board,
    };
})();

const displayController = (function () {
    let gameState = true;
    const display = document.querySelector(".display");

    return { gameState };
})();

const playerFactory = (name, sign) => {
    const playerTurn = false;
    const isWinner = false;
    return { name, sign, playerTurn, isWinner };
};

(() => {
    const player1 = playerFactory("player1", "X");
    const player2 = playerFactory("player2", "O");
})();
