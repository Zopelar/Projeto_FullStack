import { useState } from 'react';
import '../styles/Global.css'
import '../styles/Feed.css'

function Feed(){
    const [novoPost, setNovoPost] = useState('');
    
    //posts iniciais 
    const [posts, setPosts] = useState([
        {id: 1, autor: 'Admin', arroba: '@admin', texto: 'Bem-vindo ao nosso novo fórum! Sinta-se em casa para compartilhar suas ideias.', timestamp: '2h', likes: 135, isLiked: false },
        {id: 2, autor: 'João Silva', arroba: '@joaosilva', texto: 'Muito legal esse formato de microblog. Achei a interface super limpa!', timestamp: '4h' , likes: 23231, isLiked: false}
    ]);

    const handlePost = (e) => {

        if(!novoPost.trim()) return;

        const formatoPost = {
            id: crypto.randomUUID(),
            autor: 'Você',
            arroba: '@voce',
            texto: novoPost,
            timestamp: 'Agora',
            likes: 0,
            isLiked: false
        };

        setPosts([formatoPost, ...posts]);

        setNovoPost('');
    }

    const handleLike = (idPost) => {
        const postsAtualizados = posts.map(post => {
            if(post.id === idPost){
                if(!post.isLiked){    
                    return{
                        ...post,
                        isLiked: true,
                        likes: post.likes + 1
                    };
                }
                else{
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
    };
    
    return(
        <div className='containerEspecial'>
            <main className='feedContainer'>
                <div className='cabecalhoFeed'>
                    <h2>Página Inicial</h2>
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
                                <strong> {post.autor} </strong>
                                <span className='arroba'> {post.arroba} </span>
                                <span className='horario'> {post.timestamp} </span>
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