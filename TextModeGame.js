'use strict';

var Battleship = require('./Battleship');
var readline = require('readline');
var _ = require('lodash');

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
        this.Battleship.populateBoard();
        this.playerGuess(1);
    },
    playerGuess : function(guessCount) {
        var that = this;
        that.Battleship.board.prettyPrint();
        this.rl.question('Enter guess ', function(guess) {
            if(guessCount === that.playsNumber) {
                console.log('You lose!');
                that.rl.close();
            } else {
                console.log('Guess #', guessCount);
                var formatedGuess = that.formatGuess(guess);
                console.log(formatedGuess);
                if(that.Battleship.isBoatHit(formatedGuess)) {
                    that.Battleship.markAsHit(formatedGuess);
                } else {
                    that.Battleship.markAsMiss(formatedGuess);
                }
                that.playerGuess(guessCount + 1);
            }
        });
    },
    formatGuess : function(guess) {
        return _.map(guess.split(','), function(guessAsString) {
            return parseInt(guessAsString);
        })
    }
}

var myTextModeGame = new TextModeGame(2,4,2);
myTextModeGame.initGame();
