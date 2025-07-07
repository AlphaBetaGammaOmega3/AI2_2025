import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Auth/Login';
import Register from './views/Auth/CriarConta';
import Home from './views/Cliente/Home';
import Cart from './views/Cliente/Cart';
import CarrinhoPage from './views/Cliente/CarrinhoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/cart' element = {<Cart />} />
        <Route path='/carrinho' element = {<CarrinhoPage />} />
        {/* Podes adicionar outras rotas aqui no futuro */}
      </Routes>
    </Router>
  );
}

export default App;
