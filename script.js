window.onload = function() {
    const iniciarButton = document.getElementById('iniciar');
    const enviarButton = document.getElementById('enviar');
    const faseElement = document.getElementById('fase');
    const jogoDiv = document.querySelector('.jogo');
    const resultadoDiv = document.querySelector('.resultado');
    const chuteInput = document.getElementById('chute'); // Referência ao campo de entrada
    const vidasDiv = document.getElementById('vidas'); // Referência ao container de vidas
    let numeroAleatorio;
    let tentativas;

    iniciarButton.addEventListener('click', iniciarJogo);
    enviarButton.addEventListener('click', verificarPalpite);

    function iniciarJogo() {
        
        jogoDiv.style.display = 'block'; // Mostra a área do jogo
        tentativas = parseInt(document.getElementById('dificuldade').value); // Pega a dificuldade escolhida
        faseElement.textContent = '1'; // Reseta a fase para 1
        numeroAleatorio = Math.floor(Math.random() * 20) + 1; // Gera um número aleatório entre 1 e 20
        resultadoDiv.textContent = ''; // Limpa resultados anteriores
        chuteInput.value = ''; // Limpa o campo de entrada
        mostrarVidas(); // Mostra os corações no início do jogo
    }

    function mostrarVidas() {
        vidasDiv.innerHTML = ''; // Limpa os corações anteriores
        for (let i = 0; i < tentativas; i++) {
            const coracao = document.createElement('span');
            coracao.innerHTML = '❤️'; // Adiciona um coração vermelho
            vidasDiv.appendChild(coracao); // Adiciona o coração ao container
        }
    }

    function verificarPalpite() {
        const chute = parseInt(chuteInput.value); // Pega o palpite do usuário
        if (isNaN(chute) || chute < 1 || chute > 20) {
            resultadoDiv.textContent = 'Por favor, insira um número entre 1 e 20.';
            return; // Interrompe a execução da função
        }
        if (chute === numeroAleatorio) {
            resultadoDiv.textContent = 'Parabéns! Você acertou!'; // Mensagem de acerto
        } else {
            tentativas--; // Reduz o número de tentativas
            mostrarVidas(); // Atualiza os corações
            if (chute < numeroAleatorio) {
                resultadoDiv.textContent = `Errado! Seu palpite é menor que o número. Você ainda tem ${tentativas} tentativas.`;
            } else {
                resultadoDiv.textContent = `Errado! Seu palpite é maior que o número. Você ainda tem ${tentativas} tentativas.`;
            }

            if (tentativas <= 0) {
                resultadoDiv.textContent += ` Game Over! O número era ${numeroAleatorio}.`; // Mensagem de fim de jogo
                jogoDiv.style.display = 'none'; // Oculta o jogo após o término
            }
        }
        chuteInput.value = ''; // Limpa o campo de entrada após cada palpite
    }
};