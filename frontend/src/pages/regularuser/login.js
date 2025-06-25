// components/Login.js
import { useState } from "react";
import axios from "axios";

function Login() {
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
      // Redirecionar ou atualizar UI aqui
    } catch (err) {
      setMensagem(err.response?.data?.message || "Erro ao fazer login.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Senha:</label>
          <input type="password" className="form-control"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit">Entrar</button>
      </form>
      {mensagem && <div className="mt-3 alert alert-info">{mensagem}</div>}
    </div>
  );
}

export default Login;
