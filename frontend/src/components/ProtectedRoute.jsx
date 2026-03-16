import {Navigate} from 'react-router-dom';

function ProtectedRoute({children}){
    //obtem o token de sessao do usuario
    const token = localStorage.getItem('meuToken');

    //se o usuario nao tem token o redireciona para a pagina de login
    if(!token){

        return <Navigate to='/login' replace/>
    }

    return children;

}

export default ProtectedRoute;