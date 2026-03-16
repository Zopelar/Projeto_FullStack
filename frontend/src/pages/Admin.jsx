import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/Global.css';
import '../styles/Feed.css';
import '../styles/Admin.css';
import Alert from '../components/Alert';


//Painel para Administração
//centraliza a gestao de usuarios e moderação de conteudo

function Admin(){
    // estados para mensagens de feedback e armazenamentos de dados da API
    const [toastMsg, setToastMsg] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [posts, setPosts] = useState([]);
    const [emailPromocao, setEmailPromocao] = useState('');
    const [postsDenunciados,setPostsDenunciados] = useState([]);

    const navigate = useNavigate();

    // hook de proteção de rota inicial
    useEffect(()=>{
        
        const usuarioSalvo = localStorage.getItem('usuarioLogado');
        const user = JSON.parse(usuarioSalvo);

        if(!user || user.isAdmin !== 1){
            setToastMsg('área exclusiva de administradores');
            navigate('/feed');
            return;
        }
        
        carregarDados();
    },[]);


    //busca inicial por dados
    //centraliza a requisição de dados que populam as listas da moderação
    const carregarDados = async () => {
        try{
            //busca por usuarios
            const resUsuarios = await fetch('http://localhost:5000/usuarios');
            const dadosUsuarios = await resUsuarios.json();
            setUsuarios(dadosUsuarios);

            //buscas por posts
            const resPosts = await fetch('http://localhost:5000/posts');
            const dadosPosts = await resPosts.json();
            setPosts(dadosPosts);

            //busca por posts com denuncias
            const resDenunciados = await fetch('http://localhost:5000/posts/denunciados');
            const dadosDenunciados = await resDenunciados.json();
            setPostsDenunciados(dadosDenunciados);
        }  
        catch (erro){
            setToastMsg('erro ao carregar dados');
        }
    };


    //promove um usuario a administrador atraves do seu email
    const handlePromover = async (e) => {
        e.preventDefault();
        
        if(!emailPromocao.trim()){
            return setToastMsg("Digite o e-mail do usuário que deseja promover");
        }

        try {
            const res = await fetch(`http://localhost:5000/usuarios/promover`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailPromocao })
            });

            const dados = await res.json();

            if(res.ok) {
                setToastMsg('Usuário promovido a administrador com sucesso!');
                setEmailPromocao('');//limpa a caixa de texto
            } else {
                setToastMsg(`Erro: ${dados.erro}`);
            }
        } catch(erro) {
            setToastMsg('Erro ao tentar promover usuário');
        }
    };
    

    //remove um usuario permanentemente do sistema
    const deletarUsuario = async (id) => {

        try{
            const res = await fetch(`http://localhost:5000/usuarios/${id}`, {method: 'DELETE'});
            if(res.ok){
                setToastMsg('Usuário excluido!');
                setUsuarios(usuarios.filter(user => user.id !== id));
            }
        }
        catch(erro){
            setToastMsg('erro ao tentar excluir usuário');
        }
    }


    //exclui posts (é utilizada pelos admins e pelo usuario que quer deletar seu proprio post)
    const deletarPost = async (id) => {

        try{
            const res = await fetch(`http://localhost:5000/posts/${id}`, {method: 'DELETE'});
            if(res.ok){
                setToastMsg('Post excluido!');
                setPosts(posts.filter(post => post.id !== id));
            }
        }
        catch(erro){
            setToastMsg('erro ao tentar excluir post');
        }
    }

    //remove a flag de denuncia de um post, retirando ele da lista de denunciados
    const perdoarDenuncia = async(id) => {
        try{
            const resposta = await fetch(`http://localhost:5000/posts/${id}/perdoar`, {method:'PUT'});
            if(resposta.ok){
                setToastMsg('Denúncia ignorada com sucesso!');
                setPostsDenunciados(postsDenunciados.filter(post => post.id !== id));
            }
        }
        catch(erro){
            setToastMsg('erro interno ao perdoar denúncia');
        }
    }

    return(
        <div className='containerGlobal'>
            <div className='feedContainer'>
                <div className='cabecalhoFeed'>
                    <h2>Painel do Administrador</h2>
                </div>
                
                <Alert mensagem={toastMsg} onClose={() => setToastMsg('')} />

                <div className='painelAdmin'>
                    <h3>Conceder Permissão de Administrador</h3>
                    <form onSubmit={handlePromover} style={{ display: 'flex', gap: '1rem' }}>
                        <input 
                            type="email" 
                            placeholder="E-mail do usuário" 
                            value={emailPromocao}
                            onChange={(e) => setEmailPromocao(e.target.value)}
                            style={{ flex: 1, padding: '0.8rem', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: '#c9d1d9' }}
                        />
                        <button type="submit" className='btnPrimario' >
                            Promover
                        </button>
                    </form>
                </div>

                <div className='painelAdmin'>
                    <h3> Gerenciar Usuarios</h3>
                    {usuarios.map(user => (
                        <div key={user.id} className='adminCard'>
                            <div>
                                <strong> {user.arroba } </strong>
                                <p> {user.email} </p>
                            </div>
                            <button
                                className='btnVermelho'
                                onClick={() => deletarUsuario(user.id)}
                            >
                            Excluir Usuario
                            </button>
                        </div>
                    ))}
                </div>
                
                <div className='painelAdmin'>
                    <h3>Posts Denunciados</h3>
                    {postsDenunciados.length === 0 ?(
                        <p> Nenhuma denuncia para analisar </p>
                    ) : (
                        postsDenunciados.map(post => (
                            <div key={post.id} className='adminCard'>
                                <div>
                                    <strong>{post.arroba}</strong>
                                    <p>{post.texto}</p>
                                </div>

                                <div className='acoesDenuncia'>
                                    <button
                                        className='btnSecundario'
                                        onClick={()=> {perdoarDenuncia(post.id);
                                        setPostsDenunciados(postsDenunciados.filter(p => p.id !== post.id));
                                        }}
                                    >   
                                        Ignorar
                                    </button>

                                    <button
                                        className='btnVermelho'
                                        onClick={() => {
                                            deletarPost(post.id);
                                            setPostsDenunciados(postsDenunciados.filter(p => p.id !== post.id));
                                        }}
                                    >
                                        Apagar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
            </div>
        </div>
    )
};

export default Admin;