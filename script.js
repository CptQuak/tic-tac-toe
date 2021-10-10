const events = {
    events: {},
    on: function (eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function (eventName, fn) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: function (eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    },
};

const playerFactory = (name, sign) => {
    const playerTurn = false;
    const isWinner = false;
    return { name, sign, playerTurn, isWinner };
};

const player1 = playerFactory("Player1", "X");
player1.playerTurn = true;
const player2 = playerFactory("Player2", "O");

const gameBoard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameState = true;
    let currentPlayer = player1;
    //cache dom

    //
    events.on("restartGame", gameRestart);

    const cells = document.querySelectorAll(".card");
    cells.forEach((cell) => {
        cell.addEventListener("click", onCellClick);
    });

    function onCellClick(event) {
        if (gameState && event.target.textContent == "") {
            board[event.target.dataset.cell - 1] = currentPlayer.sign;
            event.target.textContent = board[event.target.dataset.cell - 1];
        }
        // console.log(player1.playerTurn);
        // console.log(player2.playerTurn);
        // console.log(currentPlayer);
        decideWinner();
        gameState && nextPlayer();
    }
    function decideWinner() {
        if (
            (board[0] == currentPlayer.sign &&
                board[1] == currentPlayer.sign &&
                board[2] == currentPlayer.sign) ||
            (board[3] == currentPlayer.sign &&
                board[4] == currentPlayer.sign &&
                board[5] == currentPlayer.sign) ||
            (board[6] == currentPlayer.sign &&
                board[7] == currentPlayer.sign &&
                board[8] == currentPlayer.sign) ||
            (board[0] == currentPlayer.sign &&
                board[3] == currentPlayer.sign &&
                board[6] == currentPlayer.sign) ||
            (board[1] == currentPlayer.sign &&
                board[4] == currentPlayer.sign &&
                board[7] == currentPlayer.sign) ||
            (board[2] == currentPlayer.sign &&
                board[5] == currentPlayer.sign &&
                board[8] == currentPlayer.sign) ||
            (board[0] == currentPlayer.sign &&
                board[4] == currentPlayer.sign &&
                board[8] == currentPlayer.sign) ||
            (board[2] == currentPlayer.sign &&
                board[4] == currentPlayer.sign &&
                board[6] == currentPlayer.sign)
        ) {
            gameState = false;
            events.emit("displayButton");
            events.emit("winnerFound", currentPlayer);
            highlight();
        }
        if (
            board[0] != "" &&
            board[1] != "" &&
            board[2] != "" &&
            board[3] != "" &&
            board[4] != "" &&
            board[5] != "" &&
            board[6] != "" &&
            board[7] != "" &&
            board[8] != "" &&
            gameState == true
        ) {
            gameState = false;
            events.emit("displayButton");
            events.emit("itsADraw");
        }
    }
    function highlight() {
        for (let i = 0; i < 6; i++) {
            if (
                board[i] == currentPlayer.sign &&
                board[i + 1] == currentPlayer.sign &&
                board[i + 2] == currentPlayer.sign
            ) {
                cells.forEach((cell) => {
                    if (
                        cell.dataset.cell - 1 == i ||
                        cell.dataset.cell - 1 == i + 1 ||
                        cell.dataset.cell - 1 == i + 2
                    ) {
                        cell.classList.add("highlight");
                    }
                });
            } else if (
                board[i] == currentPlayer.sign &&
                board[i + 4] == currentPlayer.sign &&
                board[i + 8] == currentPlayer.sign
            ) {
                cells.forEach((cell) => {
                    if (
                        cell.dataset.cell - 1 == i ||
                        cell.dataset.cell - 1 == i + 4 ||
                        cell.dataset.cell - 1 == i + 8
                    ) {
                        cell.classList.add("highlight");
                    }
                });
            } else if (
                board[i] == currentPlayer.sign &&
                board[i + 3] == currentPlayer.sign &&
                board[i + 6] == currentPlayer.sign
            ) {
                cells.forEach((cell) => {
                    if (
                        cell.dataset.cell - 1 == i ||
                        cell.dataset.cell - 1 == i + 3 ||
                        cell.dataset.cell - 1 == i + 6
                    ) {
                        cell.classList.add("highlight");
                    }
                });
            } else if (
                board[i + 2] == currentPlayer.sign &&
                board[i + 4] == currentPlayer.sign &&
                board[i + 6] == currentPlayer.sign
            ) {
                cells.forEach((cell) => {
                    if (
                        cell.dataset.cell - 1 == i + 2 ||
                        cell.dataset.cell - 1 == i + 4 ||
                        cell.dataset.cell - 1 == i + 6
                    ) {
                        cell.classList.add("highlight");
                    }
                });
            }
        }
    }
    function nextPlayer() {
        player1.playerTurn = !player1.playerTurn;
        player2.playerTurn = !player2.playerTurn;
        currentPlayer = player1.playerTurn ? player1 : player2;
        events.emit("setplayer", currentPlayer);
    }
    function gameRestart() {
        events.emit("displayButton");
        board = ["", "", "", "", "", "", "", "", ""];
        gameState = true;
        currentPlayer = player1;
        player1.playerTurn = true;
        cells.forEach((cell, index) => (cell.textContent = `${board[index]}`));
        events.emit("setplayer", currentPlayer);
        cells.forEach((cell) => {
            cell.classList.remove("highlight");
        });
    }
    return {
        board,
    };
})();

const displayController = (function () {
    const display = document.querySelector(".display");
    const restartButton = document.querySelector("#restart");
    restartButton.classList.add("hidden");
    restartButton.addEventListener("click", () => {
        events.emit("restartGame");
    });
    renderCurrentPlayer(player1);
    //bindevent
    events.on("winnerFound", renderWinner);
    events.on("setplayer", renderCurrentPlayer);
    events.on("displayButton", buttonDisplay);
    events.on("itsADraw", renderDraw);

    //button to reset board using board api
    function renderCurrentPlayer(player) {
        display.textContent = `${player.name} turn, player sign is: ${player.sign}`;
    }
    function renderWinner(player) {
        display.textContent = `${player.name} won`;
    }
    function renderDraw() {
        display.textContent = `No winner its a draw!`;
    }

    function buttonDisplay() {
        restartButton.classList.toggle("hidden");
    }
    return {};
})();

//ability to change who is starting
// events.emit("setplayer", player1);
