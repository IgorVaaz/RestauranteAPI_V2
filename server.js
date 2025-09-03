// server.js

// Passo 1: Chamar nosso chef "Express" para o trabalho.
const express = require('express');

// Passo 2: Criar o aplicativo, que é a nossa área de trabalho na cozinha.
const app = express();

// Passo 3: Ensinar nosso servidor a entender o formato JSON.
// JSON é como um bilhete de pedido bem organizado que o Postman vai nos mandar.
app.use(express.json());

// NOSSO "BANCO DE DADOS" TEMPORÁRIO
// É uma lista vazia que vai guardar os usuários que se cadastrarem.
let bancoDeDados = [];

// Passo 4: Definir o número da "porta" da nossa cozinha. 
// O Postman precisa saber em qual porta bater. Vamos usar a 3000.
const PORT = 3000;

// ===================================================================
// Passo 5: Criar nossa primeira "porta" de entrada (endpoint).
// Quando alguém fizer um pedido do tipo POST para /registrar, esse código vai rodar.
// POST significa que estamos ENVIANDO dados para o servidor.
app.post('/registrar', (req, res) => {

    // Pegamos o nome e a senha que vieram no "corpo" (body) do pedido.
    const nome = req.body.nome;
    const senha = req.body.senha;

    console.log('Recebi um novo pedido de registro!');
    console.log('Nome:', nome);
    console.log('Senha:', senha);

    // Se o pedido veio sem nome ou sem senha...
    if (!nome || !senha) {
        // ...mandamos uma resposta de erro!
        return res.send('Ei, você esqueceu de mandar o nome ou a senha!');
    }
     // 1. Criamos um "pacotinho" com os dados do novo usuário
    const novoUsuario = {
        nome: nome,
        senha: senha // Em projetos reais, nunca guardamos a senha assim! Mas hoje pode.
    };

      // 2. Adicionamos o novo usuário ao nosso "caderninho"
    bancoDeDados.push(novoUsuario);

     // Bônus: vamos mostrar no terminal como está nosso banco de dados agora!
    console.log('Banco de dados atualizado:', bancoDeDados);

    // Se deu tudo certo, mandamos uma resposta de sucesso!
    res.send(`Olá, ${nome}! Seu registro foi recebido com sucesso. Sua senha secreta é ${senha}, não conte a ninguém!`);
});
// ===================================================================
// ===================================================================
// NOVA ROTA GET PARA LISTAR OS USUÁRIOS
// Quando alguém pedir (GET) a lista em /usuarios...
app.get('/usuarios', (req, res) => {
    console.log('Alguém pediu a lista de usuários!');

    // ...nós simplesmente mandamos nosso "caderninho" como resposta!
    // res.json é ótimo para mandar listas e objetos.
    res.json(bancoDeDados);
});
// ===================================================================

//NOTA RODA GET PARA BUSCAR UM USUARIO ESPECIFICO PELO NOME
// O ":nome" é um placeholder. Ele diz: "aqui vai entrar uma informação variavel".
app.get('/usuarios/:nome', (req, res) => {

    // 1. Pegamos a "pista" que veio na URL.
    // O Express guarda os parâmetros da rota dentro de 'req.params'
    const nomeDoUsuarioBuscado = req.params.nome;

    console.log(`Recebi um pedido para encontrar o usuário: ${nomeDoUsuarioBuscado}`);

    // 2. Agora, procuramos no nosso "banco de dados" por esse usuário.
    // O método .find() é perfeito para isso! Ele para assim que encontra o primeiro resultado.
    const usuarioEncontrado = bancoDeDados.find((usuario) => {
        return usuario.nome.toLowerCase() === nomeDoUsuarioBuscado.toLowerCase();
    });

    // 3. Verificamos se o detetive teve sucesso.
    if (usuarioEncontrado) {
        // Se encontrou, manda os dados do usuário como resposta!
        console.log('Usuario encontrato!', usuarioEncontrado);
        res.json(usuarioEncontrado);
    } else {
        // Se não encontrou, manda uma mensagem de erro.
        console.log(`Usuario "${nomeDoUsuarioBuscado}" não encontrado!`);
        res.send(`Desculpe, o usuário "${nomeDoUsuarioBuscado}" não foi encontrado!`);
    }
});

// Passo 6: Ligar o fogão! Ou seja, iniciar nosso servidor.
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando e ouvindo na porta ${PORT}. Pode mandar os pedidos!`);
});