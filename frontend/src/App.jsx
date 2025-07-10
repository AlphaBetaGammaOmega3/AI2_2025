import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Auth/Login';
import Register from './views/Auth/CreateAccount';
import Home from './views/Cliente/Home';
import Cart from './views/Cliente/Cart';
import Perfil from './views/Cliente/Profile';
import AdminDashboard from './views/Admin/HomeAdmin';
import ProdutoEditar from './views/Admin/EditProuct';
import AdminProdutos from './views/Admin/AdminProdutos';
import AdminVendas from './views/Admin/AdminVendas';
import AdminProdutoCriar from './views/Admin/AdminProdutoCriar';
import AdminProdutoEditar from './views/Admin/AdminProdutoEditar';
import ProdutoEditar from './views/Admin/EditProduct';
import ProdutoAdmin from './views/Admin/ProductList';
import VendasAdmin from './views/Admin/soldProducts';
import LoginAdmin from './views/Auth/LoginAdmin';
import ProdutoAdd from './views/Admin/AddProduct';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Perfil />} />
        <Route path='/homeAdmin' element = { <AdminDashboard />} />
        <Route path='/adminprodutos' element={<AdminProdutos />} />
        <Route path='/admin/produtos/novo' element={<AdminProdutoCriar />} />
        <Route path='/admin/produtos/editar/:idproduto' element={<AdminProdutoEditar />} />
        <Route path='/editProduct' element = { <ProdutoEditar />} />
        <Route path='/adminvendas' element={<AdminVendas />} />
        {/* Podes adicionar outras rotas aqui no futuro */}

        <Route path='/homeAdmin' element={<AdminDashboard />} />
        <Route path='/editProduct' element={<ProdutoEditar />} />
        <Route path='/homeAdmin' element = { <AdminDashboard />} />
        <Route path='/editProduct' element = { <ProdutoEditar />} />
        <Route path='/listProducts' element = { <ProdutoAdmin /> } />
        <Route path='/soldProducts' element = { <VendasAdmin /> } />
        <Route path='/loginAdmin' element = { <LoginAdmin /> } />
        <Route path="/AddProduct" element = {<ProdutoAdd /> } />
      </Routes>
    </Router>
  );
}

export default App;
