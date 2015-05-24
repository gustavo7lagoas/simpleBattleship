/*jshint node:true*/
'use strict';


debugger;

casper.test.begin('Teste', 1, function battleship(test){

    var gamepath = 'http://localhost:8080/WebModeGame.html';
    console.log(gamepath);

	casper.start(gamepath, function(){
		test.assertTitle("Example Domain", "Battleship title is the one expected");
	});

	casper.run(function() {
        test.done();
    });
});
