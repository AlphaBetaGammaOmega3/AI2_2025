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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem("");
    setLoading(true);

    try {
      // Corrija aqui a URL se seu backend usa '/api/login' ou '/api/auth/login'
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setMensagem("Login bem-sucedido!");
      setLoading(false);

      // Aqui você pode redirecionar ou atualizar o estado do app para indicar login feito

    } catch (err) {
      setMensagem(err.response?.data?.message || "Erro ao fazer login.");
      setLoading(false);
    }
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
