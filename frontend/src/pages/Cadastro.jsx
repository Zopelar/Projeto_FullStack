import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/Auth.css';
import '../styles/Global.css';
import Alert from '../components/Alert';

function Cadastro(){
    const [email, setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [confirmarSenha,setConfirmarSenha] = useState('');

    const navigate = useNavigate();

    const [toastMsg,setToastMsg] = useState('');

    const handleCadastro = async (e) => {
        e.preventDefault();
        //console.log('tentativa de Cadastro: {email, senha, nome}');
        
        const dadosUsuario = {
            id: crypto.randomUUID(),
            arroba: nome,
            email: email,
            senha: senha

        };

        if(senha !== confirmarSenha){
            setToastMsg('As senhas não coincidem!');
            return;
        }

        try{
            const resposta = await fetch('http://localhost:5000/cadastro',{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify(dadosUsuario)
            });

            const dados = await resposta.json();

            if(resposta.ok){
                //console.log('sucesso', dados.mensagem);
                setToastMsg('Cadastro realizado com sucesso!');
                
                //1 segundo para o usuario conseguir ver a mensagem de cadastro realizado com sucesso
                setTimeout(()=>{
                    navigate('/login');
                }, 1000);
                
            }
            else{
                setToastMsg(`${dados.erro}`);
            }
        }
        catch (erro) {
            setToastMsg('Não foi possível conectar ao servidor. Verifique se ele está rodando.');
        }
    };

    return(
        <div className="containerGlobal">
            <Alert mensagem ={toastMsg} onClose={()=> setToastMsg('')}/>
            <div className="caixaForm">
                <h2>Realize seu Cadastro</h2>

                <form onSubmit={handleCadastro} className="formAuth">
                    
                    <div className="inserirContainer">
                        <p>Como você gostaria de ser chamado?</p>

                        <input 
                        type="text"
                        required
                        name='nome'
                        autocomplete='off'
                        placeholder=" "
                        value = {nome}
                        onChange={(e)=>
                            setNome(e.target.value)
                        }
                        className='inserir'
                        />
                        <label htmlFor="nome" className='dadoSolicitado'>Digite seu apelido</label>    
                    </div>

                    <div className="inserirContainer">
                        <p>Qual o seu melhor E-mail?</p>

                        <input 
                        type="email"
                        required
                        name='email'
                        placeholder=" "
                        autocomplete='off'
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className='inserir'
                        />
                        <label htmlFor="email" className='dadoSolicitado'>Digite seu E-mail</label>    
                    </div>

                    <div className="inserirContainer">
                        <p>Crie sua senha:</p>

                        <input 
                        type="password"
                        required
                        name='senha'
                        placeholder=" "
                        autocomplete='off'
                        value={senha}
                        onChange={(e) =>
                            setSenha(e.target.value)
                        }
                        className='inserir'
                        />
                        <label htmlFor="senha" className='dadoSolicitado'>Digite sua senha</label>    
                    </div>

                    
                    <div className="inserirContainer">
                        <p>Confirme sua senha:</p>

                        <input 
                        type="password"
                        required
                        name='senha'
                        autocomplete='off'
                        placeholder=" "
                        value={confirmarSenha}
                        onChange={(e)=> 
                            setConfirmarSenha(e.target.value)
                        }
                        className='inserir'
                        />
                        <label htmlFor="senha" className='dadoSolicitado'>Digite sua senha novamente</label>    
                    </div>

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