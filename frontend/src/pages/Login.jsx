import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/Auth.css';
import '../styles/Global.css';
import Alert from '../components/Alert';

function Login(){
    const [email, setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const navigate = useNavigate();

    const [toastMsg, setToastMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        //console.log('tentativa de login: {email, senha}');
        
        try{
            const resposta = await fetch('http://localhost:5000/login',{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({email, senha})
            });

            const dados = await resposta.json();

            if(resposta.ok){
                //console.log('Login feito com sucesso', dados);
                localStorage.setItem('meuToken', dados.token);
                
                setToastMsg('Login efetuado com sucesso!');

                //alert('Login realizado com sucesso!', );
                
                //timeout para fazer com que o usuario consiga ver 
                // a mensagem de login bam sucedido antes de entrar
                // no site de fatoo
                setTimeout(() =>{
                    navigate('/feed');
                }, 1000)                
            }
            else{
                setToastMsg(`Erro: ${dados.erro}`);
            }

        }
        catch(erro){
            console.error('erro de conexao no login', erro);
            setToastMsg('Erro ao conectar com o servidor!');
            //alert('Erro ao conectar com o servidor');
        }
    };

    return(
        <div className="containerGlobal">
            <Alert mensagem={toastMsg} onClose={() => setToastMsg('')}/>
            <div className="caixaForm">
                <h2>Faça o Login</h2>

                <form onSubmit={handleLogin} className="formAuth">
                                        
                    <div className="inserirContainer">
                        <input 
                        type="email"
                        required
                        name='email'
                        value={email}
                        placeholder=" "
                        onChange={(e)=>
                            setEmail(e.target.value)
                        }
                        autocomplete='off'
                        className='inserir'
                        />
                        <label htmlFor="email" className='dadoSolicitado'>E-mail</label>    
                    </div>

                    <div className="inserirContainer">
                        <input 
                        type="password"
                        required
                        name='senha'
                        value={senha}
                        placeholder=" "
                        onChange={(e) =>
                            setSenha(e.target.value)
                        }
                        autocomplete='off'
                        className='inserir'
                        />
                        <label htmlFor="password" className='dadoSolicitado'>Senha</label>    
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