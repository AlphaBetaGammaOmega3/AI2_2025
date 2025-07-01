import { useState } from 'react';
import axios from 'axios';

const CriarConta = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      setMensagem('Login bem-sucedido!');
      setLoading(false);

      // Aqui podes redirecionar com React Router se quiseres:
      // navigate('/admin/main') por exemplo
    } catch (err) {
      setMensagem(err.response?.data?.message || 'Erro ao fazer login.');
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
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
            disabled={loading}
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {mensagem && (
        <div
          className={`mt-3 alert ${
            mensagem === 'Login bem-sucedido!' ? 'alert-success' : 'alert-danger'
          }`}
          role="alert"
        >
          {mensagem}
        </div>
      )}
    </div>
  );
};

export default CriarConta;
