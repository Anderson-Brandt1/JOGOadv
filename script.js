window.onload = function() {
    const iniciarButton = document.getElementById('iniciar');
    const enviarButton = document.getElementById('enviar');
    const faseElement = document.getElementById('fase');
    const jogoDiv = document.querySelector('.jogo');
    const resultadoDiv = document.querySelector('.resultado');
    const chuteInput = document.getElementById('chute'); // Referência ao campo de entrada
    const vidasDiv = document.getElementById('vidas'); // Referência ao container de vidas
    const dificuldadeSelect = document.getElementById('dificuldade'); // Referência ao select de dificuldade
    const gameOverMessage = document.getElementById('gameOverMessage');
    const numeroCorreto = document.getElementById('numeroCorreto');
    const reiniciarButton = document.getElementById('reiniciar');
    const sairButton = document.getElementById('sair');

    let numeroAleatorio;
    let tentativas;
    let fase = 1; // Adiciona a variável de fase
    let maxChute = 20; // Valor máximo inicial

    iniciarButton.addEventListener('click', iniciarJogo);
    enviarButton.addEventListener('click', verificarPalpite);
    reiniciarButton.addEventListener('click', reiniciarJogo);
    sairButton.addEventListener('click', sairJogo);

    function iniciarJogo() {
        jogoDiv.style.display = 'block'; // Mostra a área do jogo
        dificuldadeSelect.style.display = 'none'; // Oculta a escolha de dificuldade
        tentativas = parseInt(dificuldadeSelect.value); // Pega a dificuldade escolhida
        faseElement.textContent = fase; // Reseta a fase para 1
        numeroAleatorio = sortearNumero(); // Gera um número aleatório de acordo com a fase
        resultadoDiv.textContent = ''; // Limpa resultados anteriores
        chuteInput.value = ''; // Limpa o campo de entrada
        chuteInput.setAttribute("placeholder", `Digite um número entre 1 e ${maxChute}`); // Atualiza o placeholder
        mostrarVidas(); // Mostra as vidas no início do jogo
        gameOverMessage.style.display = 'none'; // Garante que a mensagem de Game Over esteja oculta
    }

    function sortearNumero() {
        const max = fase * 20; // 20, 40, 60, 80, 100
        return Math.floor(Math.random() * max) + 1; // Gera um número aleatório de acordo com a fase
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
        
        // Validação de entrada
        if (isNaN(chute) || chute < 1 || chute > (fase * 20)) {
            resultadoDiv.textContent = `Por favor, insira um número entre 1 e ${fase * 20}.`;
            chuteInput.value = ''; // Limpa o campo de entrada
            return; // Interrompe a execução da função
        }

        if (chute === numeroAleatorio) {
            resultadoDiv.textContent = 'Parabéns! Você acertou!'; // Mensagem de acerto
            fase++; // Incrementa a fase
            tentativas = parseInt(dificuldadeSelect.value); // Reinicia as tentativas para a nova fase
            faseElement.textContent = fase; // Atualiza a fase exibida
            numeroAleatorio = sortearNumero(); // Gera um novo número aleatório
            mostrarVidas(); // Atualiza as vidas para a nova fase
            maxChute = fase * 20; // Atualiza o valor máximo
            chuteInput.setAttribute("placeholder", `Digite um número entre 1 e ${maxChute}`); // Atualiza o placeholder
        } else {
            tentativas--; // Reduz o número de tentativas
            mostrarVidas(); // Atualiza os corações
            if (chute < numeroAleatorio) {
 resultadoDiv.textContent = `Errado! Seu palpite é menor que o número. Você ainda tem ${tentativas} tentativas.`;
            } else {
                resultadoDiv.textContent = `Errado! Seu palpite é maior que o número. Você ainda tem ${tentativas} tentativas.`;
            }

            if (tentativas <= 0) {
                gameOver(); // Chama a função de Game Over
            }
        }
        chuteInput.value = '';
    }

    function gameOver() {
        resultadoDiv.textContent += ` Game Over! O número era ${numeroAleatorio}.`; // Mensagem de fim de jogo
        jogoDiv.style.display = 'none'; // Oculta o jogo após o término
        dificuldadeSelect.style.display = 'block'; // Exibe novamente a escolha de dificuldade
        fase = 1; // Reseta a fase para 1 para o próximo jogo
        maxChute = 20; // Reseta o valor máximo
        chuteInput.setAttribute("placeholder", `Digite um número entre 1 e ${maxChute}`); // Atualiza o placeholder
        numeroCorreto.textContent = numeroAleatorio; // Mostra o número correto na mensagem
        gameOverMessage.style.display = 'block'; // Mostra a mensagem de Game Over
    }

    function reiniciarJogo() {
        gameOverMessage.style.display = 'none'; // Oculta a mensagem de Game Over
        dificuldadeSelect.style.display = 'block'; // Exibe a escolha de dificuldade
        jogoDiv.style.display = 'none'; // Oculta o jogo
        iniciarJogo(); // Reinicia o jogo
    }

    function sairJogo() {
        window.close(); // Tenta fechar a aba/janela do navegador
    }
};