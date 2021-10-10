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

const player1 = playerFactory("player122", "X");
const player2 = playerFactory("player2", "O");

const gameBoard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameState = true;
    let currentPlayer = player1;
    //cache dom
    getCurrentPlayer();

    //
    events.on("restartGame", gameRestart);

    const cells = document.querySelectorAll(".card");
    cells.forEach((cell) => {
        cell.addEventListener("click", replace);
    });

    function replace(event) {
        if (gameState && event.target.textContent == "") {
            board[event.target.dataset.cell - 1] = currentPlayer.sign;
            event.target.textContent = board[event.target.dataset.cell - 1];
        }
        stopGame();
        // nextPlayer();
        // getCurrentPlayer();
    }
    function stopGame() {
        //need logic
        if (board[0] == "X" && board[1] == "X" && board[2] == "X") {
            gameState = false;
            // events.emit("displayButton");
            events.emit("winnerFound", currentPlayer);
        }
    }

    function nextPlayer() {}
    function getCurrentPlayer() {}
    function gameRestart() {
        // events.emit("displayButton");
        board = ["", "", "", "", "", "", "", "", ""];
        gameState = true;
        currentPlayer = player1;
        cells.forEach((cell) => (cell.textContent = ""));
    }
    return {
        board,
    };
})();

const displayController = (function () {
    const display = document.querySelector(".display");
    const restartButton = document.querySelector("#restart");
    // restartButton.classList.add("hidden");
    restartButton.addEventListener("click", () => {
        events.emit("restartGame");
    });
    //bindevent
    events.on("winnerFound", renderWinner);
    events.on("setplayer", renderCurrentPlayer);
    events.on("displayButton", buttonDisplay);

    //button to reset board using board api
    function renderCurrentPlayer(player) {
        display.textContent = `${player.name} turn, player sign is: ${player.sign}`;
    }
    function renderWinner(player) {
        display.textContent = `${player.name} won`;
    }

    function buttonDisplay() {
        restartButton.classList.toggle("hidden");
    }
    return {};
})();

//ability to change who is starting
events.emit("setplayer", player1);
