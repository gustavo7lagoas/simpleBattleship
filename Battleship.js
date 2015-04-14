'user strict';
var Board = require('./Board.js');

function Battleship(playsNumber, shipsNumber, boardSize) {
    this.playsNumber = playsNumber;
    this.shipsNumber = shipsNumber;
    this.board = new Board(boardSize, boardSize);
    this.shipPositions = [];
};

Battleship.prototype = {
    populateBoard : function() {
        var shipsPlaced = 0;
        while(shipsPlaced !== this.shipsNumber) {
            linePos = Math.floor(Math.random() * this.board.linesNumber);
            columnPos = Math.floor(Math.random() * this.board.columnsNumber);
            this.board.board[linePos][columnPos] = 'x';
            this.board.prettyPrint();
            shipsPlaced += 1;
        }
    }
};

var myBattleship = new Battleship(2, 4, 2);
myBattleship.populateBoard();

module.exports = Battleship;
