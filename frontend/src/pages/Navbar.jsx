import {Link, useNavigate} from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {

    const token = localStorage.getItem('meuToken');

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('meuToken');
        localStorage.removeItem('usuarioLogado')
        navigate('/login');
    };

    if(!token){
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
                   <Link to='/feed' style={{ color: '#fff', textDecoration: 'none' }}>Feed</Link>
                    <Link to='/configuracoes' style={{ color: '#fff', textDecoration: 'none' }}>Configurações</Link>
                    <button onClick={handleLogout} className='btnSecundario' style={{ padding: '0.4rem 1rem' }}>Sair</button>
                </nav>
            </header>
        );
    }
    
}

export default Navbar;