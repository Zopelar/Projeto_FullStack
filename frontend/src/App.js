import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element = {<Login />}/>
        <Route path="/cadastro" element = {<Cadastro />}/>

        /* erro 404 de pagina não encontrada */
        <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '2rem' }}>404 - Página não encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
