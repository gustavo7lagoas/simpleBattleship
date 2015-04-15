'user strict';
var Board = require('./Board.js');

function Battleship(shipsNumber, boardSize) {
    this.shipsNumber = shipsNumber;
    this.board = new Board(boardSize, boardSize);
    this.linesNumber = this.board.linesNumber;
    this.columnsNumber = this.board.columnsNumber;
    this.board = this.board.board;
    this.shipPositions = [];
};

Battleship.prototype = {
    constructor : Battleship,
    populateBoard : function() {
        var shipsPlaced = 0;
        while(shipsPlaced !== this.shipsNumber) {
            linePos = Math.floor(Math.random() * this.linesNumber);
            columnPos = Math.floor(Math.random() * this.columnsNumber);
            if(this.board[linePos][columnPos] !== 'x') {
                var position = new Array;
                position = [linePos, columnPos];
                this.board[linePos][columnPos] = 'x';
                shipsPlaced += 1;
                this.shipPositions.push(position);
            }
        }
    },
    isBoatHit : function(guess) {
        if(this.board[guess[0]][guess[1]] = 'x') {
            return true;
        } else {
            return false;
        }
    }
};

var myBattleship = new Battleship(4,2);
myBattleship.populateBoard();
console.log(myBattleship.isBoatHit([1,1]));

module.exports = Battleship;
