import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './views/Auth/Login';
import Register from './views/Auth/CreateAccount';
import LoginAdmin from './views/Auth/LoginAdmin';

import Home from './views/Cliente/Home';
import Cart from './views/Cliente/Cart';
import Perfil from './views/Cliente/Profile';

import AdminDashboard from './views/Admin/HomeAdmin';
import AdminProdutos from './views/Admin/AdminProdutos';
import AdminProdutoCriar from './views/Admin/AdminProdutoCriar';
import AdminProdutoEditar from './views/Admin/AdminProdutoEditar';

function App() {
  return (
    <Router>
      <Routes>
        {/* Cliente */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Perfil />} />

        {/* Admin */}
        <Route path="/homeAdmin" element={<AdminDashboard />} />
        <Route path="/adminprodutos" element={<AdminProdutos />} />
        <Route path="/admin/produtos/novo" element={<AdminProdutoCriar />} />
        <Route path="/admin/produtos/editar/:idproduto" element={<AdminProdutoEditar />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
