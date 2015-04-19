/*jshint node:true*/
'use strict';

var Battleship = require('./Battleship.js');

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
    var expectShipPositions = [[0,0], [0,1], [1,0], [1,1]];
    test.assertEquals(myBattleship.shipPositions.sort(), expectShipPositions, 'boards are equally populated');
    test.done();
});

casper.test.begin('it checks if guess hit!', 1, function suite(test) {
    var myBattleship = new Battleship(1, 2);
    myBattleship.shipPositions = [[1,1]];
    test.assertTruthy(myBattleship.isBoatHit(0,0), 'hits position!');
    test.done();
});

casper.test.begin('it checks if guess miss!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.shipPositions = [[1,1]];
    test.assertFalsy(myBattleship.isBoatHit([1,0]), 'misses target!');
    test.done();
});

casper.test.begin('it marks as hit!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.markAsHit([1,1]);
    var expectBoard = [['~', '~'],['~', '*']];
    test.assertEquals(myBattleship.board.board, expectBoard, 'marked as hit!');
    test.done();
});

casper.test.begin('it marks as miss!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.markAsMiss([1,1]);
    var expectBoard = [['~', '~'],['~', 'X']];
    test.assertEquals(myBattleship.board.board, expectBoard, 'marked as hit!');
    test.done();
});

casper.test.begin('it marks as ship!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.markAsShip([1,1]);
    var expectBoard = [['~', '~'],['~', 'S']];
    test.assertEquals(myBattleship.board.board, expectBoard, 'marked as hit!');
    test.done();
});

casper.test.begin('it informs when all boats are hit!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.shipPositions = [[1,1]];
    myBattleship.shipsHit = [[1,1]];
    test.assertTruthy(myBattleship.isAllShipsHit(), 'all ships hit!');
    test.done();
});

casper.test.begin('it informs when not all boats are hit!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.shipPositions = [[1,1]];
    myBattleship.shipsHit = [[1,0]];
    test.assertFalsy(myBattleship.isAllShipsHit(), 'NOT all ships hit!');
    test.done();
});

casper.test.begin('it marks all non hit ships on board!', 1, function suite(test) {
    var myBattleship = new Battleship(1,2);
    myBattleship.shipPositions = [[0,0], [1,0], [1,1]];
    myBattleship.markAsHit([1,0]);
    myBattleship.markAllNonHitShips();
    var expectBoard = [['S', '~'],['*', 'S']];
    test.assertEquals(myBattleship.board.board, expectBoard, 'all ships marked!');
    test.done();
});


