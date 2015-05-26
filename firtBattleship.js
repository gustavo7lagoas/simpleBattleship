var board = [];
var i, j;
var shipPosition;
var readline = require('readline');

rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});


function prettyPrint(board) {
    var i, j;
    var line;
    for(i = 0; i < board.length; i++) {
        line = '';
        for(j = 0; j < board[i].length; j++) {
            line += board[i][j] + ' ';
        }
        console.log(line);
    }
}

function setShipPostion() {
    linePosition = Math.floor(Math.random() * board.length);
    columnPosition = Math.floor(Math.random() * board.length);
    return {
        'line' : linePosition,
        'column' : columnPosition
    }
}

function isGuessHit(guess) {
   // return guess.line === shipPosition.line && guess.column === shipPosition.column;
    return guess === shipPosition;
}

function playerGuess(guess) {
    return {
        line : Number(guess[0]),
        column : Number(guess[1])
    }
}

function play(guessNumber) {
    prettyPrint(board);
    console.log('Guesses remaining ', (10 - guessNumber +1));
    rl.question('Enter guess ', function(guess) {
        var formatedGuess;
        console.log('Guess # ', guessNumber);
        formatedGuess = playerGuess(guess);
        if(isGuessHit(formatedGuess)) {
            console.log('You win');
            rl.close();
        } else if(guessNumber === 10) {
            console.log('You lose');
            rl.close();
        }else {
            board[formatedGuess.line][formatedGuess['column']] = 'X';
            play(guessNumber+1);
        }
    });
}

for(i = 0; i < 5; i ++) {
    board[i] = [];
    for(j = 0; j < 5; j++) {
        board[i][j] = '~';
    }
}

shipPosition = setShipPostion();
console.log(shipPosition);
play(1);
