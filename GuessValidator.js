/*jshint node:true*/
'user strict';

function GuessValidator(Battleship) {
    this.Battleship = Battleship;
}

GuessValidator.prototype = {
    constructor : GuessValidator,
    formatGuess : function(guess) {
        var guessLineAsIndex = guess[0].charCodeAt(0) - 'a'.charCodeAt(0);
        var guessColunmAsIndex = guess[1] -1;
        return {
            'line' : guessLineAsIndex,
            'column' : guessColunmAsIndex
        };
    },
    validateGuess : function(guess) {
        if(guess.length === 2 && this._validateGuessCoordinates(guess)) {
            return true;
        }
        return false;
    },
    _validateGuessCoordinates : function(guess) {
        var boardLastLine = String.fromCharCode((this.Battleship.board._firstLine.charCodeAt(0) + this.Battleship.columnsNumber) -1);
        if(guess[0] >= this.Battleship.board._firstLine &&
           guess[0] <= boardLastLine &&
           guess[1] > 0 &&
           guess[1] <= this.Battleship.board.columnsNumber)
            return true;
    }
};

module.exports = GuessValidator;
