const protocolo = 'http://' ;
const baseUrl = 'localhost:3000';

async function obterFilmes(){
    // console.log('teste 1 2 3');
    const filmesEndPoint = '/filmes';
    const URLcompleta = `${protocolo}${baseUrl}${filmesEndPoint}`;
    const filmes = (await axios.get(URLcompleta)).data;
    // console.log(filmes);
    let tabela = document.querySelector('.filmes');
    let corpoTabela = tabela.getElementsByTagName('tbody')[0];
    for (let filme of filmes) {
        let linha = corpoTabela.insertRow(0);
        let celulaTitulo = linha.insertCell(0);
        let celulaSinopse = linha.insertCell(1);
        celulaTitulo.innerHTML = filme.titulo;
        celulaSinopse.innerHTML = filme.sinopse;
    }
}
// tentativa de cadastro 
async function cadastrarUsuario(){
    const cadastroEndPoint = '/signup';
    const URLcompleta = `${protocolo}${baseUrl}${cadastroEndPoint}`;
    let usuarioInput = document.querySelector('#usuarioInput');
    let senhaInput = document.querySelector('#senhaInput');
    let usuario = usuarioInput.value;
    let senha = senhaInput.value;
    if (usuario && senha){
        usuarioInput = '';
        senhaInput = '';
        const usuarios = (await axios.post(URLcompleta, {usuario, senha})).data;

        for (let cadastrado of usuarios) {
            let linha = corpoTabela.insertRow(0);
            let celulaUsuario = linha.insertCell(0);
            let celulaSenha = linha.insertCell(1);
            celulaUsuario.usuarios = cadastrado.usuario;
            celulaSenha.usuarios = cadastrado.senha;
        }
    }
    else {
        let alert = document.querySelector('.alert');
        alert.classList.add('show');
        alert.classList.remove('d-none');
        setTimeout(() => {
            alert.classList.add('d-none');
            alert.classList.remove('show');
        }, 5000);
    } 
}

async function cadastrarFilme(){
    const filmesEndPoint = '/filmes';
    const URLcompleta = `${protocolo}${baseUrl}${filmesEndPoint}`;
    let tituloInput = document.querySelector('#tituloInput');
    let sinopseInput = document.querySelector('#sinopseInput');
    let titulo = tituloInput.value;
    let sinopse = sinopseInput.value;
    if (titulo && sinopse){
        tituloInput.value = '';
        sinopseInput.value = '';
        const filmes = (await axios.post(URLcompleta, {titulo, sinopse})).data;
        let tabela = document.querySelector('.filmes');
        let corpoTabela = tabela.getElementsByTagName('tbody')[0];
        corpoTabela.innerHTML = '';

        for (let filme of filmes) {
            let linha = corpoTabela.insertRow(0);
            let celulaTitulo = linha.insertCell(0);
            let celulaSinopse = linha.insertCell(1);
            celulaTitulo.innerHTML = filme.titulo;
            celulaSinopse.innerHTML = filme.sinopse;
        }
    }
    else {
        let alert = document.querySelector('.alert');
        alert.classList.add('show');
        alert.classList.remove('d-none');
        setTimeout(() => {
            alert.classList.add('d-none');
            alert.classList.remove('show');
        }, 5000);
    }
}