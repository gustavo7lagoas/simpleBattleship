/*jshint node:true*/
'use strict';


debugger;

var gamepath = 'file:///home/alex/workspace/qaschool/academia/simpleBattleship/WebModeGame.html';

casper.test.begin('Check if game is loaded', 1, function battleship(test){

	casper.start(gamepath, function(){
		test.assertTitle("Battleship Game", "Battleship title is the one expected");
	});

	casper.run(function() {
        test.done();
    });
});

casper.test.begin('Start Game', 4, function battleship(test){

	casper.start(gamepath, function(){

        casper.then(function() {
            
            this.evaluate(function(term) {
                document.querySelector('input[name=sea-size][value=S]').setAttribute('checked', true);
                document.querySelector('input[name=difficulty-level][value=N]').setAttribute('checked', true);
            });
            
            test.assertEval(function() {
                return document.querySelector('input[name=sea-size][value=S]').getAttribute('checked') == "true";
            }, 'Sea-Size was set to S');
            
            test.assertEval(function() {
                return document.querySelector('input[name=difficulty-level][value=N]').getAttribute('checked') == "true";
            }, 'Difficulty level was set to N');
            
            this.click('#start');
        });
    });

    casper.then(function() {
        test.assertExists('.column', 'Did not create any Board Column');
        test.assertExists('.row', 'Did not create any Board Row');
    });

	casper.run(function() {
        test.done();
    });
});
