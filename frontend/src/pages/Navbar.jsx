import React, { useDebugValue } from "react";
import {Link, useLocation} from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    const location = useLocation();

    const rotasPublicas = ['/', '/login', '/cadastro'];
    const isRotaPublica = rotasPublicas.includes(location.pathname);

    if(isRotaPublica){
        return(
            <header className="publicHeader">
                <div className="logoNav">
                    <Link to='/'>
                    <strong>Whatchu Thinkin?</strong>
                    </Link>
                </div>

                <nav className="publicNavbar">
                    <Link to='/login' className='btnSecundario'>Entrar</Link>
                    <Link to='/cadastro' className='btnPrimario'>Cadastre-se</Link>
                </nav>
            </header>
        );
    }
    else{
        return(
            <header className="publicHeader">
                <div className="logoNav">
                    <Link to='/'>
                    <strong>Whatchu Thinkin?</strong>
                    </Link>
                </div>

                <nav className="publicNavbar">
                   <Link to='/home' style={{ color: '#fff', textDecoration: 'none' }}>Início</Link>
                    <Link to='/perfil' style={{ color: '#fff', textDecoration: 'none' }}>Perfil</Link>
                    <button className='btnSecundario' style={{ padding: '0.4rem 1rem' }}>Sair</button>
                </nav>
            </header>
        );
    }
    
}

export default Navbar;