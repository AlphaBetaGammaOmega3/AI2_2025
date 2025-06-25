import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Páginas de usuário regular
import Homepage from './pages/regularuser/homepage.js';
import LoginPage from './pages/regularuser/login.js';
import Carrinho from './pages/regularuser/carrinho';
import CriarConta from './pages/regularuser/criarconta.js';

// Páginas de admin
import AdminHomePage from './pages/admin/usersAdmin.js';
import ProdutosAdmin from './pages/admin/screenprodutosAdmin.js';
import VendasAdmin from './pages/admin/screenvendasAdmin.js';
import ProdutoAdmin from './pages/admin/screeneditarprodutoAdmin.js';
import AdicionaProduto from './pages/admin/adicionarproduto.js';

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
