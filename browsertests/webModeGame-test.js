/*jshint node:true*/
'use strict';

casper.test.begin('Teste', 1, function battleship(test){

	casper.start('file:///home/alex/workspace/qaschool/academia/simpleBattleship/WebModeGame.html', function(){
		test.assertTitle("Example Domain", "Battleship title is the one expected");
	});

	casper.run(function() {
        test.done();
    });
});
