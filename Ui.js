
/*jshint node:true*/
'use strict';

function Ui() {
    this.frame = $('#game-box');
}

Ui.prototype = {
    render : function(x) {
        for(var i = 0; i < x; i++) {
            var row = $("<div>", { class: "row"});
            for(var j = 0; j < x; j++) {
                row.append($("<div>", { class: "column"}).html(i+''+j));
            }
            this.frame.append(row);
        }
    }
};

module.exports = Ui;
