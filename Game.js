/*jshint node:true*/
'use strict';

var Battleship = require('./Battleship');
var GuessValidator = require('./GuessValidator');
var readline = require('readline');
var _ = require('lodash');

function Game(playsNumber, shipsNumber, boardSize) {
    this.playsNumber = playsNumber;
    this.shipsNumber = shipsNumber;
    this.boardSize = boardSize;
    this.guessNumber = 0;
    this.Battleship = new Battleship(shipsNumber, boardSize);
    this.GuessValidator = new GuessValidator(this.Battleship);
}

Game.prototype = {
    constructor : Game,
    playerGuess : function(guess, guessCount) {
        var that = this;
        this._processGuess(guess);
        if(that._isGameOver(guess, guessCount)) {
            return {
                'gameStatus' : 'end',
                'turn' : guessCount
            };
        } else {
            return {
                'gameStatus' : 'continue',
                'turn' : guessCount + 1
            };
        }
    },
    _isGameOver : function(guess, guessCount) {
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

module.exports = Game;

