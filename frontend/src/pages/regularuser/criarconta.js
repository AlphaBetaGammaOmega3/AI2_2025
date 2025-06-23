// src/pages/RegisterPage.jsx
import React from 'react';
import '../../styles/criarconta.css';
import { useNavigate } from 'react-router-dom';

const CriarConta = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    // Aqui podes fazer validação ou integração com a API depois
    navigate('/homepage');
  };

  return (
    <div className="register-page">
      <h2>Criar Conta</h2>
      <div className="register-box">
        <i className="fa fa-user-circle icon-register"></i>
        <input type="email" placeholder="e-mail" />
        <input type="text" placeholder="Nome de utilizador" />
        <input type="password" placeholder="palavra-passe" />
        <a href="#">esqueceu-se da palavra-passe?</a>
        <a href="/login">Já tem conta? Login</a>
        <button onClick={handleRegister}>Criar Conta</button>
      </div>
    </div>
  );
};

export default CriarConta;
