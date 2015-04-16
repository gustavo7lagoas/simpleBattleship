'user strict';
var Board = require('./Board.js');
var _ = require('lodash');

function Battleship(shipsNumber, boardSize) {
    this.shipsNumber = shipsNumber;
    this.board = new Board(boardSize, boardSize);
    this.linesNumber = this.board.linesNumber;
    this.columnsNumber = this.board.columnsNumber;
    this.shipPositions = [];
};

Battleship.prototype = {
    constructor : Battleship,
    populateBoard : function() {
        var shipsPlaced = 0;
        while(shipsPlaced !== this.shipsNumber) {
            linePos = Math.floor(Math.random() * this.linesNumber);
            columnPos = Math.floor(Math.random() * this.columnsNumber);
            if(!_.find(this.shipPositions, [linePos, columnPos])) {
                position = [linePos, columnPos];
                shipsPlaced += 1;
                this.shipPositions.push(position);
            }
        }
    },
    isBoatHit : function(guess) {
        if(_.find(this.shipPositions, guess)) {
            return true;
        } else {
            return false;
        }
    },
    markAsHit : function(guess) {
        this.board.markBoard(guess, '*');
    },
    markAsMiss : function(guess) {
        this.board.markBoard(guess, 'X');
    }
};

var myBattleship = new Battleship(4,2);
myBattleship.populateBoard();
console.log(myBattleship.isBoatHit([1,1]));

module.exports = Battleship;
