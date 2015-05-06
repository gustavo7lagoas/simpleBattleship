/*jshint node:true*/
'use strict';

var should = require('chai').should;
var TextModeGame = require('../TextModeGame');
var _ = require('lodash');
var sinon = require('sinon');

describe('Text Mode Game', function() {
    describe('Formating guesses', function() {
        it('format valid guess', function() {
            var unformatedGuess = 'a1';
            var myTextModeGame = new TextModeGame();
            myTextModeGame._formatGuess(unformatedGuess).should.deep.equal({'line':0,'column':0});
        });
    });
    describe('Validating guess', function() {
        it('validates valid guess', function() {
            var unformatedGuess = 'a1';
            var myTextModeGame = new TextModeGame();
            myTextModeGame._validateGuess(unformatedGuess).should.true;
        });
        it('validates valid guess for board size greater than 10', function() {
            var unformatedGuess = 'c10';
            var myTextModeGame = new TextModeGame(2, 10, 10);
            myTextModeGame._validateGuess(unformatedGuess).should.true;
        });
        it('validates invalid one character guess', function() {
            var unformatedGuess = '1';
            var myTextModeGame = new TextModeGame();
            myTextModeGame._validateGuess(unformatedGuess).should.false;
        });
        it('validates invalid three character guess', function() {
            var unformatedGuess = 'a1a';
            var myTextModeGame = new TextModeGame();
            myTextModeGame._validateGuess(unformatedGuess).should.false;
        });
        it('validates invalid blank guess', function() {
            var unformatedGuess = '';
            var myTextModeGame = new TextModeGame();
            myTextModeGame._validateGuess(unformatedGuess).should.false;
        });
        it('validates invalid out of board guess for column greater than total', function() {
            var unformatedGuess = 'a3';
            var myTextModeGame = new TextModeGame();
            myTextModeGame._validateGuess(unformatedGuess).should.false;
        });
        it('validates invalid out of board guess for column less than total', function() {
            var unformatedGuess = 'a0';
            var myTextModeGame = new TextModeGame();
            myTextModeGame._validateGuess(unformatedGuess).should.false;
        });
        it('validates invalid out of board guess for line', function() {
            var unformatedGuess = 'c1';
            var myTextModeGame = new TextModeGame();
            myTextModeGame._validateGuess(unformatedGuess).should.false;
        });
    });
    describe('isPlayerWin', function() {
        it('checks if battleship function for ships hit is called', function() {
            var myTextModeGame = new TextModeGame();
            myTextModeGame.Battleship.isAllShipsHit = sinon.spy();
            myTextModeGame._isPlayerWin();
            myTextModeGame.Battleship.isAllShipsHit.called.should.be.true;
        });
    });
    describe('playerLose', function() {
        it('checks if all player loosing functions are called', function() {
            var myTextModeGame = new TextModeGame();
            myTextModeGame.Battleship.markAllNonHitShips = sinon.spy();
            myTextModeGame.Battleship.board.prettyPrint = sinon.spy();
            myTextModeGame._playerLose();
            myTextModeGame.Battleship.markAllNonHitShips.called.should.be.true;
            myTextModeGame.Battleship.board.prettyPrint.called.should.be.true;
        });
    });
});
