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
            myTextModeGame.Game = new Game(myTextModeGame.playsNumber, myTextModeGame.shipsNumber, myTextModeGame.boardSize);
        });
        context('Player Wins', function() {
            it('player wins with the minimal number of plays', function() {
                myTextModeGame._setDifficultyLevel('S', 'E');
                console.log("+++++++++++" + myTextModeGame.Game.Battleship.shipPositions);
                true.should.be.false;
            });
            it('player wins in the last attempt', function() {
                console.log("+++++++++++" + myTextModeGame.Battleship.shipPositions);
                console.log("+++++++++++" + myTextModeGame.Battleship.shipPositions);
                console.log("+++++++++++" + myTextModeGame.Battleship.shipPositions);
                true.should.be.false;
            });
        });
        context('Player Loses', function() {
            it('no more attempts', function(){
                console.log("+++++++++++" + myTextModeGame.Battleship.shipPositions);
                console.log("+++++++++++" + myTextModeGame.Battleship.shipPositions);
                console.log("+++++++++++" + myTextModeGame.Battleship.shipPositions);
                true.should.be.false;
            });
        });
    });
});
