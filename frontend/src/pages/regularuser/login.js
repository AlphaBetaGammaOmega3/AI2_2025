// src/pages/LoginPage.jsx
import React from 'react';
import '../../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/homepage");
  }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-box">
        <i className="fa fa-user-circle icon-login"></i>
        <input type="email" placeholder="e-mail" />
        <input type="password" placeholder="palavra-passe" />
        <a href="#">esqueceu-se da palavra-passe?</a>
        <a href="/criarconta">Não tem conta? Criar conta</a>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
