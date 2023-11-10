// String de conexão com o banco 
// mongodb+srv://murilombarone:<password>@cluster0.vwcc4zd.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const app = express();
app.use(express.json());
app.use(cors());

async function conectarMongo(){
    await mongoose.connect(`mongodb+srv://murilombarone:98533192@cluster0.vwcc4zd.mongodb.net/?retryWrites=true&w=majority`)
}

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}));

const usuarioSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    senha: {type: String, required: true, unique: true}
});
usuarioSchema.plugin(uniqueValidator);
const Usuario = mongoose.model("Usuario", usuarioSchema);

// ponto de acesso para uma requisição GET /oi
app.get('/oi', (req, res) => res.send('oi'));

// endpoint para exibir os filmes
app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find();
    res.json(filmes)
});

// endpoint para armazenar um novo filme no banco de dados
app.post('/filmes', async (req, res) => {
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    const filme = new Filme({
        titulo: titulo,
        sinopse: sinopse
    });
    await filme.save();
    const filmes = await Filme.find();
    res.json(filmes);
})

//endpoint para cadastrar novo usuario
app.post('/signup', async (req, res) => {
    try {
        const login = req.body.login;
        const senha = req.body.senha;
        const criptografada = await bcrypt.hash(senha, 10);
        const usuario = new Usuario ({
            login: login, 
            senha: criptografada
        })
        const respostaDoMongo = await usuario.save();
        console.log(respostaDoMongo);
        res.status(201).end();
    }
    catch(e) {
        console.log(e);
        res.status(409).end();
    }
})

app.post('/login', async (req, res) => {
    const login = req.body.login;
    const senha = req.body.senha;
    const u = await Usuario.findOne({login: login});
    if (!u){
        return res.status(401).json({mensagem: "Usuario não cadastrado"});
    }
    const senhaValida = await bcrypt.compare(senha, u.senha);
    if (!senhaValida){
        return res.status(401).json({mensagem: "Senha incorreta"});
    }
    // Aqui vem do código de geração do token
    res.end();
})

app.listen(3000, () => {
    try{
    conectarMongo();
    console.log('conexão ok e app up & running');
    }
    catch(e){
        console.log("falha técnica: ",e);
    }
});