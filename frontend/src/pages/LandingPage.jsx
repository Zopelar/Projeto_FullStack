import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Global.css';
import '../styles/LandingPage.css';

function LandingPage() {
    return(
        <div className='landingContainer'>
            
            <header className='cabecalhoLanding'>
                <div className='logo'>
                    <strong>Whatchu Thinkin?</strong>
                </div>
                <nav className='landingNavbar'>
                    <Link to='/login' className='btnSecundario'>Entrar</Link>
                    <Link to='/cadastro' className='btnPrimario'>Cadastre-se</Link>
                </nav>
            </header>
            
          
           

            <footer className='rodape'>
                <p>© 2026 Watchu Thinkin. Todos os direitos reservados.</p>
            </footer>
        </div>
  );
    
}



export default LandingPage;