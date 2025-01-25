let listaDeAmigos = []; // Lista para armazenar os nomes dos amigos
let listaJaSorteados = []; // Lista para armazenar os amigos já sorteados

function adicionarAmigo() {
    const input = document.getElementById('amigo');

    if (nome === '') {
        alert('Por favor, digite um nome válido.');
        return;
    }

    if (listaDeAmigos.includes(nome)) {
        alert(`${nome} já foi adicionado.`);
    } else {
        listaDeAmigos.push(nome);
    }

    atualizarListaDeAmigos();  // Atualiza a lista a pagina
    input.value = ''; 
    input.focus();  // Retorna o foco ao campo de entrada
}

function atualizarListaDeAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    listaDeAmigos.forEach((amigo, index) => {
        const item = document.createElement('li');
        item.textContent = amigo;

        // Botão para remover amigo da lista
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = '✖';
        botaoRemover.classList.add('button-remove');
        botaoRemover.onclick = () => removerAmigo(index);

        item.appendChild(botaoRemover);
        lista.appendChild(item);
    });
}

function removerAmigo(index) {
    listaDeAmigos.splice(index, 1);
    atualizarListaDeAmigos();
}

function sortearAmigo() {
    const listaResultado = document.getElementById('resultado');

    if (listaDeAmigos.length < 1) {
        alert('Adicione pelo menos um amigo para realizar o sorteio.');
        return;
    }

    if (listaJaSorteados.length === listaDeAmigos.length) {
        alert('Todos os nomes já foram sorteados. A lista será reiniciada para um novo sorteio.');
        listaJaSorteados = []; // Reinicia a lista de sorteados
        listaResultado.innerHTML = ''; // Limpa a mensagem de resultado
        return;
    }

    let amigoSorteado;

    do {
        const indexSorteado = Math.floor(Math.random() * listaDeAmigos.length);
        amigoSorteado = listaDeAmigos[indexSorteado];
    } while (listaJaSorteados.includes(amigoSorteado));

    listaJaSorteados.push(amigoSorteado);
    exibirResultado(amigoSorteado);
}

function exibirResultado(amigoSorteado) {
    const listaResultado = document.getElementById('resultado');
    listaResultado.innerHTML = '';

    const item = document.createElement('li');
    item.textContent = `Amigo sorteado: ${amigoSorteado}`;
    listaResultado.appendChild(item);
}

function limparLista() {
    listaDeAmigos = []; // Limpa a lista de amigos
    listaJaSorteados = []; // Limpa a lista de sorteados
    atualizarListaDeAmigos(); // Atualiza a lista na pagina
    document.getElementById('resultado').innerHTML = ''; // Limpa o resultado do sorteio
}

// Adiciona evento para mudar a cor do botão enquanto digita
const inputCampo = document.getElementById('amigo');
inputCampo.addEventListener('input', verificarCampo);

// Permitir adicionar amigo pressionando a tecla Enter
inputCampo.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
});

function verificarCampo() {
    const input = document.getElementById('amigo');
    const botaoAdicionar = document.querySelector('.button-add');

    if (input.value.trim() !== '') {
        botaoAdicionar.style.backgroundColor = 'green';
        botaoAdicionar.style.color = 'white';
    } else {
        botaoAdicionar.style.backgroundColor = '';
        botaoAdicionar.style.color = '';
    }
}
