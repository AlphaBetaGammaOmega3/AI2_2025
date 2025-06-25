// src/components/Header.js
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <div className='app'>
      <header className="App-header">
        <div className="header-center">
          <form className='search-form' action="#">
            <input type='text' placeholder='Pesquisar' />
            <button type='submit'><i className='fa fa-search'></i></button>
          </form>
        </div>

        <div className="header-right">
          <i className="fa fa-shopping-cart icon" onClick={() => navigate('/carrinho')} style={{cursor: 'pointer'}}></i>
          <i className="fa fa-user icon"></i>
          <i className="fa fa-sign-out icon" onClick={() => navigate('/')} title="Logout"></i>
        </div>
      </header>
    </div>
  );
}

export default Header;
