/*jshint node:true*/
'use strict';

var should = require('chai').should;
var TextModeGame = require('../TextModeGame');
var _ = require('lodash');
var sinon = require('sinon');

describe('Text Mode Game', function() {
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
