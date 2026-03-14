const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

//chave secreta provisoria para testes
const jwt_secret = 'segredo123';

//banco de dados simulado provisoriamente
const usuariosBD = [];

app.listen(5000,() => {
        console.log("servidor online na porta 5000");
    }
);

app.post('/login', async(req,res) => {
    const {email, senha} = req.body;

    const usuario = usuariosBD.find(user=> user.email === email);

    if(!usuario){
        return res.status(400).json({erro:'email ou senha incorretos'})
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if(!senhaCorreta){
        return res.status(400).json({erro:'email ou senha incorretos'})
    }

    const tokenSessao = jwt.sign({id:usuario.id}, jwt_secret,{expiresIn:'3h'});

    res.status(200).json({
        mensagem:'login realizado com sucesso!',
        token: tokenSessao
    })
});


app.post('/cadastro', async(req,res) => {
        const {email , senha, nome} = req.body;

        const emailExistente = usuariosBD.find(user => user.email ===email);
        const usuarioExistente = usuariosBD.find(user => user.nome === nome);
        
        if(emailExistente){
            return res.status(400).json({erro: 'email ja cadastrado'});
        }

        if(usuarioExistente){
            return res.status(400).json({erro: 'nome de usuario ja cadastrado'});
        }

        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(senha,salt);

        const novoUsuario = {
            id: Date.now().toString(),
            email,
            senha: senhaCriptografada,
            nome
        };

        usuariosBD.push(novoUsuario);

        res.status(201).json({mensagem:'Usuario cadastrado'});
    }
);