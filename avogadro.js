var Game = (function () {
    function Game(element, boardSize) {
        // Gonna be pretty laissez-faire
        // and allow `Game` to be instantiated however
        if (!(this instanceof Game)) {
            return new Game(element, boardSize);
        }
        this.boardSize = boardSize;
        this.element = element;
        this.reset();
    }
    Game.prototype.reset = function () {
        this.paused = true;
        this.board = this.initializeBoard(this.boardSize);
        this.initializeGame();
        this.togglePause(this.paused);
    };
    Game.prototype.initializeBoard = function initializeBoard(boardSize) {
        var newBoard = [];
        for (var i = 0; i < boardSize; i++) {
            var row = [];
            for (var j = 0; j < boardSize; j++) {
                row.push(false);
            }
            newBoard.push(row);
        }
        return newBoard;
    };
    Game.prototype.togglePause = function togglePause(state) {
        if (typeof state === 'undefined') {
            state = !(this.paused);
        }
        this.paused = state;
        this.startButton.textContent = state ? 'Stop' : 'Start'
    };
    Game.prototype.initializeGame = function initializeGame() {

        var container = document.createElement('div');
        container.classList.add('container');

        var startButton = document.createElement('button');
        startButton.textContent = 'Start';
        startButton.classList.add('start');
        this.startButton = startButton;

        var resetButton = document.createElement('button');
        resetButton.textContent = 'Reset';
        resetButton.classList.add('reset');

        var board = document.createElement('div');
        board.classList.add('board');
        board.addEventListener('click', function (evt) {
            console.log(evt.target)
        });


        this.board.forEach(function (r, rowIndex) {
            var row = document.createElement('div');
            row.classList.add('row')
            r.forEach(function (c, colIndex) {
                var cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = rowIndex;
                cell.dataset.col = colIndex;
                row.appendChild(cell);
            });
            board.appendChild(row);
        });

        container.appendChild(board);
        container.appendChild(startButton);
        container.appendChild(resetButton);
        this.element.appendChild(container);
    };
    return Game;
})();