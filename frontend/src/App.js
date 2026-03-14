import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//rotas publicas
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import LandingPage from "./pages/LandingPage";
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';

//rotas privadas
import Feed from './pages/Feed';
import Configuracoes from './pages/Configuracoes';
import Admin from './pages/Admin';

//protetor de rota
import ProtectedRoute from './components/ProtectedRoute';





function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        //rotas publicas
        <Route path="/" element = {<LandingPage />}/>
        <Route path="/login" element = {<Login />}/>
        <Route path="/cadastro" element = {<Cadastro />}/>

        //erro 404
        <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '2rem' }}>404 - Página não encontrada</h2>} />
      
        //rotas privadas
        <Route
          path='/feed'
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />

        <Route
          path='/configuracoes'
          element={
            <ProtectedRoute>
              <Configuracoes />
            </ProtectedRoute>
          }
        />

        <Route
          path='/admin'
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
