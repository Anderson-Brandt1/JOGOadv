let fase = 1;
let nivel = 20;
let placar = 0;
let vidasIniciais;
let vidas;
let random;

document.getElementById('iniciar').addEventListener('click', iniciarJogo);
document.getElementById('enviar').addEventListener('click', verificarPalpite);

function iniciarJogo() {
    vidasIniciais = parseInt(document.getElementById('dificuldade').value);
    vidas = vidasIniciais;
    random = Math.floor(Math.random() * nivel) + 1;

    document.querySelector('.jogo').style.display = 'block';
    document.getElementById('.fase').textContent = fase;
    document.getElementById('.vidas').textContent = `Vidas : ${vidas}`;
    document.querySelector('.resultado').textContent = '';
    document.querySelector('.tentativas').textContent = '';
    document.getElementById('chute').value = '';
}
function verificarPalpite() {
    const chute = parseInt(document.getElementById('chute').value);
    let tentativas = vidasIniciais;
    let acertou = false;

    if (chute === ramdom) {
        placar += fase * 100;
        document.querySelector('.resultado').textContent = 'Parabéns! Você acertou!';
        fase++;
        nivel += 20;
        iniciarJogo();


    } else {
        document.querySelector('.tentativas').textContent += chute + ' ';
        tentativas--;
        vidas--;

        if (chute > random) {
            document.querySelector('.resultado').textContent = 'Seu chute foi maior que o número secreto!';
        } else {
            document.querySelector('.resultado').textContent = 'Seu chute foi menor que o número secreto!';
        }

        if (vidas === 0) {
            finalizarJogo();
        } else {
            document.querySelector('.vidas').textContent = `Vidas: ${vidas}`;
        }
    }
}
function finalizarJogo() {
    document.querySelector('.resultado').textContent = `Você perdeu! O número era ${random}.`;
    document.querySelector('.jogo').style.display = 'none';
    document.querySelector('.tentativas').textContent = '';
    document.querySelector('.vidas').textContent = '';
    alert(`Fim de jogo! Você chegou à fase ${fase} com ${placar} pontos.`);
}


