/*jshint node:true*/
'use strict';

var should = require('chai').should();
var Board = require('../Board.js');

describe('Board', function(){
    it('Can create a board of size 10', function() {
        // Arrange
        var myBoard = new Board(10,10);
        //Act
        //Assert
        myBoard.board[0].length.should.equal(10);
        myBoard.board.length.should.equal(10);
    });
    it('Can mark a board with a & character', function() {
        // Arrange
        var myBoard = new Board(2, 2);
        var expectedBoard = [['~','~'],['&','~']];
        // Act
        myBoard.markBoard({'line':1,'column':0},'&');
        // Assert
        myBoard.board.should.deep.equal(expectedBoard);
    });
    it('Can get a position from board', function() {
        var myBoard = new Board(2, 2);

        myBoard.markBoard({'line':1,'column':0},'&');

        myBoard.getPos({'line':1, 'column':0}).should.equal('&');
    });
    it('Can relate each line with letters', function() {
        var myBoard = new Board(2, 2);

        myBoard._boardChar('a', 3).should.equal('d');
    });
});

