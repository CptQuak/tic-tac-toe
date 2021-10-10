const gameBoard = (function () {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    const renderBoard = (player, enemy) => {
        const boardWindow = document.querySelector(".gameboard");
        for (let row in board) {
            for (let field in board[row]) {
                const cell = document.createElement("div");
                cell.classList.add(".cell");
                cell.textContent = board[row][field];
                cell.dataset.position = `${row}-${field}`;
                cell.addEventListener("click", () => {
                    player.playerTurn = !player.playerTurn;
                    enemy.playerTurn = !enemy.playerTurn;
                    displayController.isWinner(board, player, enemy);
                    if (cell.textContent == "" && displayController.isGame) {
                        if (player.playerTurn) {
                            cell.textContent = player.sign;
                            board[row][field] = player.sign;
                        } else {
                            cell.textContent = enemy.sign;
                            board[row][field] = enemy.sign;
                        }
                    }
                    console.log(board);

                    //sprawdzic czy gra dalej trwa
                });
                boardWindow.appendChild(cell);
            }
        }
    };
    return {
        board,
        renderBoard,
    };
})();

const displayController = (function () {
    const isGame = true;
    const startGame = (player, enemy) => {
        player.playerTurn = true;
        gameBoard.renderBoard(player, enemy);
    };
    const isWinner = (board, player, enemy) => {
        for (let row in board) {
            if (row == [`${player.sign}`, `${player.sign}`, `${player.sign}`]) {
                player.isWinner = true;
                isGame = false;
            } else if (
                row == [`${enemy.sign}`, `${enemy.sign}`, `${enemy.sign}`]
            ) {
                enemy.isWinner = true;
                isGame = false;
            }
        }
    };
    return { isGame, startGame, isWinner };
})();

const playerFactory = (name, sign) => {
    const playerTurn = false;
    const isWinner = false;
    return { name, sign, playerTurn };
};

(() => {
    const player1 = playerFactory("player1", "X");
    const player2 = playerFactory("player2", "O");
    displayController.startGame(player1, player2);
})();
