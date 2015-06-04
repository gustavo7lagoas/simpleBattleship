# simpleBattleship #

Nosso objetivo aqui &eacute; ter um projeto simples por&eacute;m completo para exercitar os n&iacute;veis de teste da Academia Chaordic de Tecnologia.

Os testes s&atilde;o agrupados em tr&ecirc;s tipos e est&atilde;o dispon&iacute;veis em branchs do projeto:

Para acessar uma branch do projeto execute o comando

`git checkout <nome-da branch>`

## Unit&aacute;rios: branch unit-test ##
Aqui est&atilde;o escritos os testes de unidade para as classes criadas no projeto. As depend&ecirc;ncias s&atilde;o:

* Mocha
* Chai
* Sinonjs

Para instalar basta executar:

`npm install`

Para executar basta executar:

`npm test`

## Aceita&ccedil;&atilde;o: branch acceptance-tests ##
Aqui est&atilde;o escritos os testes de aceita&ccedil;&atilde;o para as classes criadas no projeto. As depend&ecirc;ncias s&atilde;o:

* Mocha
* Chai

Para instalar basta executar:

`npm install`

Para executar basta executar:

`npm test`

## Web: branch browser-tests ##

Os testes de automa&ccedil;&atilde;o web ser&atilde;o executados utilizando o CasperJS dispon&iacute;el em: <http://casperjs.org/>

Para instalar basta executar:

`npm install -g casperjs`

Para executar basta executar:

`http-server`

`casperjs test <nome-do-arquivo>`
