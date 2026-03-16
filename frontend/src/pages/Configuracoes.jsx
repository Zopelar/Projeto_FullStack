import {useEffect, useState} from 'react';
import '../styles/Global.css';
import '../styles/Feed.css';
import Alert from '../components/Alert';
import '../styles/Auth.css';


//componente responsavel pela configuração do perfil do usuario
//permite que usuarios autenticados atualizem seus dados cadastrados
function Configuracoes(){
    //estados para gerenciar os inputs
    const [arroba, setArroba] = useState('');
    const [email, setEmail] = useState('');
    const [toastMsg, setToastMsg] = useState('');

    //armazena os dados atuais do usuario
    const [userAtual, setUserAtual] = useState(null);

    //obtem os dados da sessao atual do usuario
    useEffect(() =>{
        const usuarioSalvo = localStorage.getItem('usuarioLogado');
        setUserAtual(JSON.parse(usuarioSalvo));
    },[]);
    
    //gerencia a atualização dos dados do usuário
    //valida os dados e envia para api lidar com a requisição
    const handleAtualizar = async(e)=>{
        e.preventDefault();

        //evita com que o usuario envie uma requisição vazia
        if(!arroba.trim() && !email.trim()){
            setToastMsg("Você precisa mudar alguma informação para poder salvar alterações!");
        }

        const usuarioSalvo = localStorage.getItem('usuarioLogado');
        const user = JSON.parse(usuarioSalvo);

        //se um campo estiver vazio, mantem o valor do dado
        //permite com que um usuario mude apenas uma informação
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