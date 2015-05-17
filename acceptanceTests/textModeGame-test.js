/*jshint node:true*/
'use strict';

var should = require('chai').should;
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
                myTextModeGame._setDifficultyLevel('S', 'E');
                myTextModeGame.shipsNumber.should.equal(2);
            });
            it('In Hard difficult it has 3 plays and 3 ships', function() {
                true.should.be.false;
            });
        });
        context('Mid-size Sea Size', function(){
            beforeEach(function() {
                myTextModeGame._setSeaSize('M');
            });
            it('In Easy difficult it has 22 plays and 5 ships', function() {
                true.should.be.false;
            });
            it('In Normal difficult it has 20 plays and 8 ships', function() {
                true.should.be.false;
            });
            it('In Hard difficult it has 13 plays and 10 ships', function() {
                true.should.be.false;
            });
        });
        context('Large Sea Size', function(){
            beforeEach(function() {
                myTextModeGame._setSeaSize('L');
            });
            it('In Easy difficult it has 58 plays and 10 ships', function() {
                true.should.be.false;
            });
            it('In Normal difficult it has 54 plays and 14 ships', function() {
                true.should.be.false;
            });
            it('In Hard difficult it has 30 plays and 20 ships', function() {
                true.should.be.false;
            });
        });
    });
    describe('Game Play', function() {
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
        })
    });
});
