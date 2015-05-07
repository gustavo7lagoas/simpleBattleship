/*jshint node:true*/
'user strict';

var Board = require('./Board.js');
var _ = require('lodash');

function Battleship(shipsNumber, boardSize) {
    this.shipsNumber = shipsNumber;
    this.board = new Board(boardSize, boardSize);
    this.linesNumber = this.board.linesNumber;
    this.columnsNumber = this.board.columnsNumber;
    this.shipPositions = [];
    this.shipsHit = [];
}

Battleship.prototype = {
    constructor : Battleship,
    populateBoard : function() {
        var shipsPlaced = 0;
        while(shipsPlaced < this.shipsNumber) {
            posibleShipPosition = {
                'line' : Math.floor(Math.random() * this.linesNumber),
                'column' : Math.floor(Math.random() * this.columnsNumber)
            };
            if(!_.find(this.shipPositions, posibleShipPosition)) {
                position = posibleShipPosition;
                shipsPlaced += 1;
                this.shipPositions.push(position);
            }
        }
    },
    isBoatHit : function(guess) {
        return _.any(this.shipPositions, _.matches(guess));
    },
    markAsHit : function(position) {
        this.shipsHit.push({'line':position.line,'column':position.column});
        this.board.markBoard(position, '*');
    },
    markAsMiss : function(position) {
        this.board.markBoard(position, 'X');
    },
    markAsShip : function(position) {
        this.board.markBoard(position, 'S');
    },
    isAllShipsHit : function() {
        console.log(this.shipPositions.sort());
        return _.isEqual(this.shipPositions.sort(), this.shipsHit.sort());
    },
    markAllNonHitShips : function() {
        var that = this;
        _.each(that.shipPositions, function(pos){
            if(that.board.getPos(pos) === '~')
                that.markAsShip(pos);
        });
    }
};

/*
var myBattleship = new Battleship(4,2);
myBattleship.populateBoard();
console.log(myBattleship.isBoatHit([1,1]));
*/

module.exports = Battleship;
