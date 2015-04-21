/*jshint node:true*/
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

}

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
            console.log('Guess # ', guessCount);
            if(that._validateGuess(guess)){
                var formatedGuess = that._formatGuess(guess);
                console.log(formatedGuess);
                if(that.Battleship.isBoatHit(formatedGuess)) {
                    that.Battleship.markAsHit(formatedGuess);
                } else {
                    that.Battleship.markAsMiss(formatedGuess);
                }
                if(guessCount === that.playsNumber) {
                    that._playerLose();
                    that.rl.close();
                } else {
                    if(that._isPlayerWin()) {
                        that._playerWin();
                    } else {
                        that.playerGuess(guessCount + 1);
                    }
                }
            } else {
                console.log('What are you trying to hit?');
                that.playerGuess(guessCount + 1);
            }
        });
    },
    _formatGuess : function(guess) {
        return {
            'line' : guess[0],
            'column' : guess[1]
        };
    },
    _playerLose : function() {
        console.log('You lose!');
        this.Battleship.markAllNonHitShips();
        this.Battleship.board.prettyPrint();
    },
    _isPlayerWin : function() {
        return this.Battleship.isAllShipsHit();
    },
    _playerWin : function() {
        console.log('You win!');
    },
    _validateGuess : function(guess) {
        if(guess.length === 2 && this._validateGuessCoordinates(guess)) {
            return true;
        }
        return false;
    },
    _validateGuessCoordinates : function(guess) {
        var boardLastLine = String.fromCharCode((this.Battleship.board._firstLine.charCodeAt(0) + this.Battleship.board.columnsNumber) -1);
        if(guess[0] >= this.Battleship.board._firstLine &&
           guess[0] <= boardLastLine &&
           guess[1] > 0 &&
           guess[1] <= this.Battleship.board.columnsNumber)
            return true;
    }
};

var myTextModeGame = new TextModeGame(2,4,2);
myTextModeGame.initGame();
