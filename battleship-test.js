'use strict';

var Battleship = require('./Battleship.js');

casper.test.begin('Can populate its board with ships', 1, function suite(test) {
    var myBattleship = new Battleship(2, 4, 2);
    myBattleship.populateBoard();
    var expectBoard = [['x', 'x'],['x', 'x']];
    test.assertEquals(myBattleship.board.board, expectBoard, 'boards are equally populated');
    test.done();
});
