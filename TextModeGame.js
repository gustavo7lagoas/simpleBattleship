/*jshint node:true*/
'use strict';

var Battleship = require('./Battleship');
var GuessValidator = require('./GuessValidator');
var readline = require('readline');
var _ = require('lodash');
var _config = require('./gameModes.json');

function TextModeGame(playsNumber, shipsNumber, boardSize) {
    this.playsNumber = playsNumber || 2;
    this.shipsNumber = shipsNumber || 2;
    this.boardSize = boardSize || 2;
    this.guessNumber = 0;
    this.Battleship;
    this.GuessValidator;
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
            var normalizedSeaSize = that._setSeaSize(seaSize);
            that.rl.question('Select difficult: Easy(E), Medium(M), Hard(H)? ', function(difficultLevel) {
                that._setDifficultyLevel(normalizedSeaSize, difficultLevel);
                that.Battleship = new Battleship(that.shipsNumber, that.boardSize);
                that.Battleship.populateBoard();
                that.GuessValidator = new GuessValidator(that.Battleship);
                that.playerGuess(1);
            });
        });
    },
    _setSeaSize : function(seaSize) {
        var normalizedSeaSize = seaSize.toUpperCase();
        switch (normalizedSeaSize) {
            case 'S':
            case 'M':
            case 'L':
                this.boardSize = _config[normalizedSeaSize].boardSize;
                break;
            default:
                console.log('This size does not exist. Size S chose');
                normalizedSeaSize = 'S';
                this.boardSize = 2;
        }
        return normalizedSeaSize;
    },
    _setDifficultyLevel : function(seaSize, difficultLevel) {
        var normalizeddifficultLevel = difficultLevel.toUpperCase();
        switch (normalizeddifficultLevel) {
            case 'E':
            case 'M':
            case 'H':
                this.playsNumber = _config[seaSize].levels[normalizeddifficultLevel].playsNumber;
                this.shipsNumber = _config[seaSize].levels[normalizeddifficultLevel].shipsNumber;
                break;
            default:
                console.log('This difficult does not exist. Easy mode chose');
                normalizeddifficultLevel = 'E';
                this.playsNumber = _config[seaSize].levels.E.playsNumber;
                this.shipsNumber = _config[seaSize].levels.E.shipsNumber;
        }
        return normalizeddifficultLevel;
    },
    playerGuess : function(guessCount) {
        var that = this;
        that.Battleship.board.prettyPrint();
        console.log('Guesses remaining ', (this.playsNumber - guessCount +1));
        this.rl.question('Enter guess ', function(guess) {
            console.log('Guess # ', guessCount);
            if(that._isGameOver(guess, guessCount)) {
                that.rl.close();
            } else {
                that.playerGuess(guessCount + 1);
            }
        });
    },
    _isGameOver : function(guess, guessCount) {
        this._processGuess(guess);
        // is Game over?
        if(this._isPlayerWin()) {
            this._playerWin();
        } else if(guessCount >= this.playsNumber) {
            this._playerLose();
        }else {
            return false;
        }
        return true;
    },
    _processGuess : function(guess) {
        if(this.GuessValidator.validateGuess(guess)){
            var formatedGuess = this.GuessValidator.formatGuess(guess);
            if(this.Battleship.isBoatHit(formatedGuess)) {
                this.Battleship.markAsHit(formatedGuess);
            } else {
                this.Battleship.markAsMiss(formatedGuess);
            }
        } else {
            console.log('What are you trying to hit?');
        }
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
    }
};

var myTextModeGame = new TextModeGame();
myTextModeGame.initGame();

module.exports = TextModeGame;

