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
    };
    return Game;
})();