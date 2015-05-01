'use strict';

var Board = require('./Board.js');

casper.test.begin('Can create a board of size 10', 2, function suite(test) {
    var myBoard = new Board(10, 10);
    test.assertEquals(myBoard.board[0].length, 10, 'Column number ok');
    test.assertEquals(myBoard.board.length, 10, 'Line number ok');
    test.done();
});

casper.test.begin('Can mark a board with a & character', 1, function suite(test) {
    var myBoard = new Board(2, 2);
    var expectedBoard = [['~','~'],['&','~']];
    myBoard.markBoard({'line':1,'column':0},'&');
    test.assertEquals(myBoard.board, expectedBoard, 'Mark board with chosen character');
    test.done();
});

casper.test.begin('Can get a position from board', 1, function suite(test) {
    var myBoard = new Board(2, 2);
    myBoard.markBoard({'line':1,'column':0},'&');
    test.assertEquals(myBoard.getPos({'line':1,'column':0}), '&', 'Gets the position as specified');
    test.done();
});

casper.test.begin('Can relate each line with letters', 1, function suite(test) {
    var myBoard = new Board(2, 2);
    test.assertEquals(myBoard._boardChar('a', 3), 'd', 'Gets the correct letter for the forth line');
    test.done();
});
