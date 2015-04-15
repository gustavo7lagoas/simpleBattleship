'use strict';

var Battleship = require('./Battleship');
var readline = require('readline');

function TextModeGame(playsNumber, shipsNumber, boardSize) {
    this.playsNumber = playsNumber;
    this.shipsNumber = shipsNumber;
    this.boardSize = boardSize;
    this.Battleship = new Battleship(shipsNumber, boardSize);
    this.guessNumber = 0;
    this.rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout
    });

};

TextModeGame.prototype = {
    constructor : TextModeGame,
    initGame : function() {
        this.playerGuess(1);
    },
    playerGuess : function(guessCount) {
        var that = this;
        this.rl.question('Enter guess ', function(guess) {
            if(guessCount === that.playsNumber) {
                console.log('You lose!');
                that.rl.close();
            } else {
                console.log('Guess #', guessCount);
                that.playerGuess(guessCount + 1);
            }
        });
    }
}

var myTextModeGame = new TextModeGame(2,4,2);
myTextModeGame.initGame();
