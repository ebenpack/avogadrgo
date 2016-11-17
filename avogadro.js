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
        this.timeoutId = null;
        this.points = 0;
        this.chance = 0.9; // Set this arbitrarily for now
        this.board = this.initializeBoard(this.boardSize);
        this.initializeGame();
        this.togglePause(this.paused);
    };
    Game.prototype.getInterval = function getInterval() {
        // Increase game speed logarithmically
        // This is a little arbitrary right now.
        return Math.floor(
            1000 - Math.log(this.points + 1) // +1 to prevent infinity
        );
    };
    Game.prototype.toggleStart = function toggleStart() {
        this.paused = !this.paused;
        this.timeoutId = null;
        if (!this.paused) {
            this.tick();
        }
    };
    Game.prototype.toggleCell = function toggleCell(row, col, active) {
        if (typeof state !== 'undefined') {
            active = !this.board[row][col].active;
        }
        this.board[row][col].active = active;
        if (active) {
            this.board[row][col].element.children[0].classList.add('active');
        } else {
            this.board[row][col].element.children[0].classList.remove('active');
        }
    };
    Game.prototype.updateCell = function updateCell(row, col) {
        if (!this.board[row][col].active && Math.random() > this.chance) {
            this.toggleCell(row, col, true);
        }
    };
    Game.prototype.tick = function tick() {
        // Hold onto our context
        var game = this;
        if (!game.paused) {
            for (var rowIndex = 0; rowIndex < game.boardSize; rowIndex++) {
                for (var colIndex = 0; colIndex < game.boardSize; colIndex++) {
                    game.updateCell(rowIndex, colIndex);
                }
            }
            this.timeoutId = setTimeout(function () {
                game.tick();
            }, game.getInterval());
        }
    };
    Game.prototype.initializeBoard = function initializeBoard(boardSize) {
        var newBoard = [];
        for (var i = 0; i < boardSize; i++) {
            var row = [];
            for (var j = 0; j < boardSize; j++) {
                row.push({
                    active: false
                });
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
        var game = this;
        var container = document.createElement('div');
        container.classList.add('container');

        var startButton = document.createElement('button');
        startButton.textContent = 'Start';
        startButton.classList.add('start');
        startButton.addEventListener('click', function(){
            game.toggleStart();
        });
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
                cell.style.width = (100 / game.boardSize) + '%';
                var mole = document.createElement('div');
                mole.classList.add('mole');
                cell.appendChild(mole);
                row.appendChild(cell);
                c.element = cell;
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