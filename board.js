'use strict';

function Board(boardSize) {
    this.board = new Array();
    this.size = boardSize;

    for(var i = 0; i < this.size; i++) {
        this.board[i] = new Array();
        for(var j = 0; j < this.size; j++) {
            this.board[i][j] = 'O';
        }
    };
}

Board.prototype = {
    constructor : Board,
    prettyPrint : function() {
        var line = '';
        for(var i = 0; i < this.board.length; i++) {
            for(var j = 0; j < this.board[i].length; j ++) {
                line += this.board[i][j] + ' ';
            }
            console.log(line);
            line = '';
        }
    }
}

var board = new Board(5);
board.prettyPrint();

