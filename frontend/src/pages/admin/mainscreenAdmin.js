// src/pages/admin/AdminHomePage.jsx
import React from 'react';
import '../../styles/mainscreenAdmin.css';
import { useNavigate } from 'react-router-dom';

const AdminHomePage = () => {
    const navigate = useNavigate();
  return (
    <div className="admin-container">
      <nav className="admin-navbar">
        <button>Utilizadores</button>
        <button onClick={() => navigate('/admin/produtos')}>Produtos</button>
        <button onClick={() => navigate('/admin/vendas')}>Vendas</button>
        <i onClick={() => navigate('/')} className="fa fa-sign-out icon"></i>
      </nav>

      <div className="admin-content">
        <div className="user-list">
          <h2>Lista de utilizadores:</h2>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="user-item">
              <i className="fa fa-user-circle"></i>
              <div>
                <p>Nome do utilizador</p>
                <p>e-mailexemplo@.com</p>
              </div>
              <button className="edit">Editar</button>
              <button className="remove">Remover</button>
            </div>
          ))}
        </div>

        <div className="user-detail">
          <div className="user-detail-header">
            <i className="fa fa-user-circle"></i>
          </div>
          <div className="user-detail-body">
            <p><strong>Nome:</strong> Marco Reinas</p>
            <p><strong>E-mail:</strong> emailexemplo@.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
