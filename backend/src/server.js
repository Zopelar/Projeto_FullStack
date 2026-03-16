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

//inicialização do banco de dados
const db = new sqlite3.Database('./banco.db',() => {});


// modelagem dos bancos de dados
//cria a tabela caso nao existam
db.run(`CREATE TABLE IF NOT EXISTS posts(
    id TEXT PRIMARY KEY,
    arroba TEXT,
    texto TEXT,
    timestamp TEXT,
    likes INTEGER DEFAULT 0,
    denunciado INTEGER DEFAULT 0
)`);

db.run(`CREATE TABLE IF NOT EXISTS users(
    id TEXT PRIMARY KEY,
    arroba TEXT,
    email TEXT UNIQUE,
    hashSenha TEXT,
    isAdmin INTEGER DEFAULT 0
)`);

//rota de login
//realiza a comparação dos hashs e gera o token da sessao
app.post('/login',(req,res) => {
    const {email, senha} = req.body;

    const query = `SELECT * FROM users WHERE email = ?`;

    db.get(query, [email], async(err,usuario)=>{
        if(err){
            return res.status(500).json({erro:'Erro no banco de dados.'});
        }
        //valida a existencia do usuario
        if(!usuario){
            return res.status(401).json({erro: "Email ou senha incorretos!"});
        }

        try{
            //compara as senhas criptografadas
            const senhaValida = await bcrypt.compare(senha, usuario.hashSenha);

            if(!senhaValida){
                return res.status(401).json({erro: "Email ou senha incorretos!"});
            }

            //gera o token da sessao com JWT e expira em 3 horas
            const tokenSessao = jwt.sign({ id: usuario.id }, jwt_secret, { expiresIn: '3h' });

            res.status(200).json({
                mensagem: 'Login realizado com sucesso!',
                token: tokenSessao,
                usuario: {
                    id: usuario.id,
                    arroba:usuario.arroba,
                    email:usuario.email,
                    isAdmin: usuario.isAdmin
                }
            });
        }
        catch (erro){
            res.status(500).json({erro: 'Erro interno ao processar o login'});
        }
    });
});

//rota de cadastro
//resposavel pelo registro de novos usuários e criptografia de senhas
app.post('/cadastro',async(req,res) =>{
    const {id, arroba, email, senha} = req.body;

    try {
        //hashifica a senha com um salt de valor 10
        const hashSenha = await bcrypt.hash(senha,10);

        let isAdmin;

        //atribui admin ao email especificado
        if(email === 'admin@admin.com'){
            isAdmin = 1;
        }
        else{
            isAdmin = 0;
        }

        const query = `INSERT INTO users (id, arroba, email, hashSenha,isAdmin) VALUES (?,?,?,?,?)`

        db.run(query, [id,arroba,email,hashSenha,isAdmin], function(err){
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


//rota de geração de posts
//responsavel pela listagem e criação
app.get('/posts',(req,res) => {
    db.all('SELECT * FROM posts ORDER BY rowid DESC', [], (err,rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(rows);
    })
})

//rota de promoção de usuario
//resposavel por garantir poderes de admin a um usuario
app.put('/usuarios/promover', (req,res) =>{
    const {email} = req.body;

    const query = `UPDATE users SET isAdmin = 1 WHERE email = ?`;

    db.run(query,[email], function(err){
        if(err){
            return res.status(500).json({erro: err.message});
        }

        res.status(200).json({mensagem:'Usuário promovido com sucesso!'})
    })
})

//rota de listagem de posts denunciados
//lista posts denunciados
app.get('/posts/denunciados', (req,res)=> {
    
    const query = `SELECT * FROM posts WHERE denunciado = 1`;
    db.all(query, [], (err,rows) => {
        if(err){
            return res.status(500).json({erro:err.message});
        }
        res.json(rows);
    })
})

//rota de marcação de denuncias
//marca os posts como denunciados
app.put('/posts/:id/denunciar', (req,res)=>{
    const idPost = req.params.id;

    const query = `UPDATE posts SET denunciado = 1 WHERE id = ?`;

    db.run(query,[idPost], function(err){
        if(err){
            return res.status( 500).json({erro:err.message});
        }
        res.status(200).json({mensagem:'Post denunciado com sucesso!'});
    })
})

//rota de remoção de denuncia
//retira a flag de denuncia do post
app.put('/posts/:id/perdoar', (req,res) =>{
    const idPost = req.params.id;

    const query = `UPDATE posts SET denunciado = 0 WHERE id = ?`;

    db.run(query,[idPost], function(err){
        if(err){
            return res.status( 500).json({erro:err.message});
        }
        res.status(200).json({mensagem:'denuncia ignoradacom sucesso!'});
    })
})

//rota de adição de posts
//salva um post no banco de dados
app.post('/posts', (req,res) => {
    const {id,arroba,texto,timestamp} = req.body;
    const query = `INSERT INTO posts (id, arroba, texto, timestamp, likes) VALUES (?, ?, ?, ?, ?)`

    db.run(query, [id,arroba,texto,timestamp,0], function(err){
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.status(201).json({ mensagem: 'Post salvo com sucesso!', id: id });
    });
})

//rota de iteração de like
//aumenta ou diminui o numero de likes dependendo da ação do usuario
app.put('/posts/:id/like', (req,res)=> {
    const idPost = req.params.id;
    const {acao} = req.body;

    let query = '';

    if(acao ==='like'){
        query =`UPDATE posts SET likes = likes + 1 WHERE id =?`; 
    }
    else if(acao == 'unlike'){
        query =`UPDATE posts SET likes = likes - 1 WHERE id =?`;
    }
    else{
        return res.status(400).json({erro: 'Ação nao reconhecida'})
    }

    db.run(query,[idPost], function(err){
        if(err){
            return res.status(500).json({erro: err.message});
        }
        
        if(acao ==='like') res.status(200).json({mensagem: 'Publicação curtida'});
        else if(acao ==='unlike') res.status(200).json({mensagem: 'Like retirado da publicação!'})
    })
})

//rota de atualização de dados do usuario
//responsavel por  alterar o arroba e/ou email do usuario
app.put('/usuarios/:id', (req,res)=> {
    const idUsuario = req.params.id;
    const {arroba, email} =req.body;

    //busca o arroba atual no banco antes de atulizar
    db.get(`SELECT arroba FROM users WHERE id = ?`, [idUsuario], (err, usuarioBanco) => {
        if (err || !usuarioBanco) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        const arrobaAntigo = usuarioBanco.arroba;
        const queryUser = `UPDATE users SET arroba = ?, email = ? WHERE id = ? `;

        //atualiza os dados na tabela de usuarios
        db.run(queryUser, [arroba,email,idUsuario], function(errUser){
            if(errUser){
                if(errUser.message.includes('UNIQUE constraint failed')){
                    return res.status(400).json({erro: 'Este email ja está sendo utilizado!'})
                }
            return res.status(500).json({err0: 'Erro interno'});
            }

            //atualiza os posts antigos, colocando o novo arroba
            const novoArrobaFormatado = `@${arroba.toLowerCase().replace(/\s+/g, '')}`;
            const arrobaAntigoFormatado = `@${arrobaAntigo.toLowerCase().replace(/\s+/g, '')}`;
            const queryPosts = `UPDATE posts SET arroba = ? WHERE arroba = ?`;

            db.run(queryPosts, [novoArrobaFormatado, arrobaAntigoFormatado], function(errPosts) {
                if (errPosts) {
                    console.error("Erro ao atualizar os posts antigos:", errPosts);
                }
                
                res.status(200).json({ mensagem: 'Usuário e posts atualizados com sucesso!' });
        
            });
        });
    });
});

//rota de listagem de usuarios
//lista todos os usuarios existentes
app.get('/usuarios', (req,res) => {
    db.all(`SELECT id, arroba, email FROM users`, [], (err,rows)=> {
        if(err){
            return res.status(500).json({erro: err.message });
        }
        res.json(rows);
    });
});

//rota de exclusao de usuarios
//deleta um usuario do banco de dados
app.delete('/usuarios/:id', (req,res) => {
    const idUsuario = req.params.id;
    db.run(`DELETE FROM users WHERE id=?`, [idUsuario], function(err){
        if(err){
            return res.status(500).json({erro: err.message});
        }
        res.status(200).json({mensagem:'Usuário excluido com sucesdso!'});
    });
});

//rota de exclusão de post
//responsavel pela exclusao de um post do banco de dados
app.delete('/posts/:id', (req,res) => {
    const idPost = req.params.id;
    db.run(`DELETE FROM posts WHERE id=?`, [idPost], function(err){
        if(err){
            return res.status(500).json({erro: err.message});
        }
        res.status(200).json({mensagem:'Post excluido com sucesdso!'});
    });
});


app.listen(5000,() => {
        console.log("servidor online na porta 5000");
    }
);
