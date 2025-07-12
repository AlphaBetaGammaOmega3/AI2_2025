import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (newPassword !== confirmPassword) {
      setErro('As palavras-passe não coincidem');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/users/reset-password', {
        email,
        newPassword,
      });

      setSucesso(res.data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao redefinir a palavra-passe');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h4 className="mb-4">Redefinir Palavra-passe</h4>

      {erro && <Alert variant="danger">{erro}</Alert>}
      {sucesso && <Alert variant="success">{sucesso}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite o seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nova palavra-passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nova palavra-passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmar nova palavra-passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirme a palavra-passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Redefinir
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;
