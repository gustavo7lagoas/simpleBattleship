/*jshint node:true*/
'use strict';


debugger;

var gamepath = 'http://localhost:8080/WebModeGame.html';

casper.test.begin('Teste', 1, function battleship(test){

	casper.start(gamepath, function(){
		test.assertTitle("Example Domain", "Battleship title is the one expected");
	});

	casper.run(function() {
        test.done();
    });
});

casper.test.begin('Start Game', 1, function battleship(test){

	casper.start(gamepath, function(){
        this.fill('form', {
            'sea-size' : 'L',
            'difficulty-level' : 'N'
        }, true);
	});

    casper.then(function() {
        test.assertExists('.column', 'Did not create any Board Column');
    });

	casper.run(function() {
        test.done();
    });
});
