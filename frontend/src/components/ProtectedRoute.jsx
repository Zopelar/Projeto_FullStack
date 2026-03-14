import {Navigate} from 'react-router-dom';

function ProtectedRoute({children}){
    const token = localStorage.getItem('meuToken');

    if(!token){
        return <Navigate to='/login' replace/>
        //colocar mensagem de erro aqui
    }

    return children;

}

export default ProtectedRoute;