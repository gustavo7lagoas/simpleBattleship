/*jshint node:true*/
'use strict';

var should = require('chai').should;
var TextModeGame = require('../TextModeGame');
var _ = require('lodash');
var sinon = require('sinon');

describe('Text Mode Game', function() {
    describe('Configurations', function() {
        context('Small Sea Size', function(){
            it('In Easy difficult it has 3 plays and 1 ship', function() {
                true.should.be.false;
            });
            it('In Normal difficult it has 3 plays and 1 ship', function() {
                true.should.be.false;
            });
            it('In Hard difficult it has 3 plays and 1 ship', function() {
                true.should.be.false;
            });
        });
        context('Mid-size Sea Size', function(){
            it('In Easy difficult it has 3 plays and 1 ship', function() {
                true.should.be.false;
            });
            it('In Normal difficult it has 3 plays and 1 ship', function() {
                true.should.be.false;
            });
            it('In Hard difficult it has 3 plays and 1 ship', function() {
                true.should.be.false;
            });
        });
        context('Large Sea Size', function(){
            it('In Easy difficult it has 3 plays and 1 ship', function() {
                true.should.be.false;
            });
            it('In Normal difficult it has 3 plays and 1 ship', function() {
                true.should.be.false;
            });
            it('In Hard difficult it has 3 plays and 1 ship', function() {
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
