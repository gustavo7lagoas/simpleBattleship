/*jshint node:true*/
'use strict';

var casper = require('casper').create();

casper.test.begin('Teste', 1, function battleship(test){

	carper.start('file:///home/alex/workspace/qaschool/academia/simpleBattleship/WebModeGame.html', function(){
		test.assertTitle("Example Domain", "Battleship title is the one expected");
	});

	casper.run(function() {
        test.done();
    });
});