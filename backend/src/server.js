const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(cors());
app.use(express.json());

//chave secreta provisoria para testes
const jwt_secret = 'segredo123';

const db = new sqlite3.Database('./banco.db',() => {});

db.run(`CREATE TABLE IF NOT EXISTS posts(
    id TEXT PRIMARY KEY,
    arroba TEXT,
    texto TEXT,
    timestamp TEXT,
    likes INTEGER DEFAULT 0
)`);

db.run(`CREATE TABLE IF NOT EXISTS users(
    id TEXT PRIMARY KEY,
    arroba TEXT,
    email TEXT UNIQUE,
    hashSenha TEXT
)`);

app.post('/login',(req,res) => {
    const {email, senha} = req.body;

    const query = `SELECT * FROM users WHERE email = ?`;

    db.get(query, [email], async(err,usuario)=>{
        if(err){
            return res.status(500).json({erro:'Erro no banco de dados.'});
        }
        if(!usuario){
            return res.status(401).json({erro: "Email ou senha incorretos!"});
        }

        try{
            const senhaValida = await bcrypt.compare(senha, usuario.hashSenha);

            if(!senhaValida){
                return res.status(401).json({erro: "Email ou senha incorretos!"});
            }

            const tokenSessao = jwt.sign({ id: usuario.id }, jwt_secret, { expiresIn: '3h' });

            res.status(200).json({
                mensagem: 'Login realizado com sucesso!',
                token: tokenSessao,
                usuario: {
                    id: usuario.id,
                    arroba:usuario.arroba,
                    email:usuario.email
                }
            });
        }
        catch (erro){
            res.status(500).json({erro: 'Erro interno ao processar o login'});
        }
    });
});

app.post('/cadastro',async(req,res) =>{
    const {id, arroba, email, senha} = req.body;

    try {
        //hashifica a senha com um salt de valor 10
        const hashSenha = await bcrypt.hash(senha,10);

        const query = `INSERT INTO users (id, arroba, email, hashSenha) VALUES (?,?,?,?)`

        db.run(query, [id,arroba,email,hashSenha], function(err){
            if(err){
                return res.status(500).json({erro:err.message});
            }
            res.status(201).json({mensagem: "Usuário cadastrado com sucesso!"});
        });
    }
    catch (erro){
        res.status(500).json({erro:'Erro ao processar o cadastro'})
    }
})

app.get('/posts',(req,res) => {
    db.all('SELECT * FROM posts ORDER BY rowid DESC', [], (err,rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(rows);
    })
})

app.post('/posts', (req,res) => {
    const {id,arroba,texto,timestamp} = req.body;
    const query = `INSERT INTO posts (id, autor,arroba,texto,timestamp,likes) VALUES (?, ?, ?, ?, ?, ?)`

    db.run(query, [id,arroba,texto,timestamp,0], function(err){
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.status(201).json({ mensagem: 'Post salvo com sucesso!', id: id });
    });
})

app.listen(5000,() => {
        console.log("servidor online na porta 5000");
    }
);
