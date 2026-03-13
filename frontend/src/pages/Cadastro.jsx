import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/Auth.css';
import '../styles/Global.css';


function Cadastro(){
    const [email, setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [nome, setNome] = useState('');

    const handleCadastro = (e) => {
        e.preventDefault();
        console.log('tentativa de Cadastro: {email, senha, nome}');
    };

    return(
        <div className="containerGlobal">
            <div className="caixaForm">
                <h2>Realize seu Cadastro</h2>

                <form onSubmit="handleCadastro" className="formAuth">

                    <div className="inserirDados">
                        <label htmlFor="nome">Como você gostaria de ser chamado?</label>
                        <input type="nome"
                            id='nome'
                            placeholder='Digite o seu apelido'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    
                    
                    <div className="inserirDados">
                        <label htmlFor="email">Qual o seu melhor e-mail?</label>
                        <input type="email" 
                            id="email"
                            name="email"
                            placeholder="Digite o seu e-mail"
                            value={email}
                            onChange={(e) =>setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='inserirDados'>
                        <label htmlFor="senha">Crie sua Senha</label>
                        <input type="senha"
                            id="senha"
                            name="senha"
                            placeholder='Digite sua senha'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            />
                    </div>

                   {/* fazer a checagem de senha  */}

                    <button type='submit' className="btnPrimario">Finalizar Cadastro</button>

                    <div className='linkRedirect'>
                        <p>Já possui uma conta? <Link to="/login">Faça seu login aqui</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default Cadastro;