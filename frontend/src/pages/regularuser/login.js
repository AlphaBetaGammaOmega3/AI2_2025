// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setMensagem("Login bem-sucedido!");
      navigate("/admin/main"); // Redireciona após login bem-sucedido
    } catch (err) {
      setMensagem(err.response?.data?.message || "Erro ao fazer login.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="login-box">
          <i className="fa fa-user-circle icon-login"></i>
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Senha:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      <div className="links">
        <a href="#">Esqueceu-se da palavra-passe?</a> <br />
        <a href="/criarconta">Não tem conta? Criar conta</a>
      </div>

      {mensagem && <div className="mt-3 alert alert-info">{mensagem}</div>}
    </div>
  );
};

export default LoginPage;
