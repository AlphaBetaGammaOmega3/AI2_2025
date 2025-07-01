import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Páginas de usuário regular
import Homepage from './pages/regularuser/homepage.jsx';
import LoginPage from './pages/regularuser/login.jsx';
import Carrinho from './pages/regularuser/carrinho.jsx';
import CriarConta from './pages/regularuser/criarconta.jsx';

// Páginas de admin
import AdminHomePage from './pages/admin/usersAdmin.jsx';
import ProdutosAdmin from './pages/admin/screenprodutosAdmin.jsx';
import VendasAdmin from './pages/admin/screenvendasAdmin.jsx';
import ProdutoAdmin from './pages/admin/screeneditarprodutoAdmin.jsx';
import AdicionaProduto from './pages/admin/adicionarproduto.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/criarconta" element={<CriarConta />} />

        {/* Rotas Admin */}
        <Route path="/admin/main" element={<AdminHomePage />} />
        <Route path="/admin/produtos" element={<ProdutosAdmin />} />
        <Route path="/admin/vendas" element={<VendasAdmin />} />
        <Route path="/admin/produto" element={<ProdutoAdmin />} />
        <Route path="/admin/adicionar" element={<AdicionaProduto />} />
      </Routes>
    </>
  );
}

export default App;
