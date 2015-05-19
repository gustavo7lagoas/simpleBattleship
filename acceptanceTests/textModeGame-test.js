/*jshint node:true*/
'use strict';

var should = require('chai').should();
var TextModeGame = require('../TextModeGame');
var _ = require('lodash');
var sinon = require('sinon');
var myTextModeGame;

describe('Text Mode Game', function() {
    describe('Game Play', function() {
        beforeEach(function() {
            myTextModeGame = new TextModeGame();
            myTextModeGame._setSeaSize('S');
            myTextModeGame._setDifficultyLevel('S', 'E');
            myTextModeGame._startGame(myTextModeGame.playsNumber, myTextModeGame.shipsNumber, myTextModeGame.boardSize);
            myTextModeGame.playerGuess = function(guessCount, guess) {
                return myTextModeGame.Game.playerGuess(guess, guessCount);
            };
            myTextModeGame.Game.Battleship.shipPositions[0] = {'line' : 0, 'column' :0};
        });
        context('Player Wins', function() {
            it('player wins with the minimal number of plays', function() {
                myTextModeGame._setDifficultyLevel('S', 'E');
                var guess = 'a1';
                var turnResult = myTextModeGame.playerGuess(1, guess);
                turnResult.gameStatus.should.equal('end');
            });
            it('player wins in the last attempt', function() {
                myTextModeGame._setDifficultyLevel('S', 'E');
                var guesses = ['a2', 'b1', 'a2'];
                for(var i = 0; i < 3; i++) {
                    var turnResult = myTextModeGame.playerGuess(i+1, guesses[i]);
                }
                turnResult.gameStatus.should.equal('end');
            });
        });
        context('Player Loses', function() {
            it('no more attempts', function(){
                myTextModeGame._setDifficultyLevel('S', 'E');
                var guesses = ['a2', 'b1', 'b2'];
                for(var i = 0; i < 3; i++) {
                    var turnResult = myTextModeGame.playerGuess(i+1, guesses[i]);
                }
                turnResult.gameStatus.should.equal('end');
            });
        });
    });
});
