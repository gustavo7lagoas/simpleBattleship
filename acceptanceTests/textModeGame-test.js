/*jshint node:true*/
'use strict';

var should = require('chai').should();
var TextModeGame = require('../TextModeGame');
var _ = require('lodash');
var sinon = require('sinon');
var myTextModeGame;

describe('Text Mode Game', function() {
    beforeEach(function() {
        myTextModeGame = new TextModeGame();
    });
    describe('Configurations', function() {
        context('Small Sea Size', function(){
            beforeEach(function() {
                myTextModeGame._setSeaSize('S');
            });
            it('In Easy difficult it has 3 plays and 1 ship', function() {
                myTextModeGame._setDifficultyLevel('S', 'E');
                myTextModeGame.playsNumber.should.equal(3);
                myTextModeGame.shipsNumber.should.equal(1);
            });
            it('In Normal difficult it has 3 plays and 2 ships', function() {
                myTextModeGame._setDifficultyLevel('S', 'N');
                myTextModeGame.playsNumber.should.equal(3);
                myTextModeGame.shipsNumber.should.equal(2);
            });
            it('In Hard difficult it has 3 plays and 3 ships', function() {
                myTextModeGame._setDifficultyLevel('S', 'H');
                myTextModeGame.playsNumber.should.equal(3);
                myTextModeGame.shipsNumber.should.equal(3);
            });
        });
        context('Mid-size Sea Size', function(){
            beforeEach(function() {
                myTextModeGame._setSeaSize('M');
            });
            it('In Easy difficult it has 22 plays and 5 ships', function() {
                myTextModeGame._setDifficultyLevel('M', 'E');
                myTextModeGame.playsNumber.should.equal(22);
                myTextModeGame.shipsNumber.should.equal(5);
            });
            it('In Normal difficult it has 20 plays and 8 ships', function() {
                myTextModeGame._setDifficultyLevel('M', 'N');
                myTextModeGame.playsNumber.should.equal(20);
                myTextModeGame.shipsNumber.should.equal(8);
            });
            it('In Hard difficult it has 13 plays and 10 ships', function() {
                myTextModeGame._setDifficultyLevel('M', 'H');
                myTextModeGame.playsNumber.should.equal(13);
                myTextModeGame.shipsNumber.should.equal(10);
            });
        });
        context('Large Sea Size', function(){
            beforeEach(function() {
                myTextModeGame._setSeaSize('L');
            });
            it('In Easy difficult it has 58 plays and 10 ships', function() {
                myTextModeGame._setDifficultyLevel('L', 'E');
                myTextModeGame.playsNumber.should.equal(58);
                myTextModeGame.shipsNumber.should.equal(10);
            });
            it('In Normal difficult it has 54 plays and 14 ships', function() {
                myTextModeGame._setDifficultyLevel('L', 'N');
                myTextModeGame.playsNumber.should.equal(54);
                myTextModeGame.shipsNumber.should.equal(14);
            });
            it('In Hard difficult it has 30 plays and 20 ships', function() {
                myTextModeGame._setDifficultyLevel('L', 'H');
                myTextModeGame.playsNumber.should.equal(30);
                myTextModeGame.shipsNumber.should.equal(20);
            });
        });
    });
    describe('Game Play', function() {
        beforeEach(function() {
            myTextModeGame = new TextModeGame();
            myTextModeGame._setSeaSize('S');
            myTextModeGame._setDifficultyLevel('S', 'E');
        });
        context('Player Wins', function() {
            it('player wins with the minimal number of plays', function() {
                true.should.be.false;
            });
            it('player wins in the last attempt', function() {
                true.should.be.false;
            });
        });
        context('Player Loses', function() {
            it('no more attempts', function(){
                true.should.be.false;
            });
        });
    });
});
