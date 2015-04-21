/*jshint node:true*/
'use strict';

function Board(linesNumber, columnsNumber) {
    this.board = [];
    this.linesNumber = linesNumber;
    this.columnsNumber = columnsNumber;
    this._firstLine = 'a';

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
        console.log(this._firstBoardLine());
        var line = '';
        for(var i = 0; i < this.linesNumber; i++) {
            line += this._boardChar(this._firstLine, i) + ' ';
            for(var j = 0; j < this.columnsNumber; j ++) {
                line += this.board[i][j] + ' ';
            }
            console.log(line);
            line = '';
        }
    },
    markBoard : function(position, mark) {
        this.board[position[0]][[position[1]]] = mark;
    },
    getPos : function(position) {
        return this.board[position[0]][[position[1]]];
    },
    _boardChar : function(character, index) {
        return String.fromCharCode(character.charCodeAt(0) + index);
    },
    _firstBoardLine : function() {
        var firstLine = '  ';
        for(var i = 0; i < this.columnsNumber; i++) {
            firstLine += i + 1 + ' ';
        }
        return firstLine;
    }
};

module.exports = Board;
