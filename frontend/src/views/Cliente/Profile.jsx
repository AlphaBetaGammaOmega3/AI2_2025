import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button, Form } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!user || !token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/users/${user.iduser}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData(response.data);
        setFormData({
          nome: response.data.nome,
          email: response.data.email,
          morada: response.data.morada,
          password: "", // Só se ele quiser trocar a senha
        });
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `http://localhost:3000/api/users/${userData.iduser}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUserData(response.data);
      setEditing(false);

      // Atualiza localStorage com dados atualizados
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!userData) return null;

  return (
    <Container fluid className="bg-light min-vh-100">
      <h3 className="py-4 px-4">Perfil</h3>
      <Container className="d-flex justify-content-center">
        <Card className="p-4 rounded shadow" style={{ width: "80%", backgroundColor: "#ddd", borderRadius: "25px" }}>
          <Row className="align-items-center">
            <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
              <FaUserCircle size={150} color="#316976" />
            </Col>
            <Col xs={12} md={8}>
              {editing ? (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Morada</Form.Label>
                    <Form.Control
                      type="text"
                      name="morada"
                      value={formData.morada}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nova senha (opcional)</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Deixe em branco se não quiser mudar"
                    />
                  </Form.Group>
                  <Button variant="success" onClick={handleSave} className="me-2">Guardar</Button>
                  <Button variant="secondary" onClick={() => setEditing(false)}>Cancelar</Button>
                </Form>
              ) : (
                <>
                  <p><strong>Nome:</strong><br /> {userData.nome}</p>
                  <p><strong>E-mail:</strong><br /> {userData.email}</p>
                  <p><strong>Morada:</strong><br /> {userData.morada}</p>
                  <p><strong>Tipo de Utilizador:</strong><br /> {userData.tipouser?.descricao}</p>
                  <Button variant="primary" onClick={() => setEditing(true)}>Editar Perfil</Button>
                </>
              )}
            </Col>
          </Row>
        </Card>
      </Container>
    </Container>
  );
};

export default Perfil;
