/*jshint node:true*/
'use strict';

var Game = require('./Game');
var _ = require('lodash');
var _config = require('./gameModes.json');

function WebModeGame(seaSize, difficultyLevel) {
    this.seaSize = seaSize;
    this.difficultyLevel = difficultyLevel;
    this.playsNumber = 2;
    this.shipsNumber = 2;
    this.boardSize =  2;
    this.guessNumber = 0;
    this.Game = {};
}

WebModeGame.prototype = {
    constructor : WebModeGame,
    initGame : function() {
        this._getConfiguration(this.seaSize, this.difficultyLevel);
    },
    _getConfiguration : function() {
        this._setDifficultyLevel(this._setSeaSize(this.seaSize), this.difficultyLevel);
        this.Game = new Game(this.playsNumber, this.shipsNumber, this.boardSize);
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
    _startGame : function() {
        this.Game = new Game(this.playsNumber, this.shipsNumber, this.boardSize);
    },
    playerGuess : function(guess, guessCount) {
        this.Game.Battleship.board.prettyPrint();
        console.log('Guesses remaining ', (this.playsNumber - guessCount +1));
        console.log('Guess # ', guessCount);
        var turnResult = this.Game.playerGuess(guess, guessCount);
        if(turnResult.gameStatus === 'end') {
            console.log('Game Over!');
        } else {
            this.playerGuess(turnResult.turn);
        }
    }
};

//var myWebModeGame = new WebModeGame();
//myWebModeGame.initGame();

module.exports = WebModeGame;

