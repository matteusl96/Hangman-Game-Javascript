//criei varios arrays com as palavras que o jogo irá usar
var frutas = [
    "abacaxi",
    "laranja",
    "banana",
    "carambola",
    "abacate",
    "acerola",
    "amora",
    "caju",
    "cereja",
    "framboesa",
    "goiaba",
    "jabuticaba",
    "kiwi",
    "manga",
    "melancia",
    "morango",
    "pessego",
  ];
  var futebol = [
    "jogador",
    "goleiro",
    "atacante",
    "zagueiro",
    "arbitro",
    "arquibancada",
    "bola",
    "trave",
    "escanteio",
    "torcida",
    "internacional",
    "gremio",
    "corinthians",
    "flamengo",
    "juventude",
    "santos",
    "palmeiras",
    "fluminense",
  ];
  var animais = [
    "cachorro",
    "gato",
    "rato",
    "papagaio",
    "macaco",
    "elefante",
    "girafa",
    "rinoceronte",
    "camelo",
    "tigre",
    "pantera",
    "avestruz",
    "pinguim",
    "pato",
    "galinha",
    "vaca",
    "hipopotamo",
    "cobra",
    "canguru",
  ];
  var paises = [
    "brasil",
    "canada",
    "russia",
    "inglaterra",
    "chile",
    "peru",
    "argentina",
    "colombia",
    "equador",
    "italia",
    "venezuela",
    "china",
    "dinamarca",
    "irlanda",
    "angola",
    "espanha",
    "portugal",
  ];

//aqui criei uma variavel para armazenar meus arrays, para eu poder fazer o sorteio da categoria das palavras  
var categorias = [animais, frutas, futebol, paises];
// essa é minha variavel do sorteio, usei o math.random para sortear uma variavel das quatro disponiveis em categorias
var sorteio_categoria = categorias[Math.floor(Math.random() * categorias.length)];
//apos o sorteio da categoria, usei essa variavel para sortear a palavra, utilizando o mesmo metodo
var palavra = sorteio_categoria[Math.floor(Math.random() * sorteio_categoria.length)];

//as variaveis chances e acertos são para eu armazenar a quantidade de tentativas, que no caso são 6 e os acertos começa com 0
var chances = 6;
var acertos = 0;

//a variavel imagem vou usar mais pra fente no codigo, para fazer a substituição das imagens no HTML
var imagem = 0;

//é a minha variavel coringa, com ela eu consigo controlar quantas casas meu jogo da forca vai ter, cada casa será referente a uma letra
var posicao;

//esse escopo usei para escrever no HTML a categoria da palavra que vai estar no jogo, na id "dica" do index
if (sorteio_categoria=== animais) {
    document.getElementById("dica").innerHTML = "Animais";
 } if (sorteio_categoria === frutas) {
     document.getElementById("dica").innerHTML = "Frutas";
 } if (sorteio_categoria === futebol) {
     document.getElementById("dica").innerHTML = "Futebol";
 } if (sorteio_categoria === paises) {
     document.getElementById("dica").innerHTML = "Paises";
 }  

//esse laço for, vai pegar a minha var posicao, que sempre irá começar com zero, pegará o comprimento da palavra sorteada e irá comparar
//caso minha variavel posicao seja menor que a palavra, ele irá criar um span no html cujo a id será o valor da posição, e posicao aumentará até chegar no comprimento da palavra
//com isso eu consigo criar uma tag <span> no meu html para cada letra da palavra sorteada
for (posicao = 0; posicao < palavra.length; posicao++) {
    var span = document.createElement("span");
    span.setAttribute('id', posicao);

    var div = document.getElementById("palavra");
    div.appendChild(span);
}


//as variaveis alfabeto_1, alfabeto_2, alfabeto_3 eu usei para fazer o teclado virtual do jogo
//separei o teclado em 3 partes, porque foi a forma que eu encontrei de conseguir manipular o css para que ficasse do jeito que eu queria, assim eu conseguia centralizar na pagina cada fileira de letras
//eu criei a variavel do alfabeto com as letras da fileira que eu queria e coloquei em outra variavel com o recurso split do javascript, assim eu separo a string das letras onde cada caractere será uma string
var alfabeto_1 = "qzxcvbnm";
var letras_1 = alfabeto_1.split("");

//esse laço for e os outos do alfabeto, foi como eu fiz para criar o teclado virtual no html
//assim como fiz para pegar a posição de cada palavra, usei minha variavel posicao para pegar a posição de cada fileira de letras e criar um botão para cada letra no teclado virtual
//assim cada botão do teclaro, será controlado pela posição referente a letra, exemplo, se a posição for 4, a letra sera "r"
//configurei para que quando o botão for criado no html, ele já coloque a função que está mais abaixo
for (posicao = 0; posicao < letras_1.length; posicao++) {
    let botao = document.createElement("button");
    let letra_1 = document.createTextNode(letras_1[posicao]);
    
    botao.appendChild(letra_1);
    botao.setAttribute('onclick', 'jogada(\''+letras_1[posicao]+'\')');
    botao.setAttribute('id', letras_1[posicao]);

    var div = document.getElementById("letras-1");
    div.appendChild(botao);
}

var alfabeto_2 = "asdfghjklç";
var letras_2 = alfabeto_2.split("");

for (posicao = 0; posicao < letras_2.length; posicao++) {
    let botao = document.createElement("button");
    let letra_2 = document.createTextNode(letras_2[posicao]);
    
    botao.appendChild(letra_2);
    botao.setAttribute('onclick', 'jogada(\''+letras_2[posicao]+'\')');
    botao.setAttribute('id', letras_2[posicao]);

    var div = document.getElementById("letras-2");
    div.appendChild(botao);
}

var alfabeto_3 = "qwertyuiop";
var letras_3 = alfabeto_3.split("");

for (posicao = 0; posicao < letras_3.length; posicao++) {
    let botao = document.createElement("button");
    let letra_3 = document.createTextNode(letras_3[posicao]);
    
    botao.appendChild(letra_3);
    botao.setAttribute('onclick', 'jogada(\''+letras_3[posicao]+'\')');
    botao.setAttribute('id', letras_3[posicao]);

    var div = document.getElementById("letras-3");
    div.appendChild(botao);
}


//é nessa função que o jogo de fato ocorre
function jogada(letra) {

    
    //essa var eu defini como false, pois ela irá controlar cada acerto que ocorrer, dando prosseguimento no jogo
    var acertou = false;

    //esse escopo é onde meu script irá comparar cada letra que o jogador selecionar, com as letras que a palavra sorteada contem
    //denovo usei a var posicao como coringa, para controlar o comprimento da palavra com cada posição
    //o escopo if serve para comparar a letra selecionada pelo jogador com a letra da palavra sorteada
    //se a letra que o jogador escolheu, for igual com alguma letra que a palavra tenha, sera criado no html a letra selecionada, na posição em que ela deve estar
    //a variavel acertos é incrementada, para que mais pra frente possa ser feito o controle de acertos do jogador
    //a função onclick do botão é removida, para que o jogador n possa selecionar o mesmo botão duas vezes
    //e a variavel acertou passa a ser true, para que o loop possa seguir adiante
    for (posicao = 0; posicao < palavra.length; posicao++) {
        if (letra === palavra[posicao]) {
            var span = document.getElementById(posicao);
            var l = document.createTextNode(letra);

            span.appendChild(l);

            let botao = document.getElementById(letra);
            botao.setAttribute('class', 'certa');
            botao.removeAttribute('onclick');

            acertos++;
            acertou = true;
        }
    }

    //esse escopo if é a mesma logica do escopo acima, porém é para controlar quando o jogador errar a letra
    //nossa variavel acertou entra como condição false, para ser executado esse bloco if
    //a variavel imagem é incrementada, para que mude a imagem no html, no caso será só um numero, pois todas as imagens estão nomeadas de numeros de 1 a 6
    //tambem removi o atributo onclick para que o jogador não repita as mesmas letras
    //a variavel chances que possui o valor 6, perde 1, para ter o controle de quantos erros teve e poder encerrar o jogo
    if (acertou === false) {
        imagem++;
        document.getElementById("forca").src = "./static/img/forca-"+imagem+".png";

        var botao = document.getElementById(letra);
        botao.setAttribute('class', 'errada');
        botao.removeAttribute('onclick');

        chances--;
    }

    
    //nos dois escopos abaixo é onde vai ocorrer a verificação dos erros e acertos
    //se as chances chegarem a 0, irá ser criado um elemento <p> no html com a mensagem "Você perdeu!", junto com a resposta correta da palavra
    //tambem será criado um botão, dando a opção para o jogador jogar novamente
    //removi o teclado virtual para evitar que o jogador continue clicando nos botoes, isso tava gerando um bug que não consegui resolver, então optei por tirar os botoes do jogador kkkk
    if (chances === 0) {
        var mensagem = document.createElement("p");
        var texto_1 = document.createTextNode("Você perdeu!");
        mensagem.appendChild(texto_1);

        var mensagem_2 = document.createElement("p");
        var texto_resposta = document.createTextNode("A palavra era "+palavra);
        mensagem_2.appendChild(texto_resposta);

        var botao = document.createElement("button");
        var texto_2 = document.createTextNode("jogar novamente");
        
        botao.appendChild(texto_2);
        botao.setAttribute('class', 'novo-bt');
        botao.setAttribute('onclick', 'window.location.reload()');

        var div = document.getElementById("novo-perdeu");
        div.appendChild(mensagem);
        div.appendChild(mensagem_2)
        div.appendChild(botao);

        document.getElementById("letras-1").hidden = true
        document.getElementById("letras-2").hidden = true
        document.getElementById("letras-3").hidden = true
    }
    
    //basicamente a mesma coisa que o escopo acima, porem vai comparar minha variavel acertos, com o comprimento da palavra sorteada
    //entao se os dois valores forem iguais, significa que o jogador ganhou e uma mensagem será exibida informando que o jogador ganhou
    //tambem removi os botoes do teclado virtual
    if (acertos === palavra.length) {
        var mensagem = document.createElement("p");
        var texto_1 = document.createTextNode("Você venceu!");
        mensagem.appendChild(texto_1);

        var botao = document.createElement("button");
        var texto_2 = document.createTextNode("jogar novamente");
        
        botao.appendChild(texto_2);
        botao.setAttribute('class', 'novo-bt');
        botao.setAttribute('onclick', 'window.location.reload()');

        var div = document.getElementById("novo-ganhou");
        div.appendChild(mensagem);
        div.appendChild(botao);

        document.getElementById("letras-1").hidden = true
        document.getElementById("letras-2").hidden = true
        document.getElementById("letras-3").hidden = true
    }
}

//criei essa função para facilitar na hora de testar o jogo, ao clicar será informado em um alert, a palavra sorteada, assim fica mais facil de acertar ou errar, para testar, conferir bugs e etc
//resolvi deixar parar ajudar na correção do trabalho também
function reveal() {
    window.alert("A palavra é: " + palavra );
 }

//essa função serve para iniciar um novo jogo e sortear uma nova palavra, caso o jogador queira
//ela apenas recarrega o html, logo o script executa novamente, sortando nova palavra
 function sorteio() {
    window.location.reload()
 }
