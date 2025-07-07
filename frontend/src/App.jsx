import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Auth/Login';
import Register from './views/Auth/CreateAccount';
import Home from './views/Cliente/Home';
import Cart from './views/Cliente/Cart';
import CarrinhoPage from './views/Cliente/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/cart' element = {<Cart />} />
        <Route path='/profile' element = { <Perfil />} />
        {/* Podes adicionar outras rotas aqui no futuro */}
      </Routes>
    </Router>
  );
}

export default App;
