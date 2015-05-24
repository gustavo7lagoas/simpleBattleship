
/*jshint node:true*/
'use strict';

function Ui() {
    this.frame = $('#game-box');
    this.rendered = false;
}

Ui.prototype = {
    render : function(board) {
        if(this.rendered) {
            console.log('Aqui');
            this.frame.empty();
        }
        for(var i = 0; i < board.linesNumber; i++) {
            var row = $("<div>", { class: "row", id : board.boardLine(i)});
            for(var j = 0; j < board.columnsNumber; j++) {
                row.append($("<div>", { class: "column", id : board.boardLine(i)+(j+1)})
                           .html(board.board[i][j]));
            }
            this.frame.append(row);
            this.rendered = true;
        }
    }
};

module.exports = Ui;
