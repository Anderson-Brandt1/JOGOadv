window.onload = function() {
    const iniciarButton = document.getElementById('iniciar');
    const enviarButton = document.getElementById('enviar');
    const faseElement = document.getElementById('fase');
    const jogoDiv = document.querySelector('.jogo');
    const resultadoDiv = document.querySelector('.resultado');
    const chuteInput = document.getElementById('chute'); // Referência ao campo de entrada
    const vidasDiv = document.getElementById('vidas'); // Referência ao container de vidas
    const dificuldadeSelect = document.getElementById('dificuldade'); // Referência ao select de dificuldade
    let numeroAleatorio;
    let tentativas;
    let fase = 1; // Adiciona a variável de fase

    iniciarButton.addEventListener('click', iniciarJogo);
    enviarButton.addEventListener('click', verificarPalpite);

    function iniciarJogo() {
        jogoDiv.style.display = 'block'; // Mostra a área do jogo
        dificuldadeSelect.style.display = 'none'; // Oculta a escolha de dificuldade
        tentativas = parseInt(dificuldadeSelect.value); // Pega a dificuldade escolhida
        faseElement.textContent = fase; // Reseta a fase para 1
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
        
        // Validação de entrada
        if (isNaN(chute) || chute < 1 || chute > 20) {
            resultadoDiv.textContent = 'Por favor, insira um número entre 1 e 20.';
            chuteInput.value = ''; // Limpa o campo de entrada
            return; // Interrompe a execução da função
        }

        if (chute === numeroAleatorio) {
            resultadoDiv.textContent = 'Parabéns! Você acertou!'; // Mensagem de acerto
            fase++; // Incrementa a fase
            tentativas = parseInt(dificuldadeSelect.value) + fase - 1; // Aumenta o número de tentativas com base na fase
            faseElement.textContent = fase; // Atualiza a fase exibida
            numeroAleatorio = Math.floor(Math.random() * 20) + 1; // Gera um novo número aleatório
            mostrarVidas(); // Atualiza as vidas para a nova fase
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
                dificuldadeSelect.style.display = 'block'; // Exibe novamente a escolha de dificuldade
                fase = 1; // Reseta a fase para 1 para o próximo jogo
            }
        }
        chuteInput.value = ''; // Limpa o campo de entrada após cada palpite
    }
};