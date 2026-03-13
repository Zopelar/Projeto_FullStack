import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/Auth.css';
import '../styles/Global.css';

function Login(){
    const [email, setEmail] = useState('');
    const [senha,setSenha] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('tentativa de login: {email, senha}');
    };

    return(
        <div className="containerGlobal">
            <div className="caixaForm">
                <h2>Faça o Login</h2>

                <form onSubmit="handleLogin" className="formAuth">

                    <div className="inserirDados">
                        <label htmlFor="email">E-mail</label>
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
                        <label htmlFor="senha">Senha</label>
                        <input type="senha"
                            id="senha"
                            name="senha"
                            placeholder='Digite sua senha'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            />
                    </div>

                    <button type='submit' className="btnPrimario">Entrar</button>

                    <div className='linkRedirect'>
                        <p>Ainda não possui uma conta? <Link to="/cadastro">Cadastre-se aqui</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default Login;