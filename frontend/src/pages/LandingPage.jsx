import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Global.css';
import '../styles/LandingPage.css';

function LandingPage() {
    return(
        <div className='containerGlobal'>
                       
            <main className='landingContent'>
                <div className='mainSection'>
                    <h1 >O que você tem pensado ultimamente?</h1>
                
                    <div className="wordSpinner">
                        <div class="loader">
                            <p>Compartilhe</p>
                            <div className="words">
                                <span className="word">opniões</span>
                                <span className="word">músicas</span>
                                <span className="word">pensamentos</span>
                                <span className="word">tudo</span>
                                <span className="word">opniões</span>
                            </div>
                        </div>
                    </div>
                    {/*Talvez os cards rodando*/}
                    <div className='postsContainer'>
                        <div className='postCard'>
                            <div className='postHeader'>
                                <span className='postAuthor'>@dev_honesto</span>
                            </div>
                            <p className='postText'>
                                Tenho programado ouvindo música e isso com certeza aumentou minha produtividade
                            </p>
                            <div className='postFooter'>
                                <p className='postDate'> 13 jan </p>
                                {/* botao de like?*/ }
                            </div>
                        </div>
                    
                        <div className='postCard'>
                            <div className='postHeader'>
                                <span className='postAuthor'>@zopelar</span>
                            </div>
                            <p className='postText'>
                                da pra ver na minha cara que nao aguento mais
                            </p>
                            <div className='postFooter'>
                                <p className='postDate'> 12 jan </p>
                            </div>
                        </div>

                        <div className='postCard'>
                            <div className='postHeader'>
                                <span className='postAuthor'>@um_aleatorio_confiante</span>
                            </div>
                            <p className='postText'>
                                um dia eu vou ser presidente do Brasil
                            </p>
                            <div className='postFooter'>
                                <p className='postDate'> 12 jan </p>
                            </div>
                            
                        </div>
                    </div>

                    <div className='caixaForm'>
                        <div className='conviteCadastro'>
                            <h2 className='landingTitle'>Gostou da ideia?</h2>
                            <Link to='/cadastro' className='btnPrimario'>Cadastre-se Agora!</Link>
                        </div>
                    </div>
                </div>
            </main>
           

            <footer className='rodape'>
                <p>© 2026 Watchu Thinkin. Todos os direitos reservados.</p>
            </footer>
        </div>
  );
    
}



export default LandingPage;