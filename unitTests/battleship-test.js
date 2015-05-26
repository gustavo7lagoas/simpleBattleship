/*jshint node:true*/
'use strict';

var should = require('chai').should();
var Battleship = require('../Battleship.js');
var _ = require('lodash');

describe('Battleship', function() {
    it('creates board', function() {
        var myBattleship = new Battleship(4, 2);
        var expectedBoard = [['~', '~'],['~', '~']];
        myBattleship.board.board.should.deep.equal(expectedBoard);
    });
    it('populates board with ships', function() {
        var myBattleship = new Battleship(4, 2);
        var expectShipPositions = [
            {'line':0,'column':0},
            {'line':0,'column':1},
            {'line':1,'column':0},
            {'line':1,'column':1}];
        _.sortByAll(myBattleship.shipPositions, ['line','column'],
                    _.values).should.deep.equal(expectShipPositions);
    });
    it('checks if guess hit', function() {
        var myBattleship = new Battleship(1, 2);
        myBattleship.shipPositions = [{'line':1,'column':0},{'line':1,'column':1}];
        myBattleship.isBoatHit({'line':1,'column':1}).should.be.true;
    });
    it('checks if guess miss', function() {
        var myBattleship = new Battleship(1,2);
        myBattleship.shipPositions = [{'line':1,'column':1}];
        myBattleship.isBoatHit({'line':1,'column':0}).should.be.false;
    });
    it('mark as hit', function() {
        var myBattleship = new Battleship(1,2);
        myBattleship.markAsHit({'line':1,'column':1});
        var expectedBoard = [['~', '~'],['~', '*']];
        myBattleship.board.board.should.deep.equal(expectedBoard);
    });
    it('marks as miss', function() {
        var myBattleship = new Battleship(1,2);
        myBattleship.markAsMiss({'line':1,'column':1});
        var expectedBoard = [['~', '~'],['~', 'X']];
        myBattleship.board.board.should.deep.equal(expectedBoard);
    });
    it('marks as ship', function() {
        var myBattleship = new Battleship(1,2);
        myBattleship.markAsShip({'line':1,'column':1});
        var expectedBoard = [['~', '~'],['~', 'S']];
        myBattleship.board.board.should.deep.equal(expectedBoard);
    });
    it('informs when all boats are hit', function() {
        var myBattleship = new Battleship(1,2);
        myBattleship.shipPositions = [{'line':1,'column':0}];
        myBattleship.shipsHit = [{'line':1,'column':0}];
        myBattleship.isAllShipsHit().should.be.true;
    });
    it('informs when not all boats are hit', function() {
        var myBattleship = new Battleship(1,2);
        myBattleship.shipPositions = [{'line':1,'column':0},{'line':1,'column':1}];
        myBattleship.shipsHit = [{'line':1,'column':1}];
        myBattleship.isAllShipsHit().should.be.false;
    });
    it('marks all non hit ships on board', function() {
        var myBattleship = new Battleship(1,2);
        myBattleship.shipPositions = [{'line':0,'column':0},{'line':1,'column':0},{'line':1,'column':1}];
        myBattleship.markAsHit({'line':1,'column':0});
        myBattleship.markAllNonHitShips();
        var expectedBoard = [['S', '~'],['*', 'S']];
        myBattleship.board.board.should.deep.equal(expectedBoard);
    });
});

