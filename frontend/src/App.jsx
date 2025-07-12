import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './views/Auth/Login';
import Register from './views/Auth/CreateAccount';
import ResetPassword from './views/Auth/ResetPassword';

import Home from './views/Cliente/Home';
import Cart from './views/Cliente/Cart';
import Perfil from './views/Cliente/Profile';
import MinhasVendas from './views/Cliente/MinhasVendas';
import VerProduto from './views/Cliente/VerProduto';

import AdminDashboard from './views/Admin/HomeAdmin';
import AdminProdutos from './views/Admin/AdminProdutos';
import AdminVerProduto from './views/Admin/AdminVerProduto';
import AdminVendas from './views/Admin/AdminVendas';
import AdminTiposProdutos from './views/Admin/AdminTiposProdutos';
import AdminTiposUsers from './views/Admin/AdminTiposUsers';

function App() {
  return (
    <Router>
      <Routes>
        {/* Cliente */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/artigo/:idproduto" element={<VerProduto />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/minhascompras" element={<MinhasVendas />} />
        <Route path="/profile" element={<Perfil />} />

        {/* Admin */}
        <Route path="/homeAdmin" element={<AdminDashboard />} />
        <Route path="/adminprodutos" element={<AdminProdutos />} />
        <Route path="/adminvendas" element={<AdminVendas />} />
        <Route path="/admintiposprodutos" element={<AdminTiposProdutos />} />
        <Route path="/admin/artigo/:idproduto" element={<AdminVerProduto />} />
        <Route path="/admintiposusers" element={<AdminTiposUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
