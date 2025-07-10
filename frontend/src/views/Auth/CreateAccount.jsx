import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [morada, setMorada] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/users', {
        nome,
        email,
        password,
        morada,
        idtipouser: 2, // 2 = cliente
      });

      // Conta criada com sucesso
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErro(err.response.data.error);
      } else {
        setErro('Erro ao criar conta');
      }
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f5", minWidth:"1530px"}}>
      <header className="bg-teal text-black py-3 px-4">
        <h2>Criar Conta</h2>
      </header>

      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="bg-light p-4 rounded shadow-sm text-center" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="mb-4">
            <img src="/assets/react.svg" alt="User Icon" style={{ width: '80px' }} />
          </div>

          {erro && <div className="alert alert-danger">{erro}</div>}

          <form onSubmit={handleRegister}>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="username" className="form-label">Nome de utilizador</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Nome de utilizador"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="morada" className="form-label">Morada</label>
              <input
                type="text"
                className="form-control"
                id="morada"
                placeholder="Morada"
                value={morada}
                onChange={(e) => setMorada(e.target.value)}
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
                required
              />
            </div>

            <div className="mb-3 small text-start">
              <a href="#" className="text-decoration-none">Esqueceu-se da palavra-passe?</a>
            </div>

            <button type="submit" className="btn btn-primary w-100">Criar Conta</button>

            <div className="mt-3 small">
              Já tem conta? <a href="/login" className="text-decoration-none">Login</a>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-teal text-white text-center py-2 mt-5"></footer>
    </div>
  );
}

export default Register;
