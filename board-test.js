'use strict';

var Board = require('./Board.js');

casper.test.begin('Can create a board of size 10', 2, function suite(test) {
    var myBoard = new Board(10, 10);
    test.assertEquals(myBoard.board[0].length, 10, 'Column number ok');
    test.assertEquals(myBoard.board.length, 9, 'Line number ok');
    test.done();
});
