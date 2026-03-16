import {useState} from 'react';
import '../styles/Global.css';
import '../styles/Feed.css';
import Alert from '../components/Alert';
import '../styles/Auth.css';
import {Link, useNavigate} from 'react-router-dom';

function Configuracoes(){
    const [arroba, setArroba] = useState('');
    const [email, setEmail] = useState('');
    const [toastMsg, setToastMsg] = useState('');

    const handleAtualizar = async(e)=>{

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

                    <div className='inserirContainer' styyle={{marginTop:'1.5rem'}}>
                        <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='inserir'
                        placeholder=" "
                         />
                         <label className='dadoSolicitado'>Novo Email</label>
                    </div>
                </form>
                
                </div>

            </div>
        </div>
    );
}

export default Configuracoes