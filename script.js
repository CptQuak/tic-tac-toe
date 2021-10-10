const gameBoard = (function () {
    let board = [
        ["X", "O", "X"],
        ["O", "O", "X"],
        ["O", "X", "X"],
    ];

    const render = (board) => {
        const boardWindow = document.querySelector(".gameboard");
        for (let row of board) {
            for (let field of row) {
                const cell = document.createElement("div");
                cell.classList.add(".cell");
                cell.textContent = field;
                boardWindow.appendChild(cell);
            }
        }
    };
    return {
        board,
        render,
    };
})();

const displayController = (function () {
    return {};
})();

const playerFactory = () => {
    const addMark = () => {};
    return {};
};

(() => {
    const player1 = playerFactory();
    gameBoard.render(gameBoard.board);
})();
