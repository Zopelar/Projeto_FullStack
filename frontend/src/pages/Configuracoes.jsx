import {useEffect, useState} from 'react';
import '../styles/Global.css';
import '../styles/Feed.css';
import Alert from '../components/Alert';
import '../styles/Auth.css';
import {Link, useNavigate} from 'react-router-dom';

function Configuracoes(){
    const [arroba, setArroba] = useState('');
    const [email, setEmail] = useState('');
    const [toastMsg, setToastMsg] = useState('');

    const [userAtual, setUserAtual] = useState(null);

    useEffect(() =>{
        const usuarioSalvo = localStorage.getItem('usuarioLogado');
        setUserAtual(JSON.parse(usuarioSalvo));
    },[]);
    
    const handleAtualizar = async(e)=>{
        e.preventDefault();

        if(!arroba.trim() && !email.trim()){
            setToastMsg("Você precisa mudar alguma informação para poder salvar alterações!");
        }

        const usuarioSalvo = localStorage.getItem('usuarioLogado');
        const user = JSON.parse(usuarioSalvo);

        const novoArroba = arroba.trim() !== '' ? arroba : userAtual.arroba;
        const novoEmail = email.trim() !== '' ? email : userAtual.email;

        try{

            const resposta = await fetch(`http://localhost:5000/usuarios/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ arroba: novoArroba, email: novoEmail })
            });

            const dados = await resposta.json();

            if(resposta.ok){
                setToastMsg('Perfil autualizado com sucesso!');

                const usuarioAtualizado = {...userAtual,arroba: novoArroba,email: novoEmail};
                localStorage.setItem('usuarioLogado',JSON.stringify(usuarioAtualizado));
                
                setUserAtual(usuarioAtualizado);
                setArroba('');
                setEmail('');
            }
            else{
                setToastMsg(`Erro: ${dados.erro}`);
            }
            
        }
        catch (erro){
            setToastMsg('Erro ao conectar com o servidor');
        }
    }

    return(
        <div className='containerGlobal'>
            <div className='feedContainer'>
                <div className='cabecalhoFeed'>
                    <h2>Configurações</h2>
                </div>
                
                <div className='caixaCriarPost'>
                    <Alert mensagem={toastMsg} onClose={() => setToastMsg('')}/>
                
               
                <form onSubmit={handleAtualizar} className='formAuth' style={{marginTop:'1rem'}}>
                    <div className='inserirContainer'>
                        <p>Alterar nome de usuario</p>
                        <input type="text"
                        value = {arroba}
                        onChange={
                            (e)=> setArroba(e.target.value)
                        }
                        placeholder=" "
                        className='inserir'
                        />
                        <label className='dadoSolicitado'>Novo nome de usuário</label>
                    </div>

                    <div className='inserirContainer' style={{marginTop:'1.5rem'}}>
                        <p>Alterar Email vinculado a conta</p>
                        <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='inserir'
                        placeholder=" "
                         />
                         <label className='dadoSolicitado'>Novo Email</label>
                    </div>

                    <div className='postArea'>
                        <button type='submit' className='btnPrimario'>
                                Salvar Alterações
                        </button>
                    </div>
                </form>
                
                </div>

            </div>
        </div>
    );
}

export default Configuracoes