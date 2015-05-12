/*jshint node:true*/
'use strict';

var Battleship = require('./Battleship.js');
var _ = require('lodash');

casper.test.begin('it creates board', 1, function suite(test) {
    var myBattleship = new Battleship(4, 2);
    myBattleship.populateBoard();
    var expectBoard = [['~', '~'],['~', '~']];
    test.assertEquals(myBattleship.board.board, expectBoard, 'board created!');
    test.done();
});

casper.test.begin('it populates board with ships', 1, function suite(test) {
    var myBattleship = new Battleship(4, 2);
    myBattleship.populateBoard();
    console.log(myBattleship.shipPositions);
    var expectShipPositions = [
        {'line':0,'column':0},
        {'line':0,'column':1},
        {'line':1,'column':0},
        {'line':1,'column':1}];
    test.assertEquals(_.sortByAll(
        myBattleship.shipPositions,
        ['line','column'], _.values),
        expectShipPositions,
        'boards are equally populated');
    test.done();
});

casper.test.begin('it checks if guess hit!', 1, function suite(test) {
    var myBattleship = new Battleship(1, 2);
    myBattleship.shipPositions = [{'line':1,'column':0},{'line':1,'column':1}];
    test.assertTruthy(myBattleship.isBoatHit({'line':1,'column':1}), 'hits position!');
    test.done();
});

casper.test.begin('it checks if guess miss!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.shipPositions = [{'line':1,'column':1}];
    test.assertFalsy(myBattleship.isBoatHit({'line':1,'column':0}), 'misses target!');
    test.done();
});

casper.test.begin('it marks as hit!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.markAsHit({'line':1,'column':1});
    var expectBoard = [['~', '~'],['~', '*']];
    test.assertEquals(myBattleship.board.board, expectBoard, 'marked as hit!');
    test.done();
});

casper.test.begin('it marks as miss!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.markAsMiss({'line':1,'column':1});
    var expectBoard = [['~', '~'],['~', 'X']];
    test.assertEquals(myBattleship.board.board, expectBoard, 'marked as hit!');
    test.done();
});

casper.test.begin('it marks as ship!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.markAsShip({'line':1,'column':1});
    var expectBoard = [['~', '~'],['~', 'S']];
    test.assertEquals(myBattleship.board.board, expectBoard, 'marked as hit!');
    test.done();
});

casper.test.begin('it informs when all boats are hit!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.shipPositions = [{'line':1,'column':0}];
    myBattleship.shipsHit = [{'line':1,'column':0}];
    test.assertTruthy(myBattleship.isAllShipsHit(), 'all ships hit!');
    test.done();
});

casper.test.begin('it informs when not all boats are hit!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.shipPositions = [{'line':1,'column':0},{'line':1,'column':1}];
    myBattleship.shipsHit = [{'line':1,'column':1}];
    test.assertFalsy(myBattleship.isAllShipsHit(), 'NOT all ships hit!');
    test.done();
});

casper.test.begin('it marks all non hit ships on board!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.shipPositions = [{'line':0,'column':0},{'line':1,'column':0},{'line':1,'column':1}];
    myBattleship.markAsHit({'line':1,'column':0});
    myBattleship.markAllNonHitShips();
    var expectBoard = [['S', '~'],['*', 'S']];
    test.assertEquals(myBattleship.board.board, expectBoard, 'all ships marked!');
    test.done();
});


