import { useState, useEffect } from 'react';
import '../styles/Global.css'
import '../styles/Feed.css'
import Alert from '../components/Alert'

function Feed(){
    const [novoPost, setNovoPost] = useState('');
    const [posts, setPosts] = useState([]);

    const [toastMsg,setToastMsg] = useState('');

    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    const user =  JSON.parse(usuarioSalvo);
    const meuArroba = `@${user.arroba.toLowerCase().replace(/\s+/g, '')}`;

    useEffect(() =>{
        fetch('http://localhost:5000/posts')
        .then(resposta => resposta.json())
        .then(dadosBanco => {
            const postsFormatados = dadosBanco.map(post => ({
                ...post,
                isLiked: false
            }));
            setPosts(postsFormatados)
        })
    },[])

    const handlePost = async (e) => {
        e.preventDefault();

        if(!novoPost.trim()) return;

        const arrobaUser = `@${user.arroba.toLowerCase().replace(/\s+/g, '')}`;

        const data = new Date();
        const dataFormatada = `${data.toLocaleDateString('pt-BR')} às ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

        const formatoPost = {
            id: crypto.randomUUID(),
            arroba: arrobaUser,
            texto: novoPost,
            timestamp: dataFormatada,
        };
        
        try{
            const resposta = await fetch('http://localhost:5000/posts',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formatoPost)
            });

            if(resposta.ok){
                setPosts([{...formatoPost, likes: 0, isLiked: false}, ...posts]);
                setNovoPost('');
            } 
        }
            catch(erro){
                console.error("erro de conexao do servidor: ", erro);
            }

        
    }

    const handleLike = async (idPost) => {

        let acaoDesejada;

        const postsAtualizados = posts.map(post => {
            if(post.id === idPost){
                if(!post.isLiked){    
                    acaoDesejada = 'like';
                    return{
                        ...post,
                        isLiked: true,
                        likes: post.likes + 1
                    };
                }
                else{
                    acaoDesejada = 'unlike';
                    return{
                        ...post,
                        isLiked: false,
                        likes: post.likes - 1 
                    }
                }
            }
            return post;
        }); 
        setPosts(postsAtualizados);

        try{
            await fetch(`http://localhost:5000/posts/${idPost}/like`,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ acao: acaoDesejada })
            })
        }
        catch(erro){
            setToastMsg('Erro interno ao salvar like');
        }
    };

    const deletarPost = async (id) =>{
        const confirmar = window.confirm("Tem certeza que deseja deletar o seu post?");
        if(!confirmar) return;

        try{
            const resposta = await fetch(`http://localhost:5000/posts/${id}`, {method: 'DELETE'});
            if(resposta.ok){
                setPosts(posts.filter(post => post.id !==id));
            }
        }
        catch(erro){
            setToastMsg('erro interno ao apagar seu post');
        }
    }

    const denunciarPost = async (id)=>{
        const confirmar = window.confirm('Tem certeza que deseja denunciar este post?');
        if(!confirmar) return;

        try{
            const resposta = await fetch(`http://localhost:5000/posts/${id}/denunciar`, {method: 'PUT'});
            if(resposta.ok){
                setToastMsg('Post Denunciado! Os moderadores vão analisar o post')
            }
        }catch(erro){
            setToastMsg('erro interno ao denunciar post');
        }
    }
    
    return(
        <div className='containerGlobal'>
            <Alert mensagem ={toastMsg} onClose={()=> setToastMsg('')}/>
            <main className='feedContainer'>
                <div className='cabecalhoFeed'>
                    <h2>Feed</h2>
                </div>

                <form className='caixaCriarPost' onSubmit={handlePost}>
                    <div className='textArea'>
                       
                        <textarea
                            placeholder='O que você esta pensando?'
                            value={novoPost}
                            onChange={(e) => setNovoPost(e.target.value)}
                            maxLength='280'
                        />
                    </div>

                    <div className='postArea'>
                        <button
                            type='submit'
                            className='btnPrimario'
                            disabled={novoPost.length === 0}
                        >
                            Postar
                        </button>
                    </div>
                </form>

                <div className='feed'>

                    {posts.map(post => (
                        <article key={post.id} className='postCard'>
                            
                            <div className='conteudoPost'>
                                <div className='infoAutor'>
                                <div>
                                    <span className='arroba'> {post.arroba} </span>
                                    <span className='horario'> {post.timestamp} </span>
                                </div>

                                
                                    {post.arroba === meuArroba ? (
                                        <button onClick={() => deletarPost(post.id)} className='btnVermelho'>
                                            Apagar
                                        </button>
                                    ) : (
                                        <button onClick={() => denunciarPost(post.id)} className='btnVermelho' >
                                            Denunciar
                                        </button>
                                    )}
                                </div>
                                
                                <p className='textoPost'> {post.texto} </p>
                                
                                <div className='interacoes'>
                                    <button className={`btn ${post.isLiked ? 'liked' : ''}`} onClick={() => handleLike(post.id)}>
                                    <svg
                                        className="icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20.503"
                                        height="20.625"
                                        viewBox="0 0 17.503 15.625"
                                    >
                                        <path
                                        id="Fill"
                                        d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z"
                                        transform="translate(0 0)"
                                        ></path>
                                    </svg>
                                    </button>

                                    <span className='contadorLikes'>
                                        {post.likes > 0 ? post.likes: ''}
                                    </span>

                                </div>
                            </div>
                        </article>
                    ))}
                </div>

            </main>
        </div>
    );    
}

export default Feed;