/*jshint node:true*/
'use strict';

function Board(linesNumber, columnsNumber) {
    this.board = [];
    this.linesNumber = linesNumber;
    this.columnsNumber = columnsNumber;

    for(var i = 0; i < this.linesNumber; i++) {
        this.board.push([]);
        for(var j = 0; j < this.columnsNumber; j++) {
            this.board[i][j] = '~';
        }
    }
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
    },
    markBoard : function(position, mark) {
        this.board[position[0]][[position[1]]] = mark;
    }
};

module.exports = Board;
