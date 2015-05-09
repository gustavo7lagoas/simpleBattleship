/*jshint node:true*/
'use strict';

var should = require('chai').should;
var GuessValidator = require('../GuessValidator');
var Battleship = require('../Battleship');
var _ = require('lodash');
var sinon = require('sinon');
var myGuessValidator;

beforeEach(function(done) {
    myGuessValidator = new GuessValidator(new Battleship(2,2));
    done();
});

describe('Guess Validator', function() {
    describe('Formating guesses', function() {
        it('format valid guess', function() {
            var unformatedGuess = 'a1';
            myGuessValidator.formatGuess(unformatedGuess).should.deep.equal({'line':0,'column':0});
        });
    });
    describe('Validating guess', function() {
        it('validates valid guess', function() {
            var unformatedGuess = 'a1';
            myGuessValidator.validateGuess(unformatedGuess).should.true;
        });
        it('validates valid guess for board size greater than 10', function() {
            var unformatedGuess = 'c10';
            myGuessValidator.validateGuess(unformatedGuess).should.true;
        });
        it('validates invalid one character guess', function() {
            var unformatedGuess = '1';
            myGuessValidator.validateGuess(unformatedGuess).should.false;
        });
        it('validates invalid three character guess', function() {
            var unformatedGuess = 'a1a';
            myGuessValidator.validateGuess(unformatedGuess).should.false;
        });
        it('validates invalid blank guess', function() {
            var unformatedGuess = '';
            myGuessValidator.validateGuess(unformatedGuess).should.false;
        });
        it('validates invalid out of board guess for column greater than total', function() {
            var unformatedGuess = 'a3';
            myGuessValidator.validateGuess(unformatedGuess).should.false;
        });
        it('validates invalid out of board guess for column less than total', function() {
            var unformatedGuess = 'a0';
            myGuessValidator.validateGuess(unformatedGuess).should.false;
        });
        it('validates invalid out of board guess for line', function() {
            var unformatedGuess = 'c1';
            myGuessValidator.validateGuess(unformatedGuess).should.false;
        });
    });
});
