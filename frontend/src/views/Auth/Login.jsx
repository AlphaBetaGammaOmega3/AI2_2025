import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="bg-teal text-white py-3 px-4">
        <h2>Login</h2>
      </header>

      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="bg-light p-4 rounded shadow-sm text-center" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="mb-4">
            <img
              src="/assets/react.svg" // Substitui por outro ícone/avatar se quiseres
              alt="User Icon"
              style={{ width: '80px' }}
            />
          </div>

          <form>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input type="email" className="form-control" id="email" placeholder="e-mail" />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">Palavra-passe</label>
              <input type="password" className="form-control" id="password" placeholder="palavra-passe" />
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
