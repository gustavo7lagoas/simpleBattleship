'use strict';

function Board(linesNumber, columnsNumber) {
    this.board = new Array();
    this.linesNumber = linesNumber;
    this.columnsNumber = columnsNumber;

    for(var i = 0; i < this.linesNumber; i++) {
        this.board[i] = new Array();
        for(var j = 0; j < this.columnsNumber; j++) {
            this.board[i][j] = 'O';
        }
    };
}

Board.prototype = {
    constructor : Board,
    prettyPrint : function() {
        var line = '';
        for(var i = 0; i < this.linesNumber; i++) {
            for(var j = 0; j < this.columnsNumber; j ++) {
                line += this.board[i][j] + ' ';
            }
            console.log(line);
            line = '';
        }
    }
}

module.exports = Board;
