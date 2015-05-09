/*jshint node:true*/
'use strict';

var should = require('chai').should;
var TextModeGame = require('../TextModeGame');
var _ = require('lodash');
var sinon = require('sinon');
var myTextModeGame;
var mySeaSize;
var myDifficultyLevel;

beforeEach(function(done) {
    myTextModeGame = new TextModeGame();
    done();
});

describe('Text Mode Game', function() {
    describe('_getConfiguration', function() {
        describe('_setSeaSize', function() {
            it('normalizes a lower case configuration', function() {
                mySeaSize = 'm';
                myTextModeGame._setSeaSize(mySeaSize).should.equal('M');
            });
            it('normalizes a invalid configuration to Small', function() {
                mySeaSize = 'e';
                myTextModeGame._setSeaSize(mySeaSize).should.equal('S');
            });
        });
        describe('_setDifficultyLevel', function() {
            it('normalizes a lower case configuration', function() {
                mySeaSize = 'S';
                myDifficultyLevel = 'h';
                myTextModeGame._setDifficultyLevel(mySeaSize, myDifficultyLevel).should.equal('H');
            });
            it('normalizes a invalid configuration to Easy', function() {
                mySeaSize = 'L';
                myDifficultyLevel = 'normal';
                myTextModeGame._setDifficultyLevel(mySeaSize, myDifficultyLevel).should.equal('E');
            });
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
