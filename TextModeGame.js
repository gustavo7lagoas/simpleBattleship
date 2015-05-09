/*jshint node:true*/
'use strict';

var Battleship = require('./Battleship');
var readline = require('readline');
var _ = require('lodash');
var _config = require('./gameModes.json');

function TextModeGame(playsNumber, shipsNumber, boardSize) {
    this.playsNumber = playsNumber || 2;
    this.shipsNumber = shipsNumber || 2;
    this.boardSize = boardSize || 2;
    this.Battleship = new Battleship(this.shipsNumber, this.boardSize);
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
        that.rl.question('Select sea size: S, M, L, XL? ', function(seaSize) {
            var normalizedSeaSize = seaSize.toUpperCase();
            switch (normalizedSeaSize) {
                case 'S':
                case 'M':
                case 'L':
                    that.boardSize = _config[normalizedSeaSize].boardSize;
                    break;
                default:
                    console.log('This size does not exist. Size S chose');
                    that.boardSize = 2;
            }
            that._getDifficulty(normalizedSeaSize);
            //that.playerGuess(1);
        });
    },
    _getDifficulty : function(seaSize) {
        var that = this;
        that.rl.question('Select difficult: Easy(E), Medium(M), Hard(H)', function(difficult) {
            var normalizedDifficult = difficult.toUpperCase();
            switch (normalizedDifficult) {
                case 'E':
                case 'M':
                case 'H':
                    that.playsNumber = _config[seaSize].levels[normalizedDifficult].playsNumber;
                    that.shipsNumber = _config[seaSize].levels[normalizedDifficult].shipsNumber;
                    break;
                default:
                    console.log('This difficult does not exist. Easy mode chose');
                    that.playsNumber = _config[seaSize].levels.E.playsNumber;
                    that.shipsNumber = _config[seaSize].levels.E.shipsNumber;
            }
            console.log(that.playsNumber, that.shipsNumber);
            that.Battleship = new Battleship(that.shipsNumber, that.boardSize);
            that.Battleship.populateBoard();
            console.log(that.Battleship.shipPositions);
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
                    console.log(that._isPlayerWin());
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

var myTextModeGame = new TextModeGame();
myTextModeGame.initGame();

module.exports = TextModeGame;

