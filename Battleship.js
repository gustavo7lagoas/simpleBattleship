'user strict';
var Board = require('./Board.js');
var readline = require('readline');

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
            if(this.board.board[linePos][columnPos] !== 'x') {
                var position = new Array;
                position = [linePos, columnPos];
                this.board.board[linePos][columnPos] = 'x';
                shipsPlaced += 1;
                this.shipPositions.push(position);
            }
        }
    },
    playerGuess : function() {
        var guessNumber = 0;
        var rl = readline.createInterface({
            input : process.stdin,
            output : process.stdout
        });
        rl.question('Enter guess', function(guess) {
            console.log('Guess #', guessNumber);
            guessNumber += 1;
            rl.close();
        });
    }
};

var myBattleship = new Battleship(2,4,2);
myBattleship.populateBoard();
myBattleship.playerGuess();

module.exports = Battleship;
