/*jshint node:true*/
'use strict';

var Game = require('./Game');
var readline = require('readline');
var _ = require('lodash');
var _config = require('./gameModes.json');

function TextModeGame(playsNumber, shipsNumber, boardSize) {
    this.playsNumber = 2;
    this.shipsNumber = 2;
    this.boardSize =  2;
    this.guessNumber = 0;
    this.Game = {};
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
        that.rl.question('Select sea size: S, M, L? ', function(seaSize) {
            var normalizedSeaSize = that._setSeaSize(seaSize);
            that.rl.question('Select difficult: Easy(E), Normal(N), Hard(H)? ', function(difficultLevel) {
                that._setDifficultyLevel(normalizedSeaSize, difficultLevel);
                that.Game = new Game(that.playsNumber, that.shipsNumber, that.boardSize);
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
            case 'N':
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
        that.Game.Battleship.board.prettyPrint();
        console.log('Guesses remaining ', (this.playsNumber - guessCount +1));
        this.rl.question('Enter guess ', function(guess) {
            console.log('Guess # ', guessCount);
            var turnResult = that.Game.playerGuess(guess, guessCount);
            if(turnResult.gameStatus === 'end') {
                that.rl.close();
            } else {
                that.playerGuess(turnResult.turn);
            }
        });
    }
};

var myTextModeGame = new TextModeGame();
myTextModeGame.initGame();

module.exports = TextModeGame;

