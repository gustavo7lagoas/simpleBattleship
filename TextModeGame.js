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
    this.Battleship.populateBoard();
    this.guessNumber = 0;
    this.rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout
    });

}

TextModeGame.prototype = {
    constructor : TextModeGame,
    initGame : function() {
        this._getConfiguration();
    },
    _getConfiguration : function() {
        var boardSize, ships, guesses;
        var that = this;
        that.rl.question('Select sea size: S, M, L, XL, XXL? ', function(seaSize) {
            switch (seaSize) {
                case 'S':
                    boardSize = 2;
                    break;
                case 'M':
                    boardSize = 3;
                    break;
                case 'S':
                    boardSize = 5;
                    break;
                case 'S':
                    boardSize = 8;
                    break;
                case 'S':
                    boardSize = 13;
                    break;
                default:
                    console.log('This size does not exist. Size S chose');
                    boardSize = 2;
            }
            that.playerGuess(1);
        });
    },
    playerGuess : function(guessCount) {
        var that = this;
        that.Battleship.board.prettyPrint();
        this.rl.question('Enter guess ', function(guess) {
            console.log('Guess # ', guessCount);
            if(that._validateGuess(guess)){
                var formatedGuess = that._formatGuess(guess);
                if(that.Battleship.isBoatHit(formatedGuess)) {
                    if(that._isPlayerWin()) {
                        that._playerWin();
                        that.rl.close();
                    }
                    that.Battleship.markAsHit(formatedGuess);
                } else {
                    that.Battleship.markAsMiss(formatedGuess);
                }
            } else {
                console.log('What are you trying to hit?');
            }
            // is Game over?
            if(guessCount >= that.playsNumber) {
                that._playerLose();
                that.rl.close();
            } else {
                that.playerGuess(guessCount + 1);
            }
        });
    },
    _formatGuess : function(guess) {
        var guessLineAsIndex = guess[0].charCodeAt(0) - 'a'.charCodeAt(0);
        var guessColunmAsIndex = guess[1] -1;
        return {
            'line' : guessLineAsIndex,
            'column' : guessColunmAsIndex
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
