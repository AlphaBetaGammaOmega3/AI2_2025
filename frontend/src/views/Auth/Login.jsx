import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password
      });

      const { token, user } = response.data;

      // Armazenar token e info do user localmente
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirecionar para home ou dashboard
      navigate('/');

    } catch (err) {
      console.error("Erro no login:", err.response?.data?.message || err.message);
      setErro('Email ou palavra-passe inválidos');
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="bg-teal text-white py-3 px-4">
        <h2>Login</h2>
      </header>

      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="bg-light p-4 rounded shadow-sm text-center" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="mb-4">
            <img
              src="/assets/react.svg"
              alt="User Icon"
              style={{ width: '80px' }}
            />
          </div>

          <form onSubmit={handleLogin}>
            {erro && <div className="alert alert-danger">{erro}</div>}

            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">Palavra-passe</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="palavra-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3 small">
              <a href="#" className="text-decoration-none">Esqueceu-se da palavra-passe?</a>
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>

            <div className="mt-3 small">
              Não tem conta? <Link to="/register">Criar conta</Link>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-teal text-white text-center py-2 mt-5">
        {/* Rodapé opcional */}
      </footer>
    </div>
  );
}

export default Login;
