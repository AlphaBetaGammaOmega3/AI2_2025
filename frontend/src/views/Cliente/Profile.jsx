import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button, Form } from "react-bootstrap";
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
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
        setFormData({
          nome: response.data.nome || "",
          email: response.data.email || "",
          morada: response.data.morada || "",
          password: "", // só para trocar senha se quiser
        });
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:3000/api/users/${userData.iduser}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUserData(response.data);
      setEditing(false);

      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!userData) return null;

  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <h3 className="text-center mb-4" style={{ color: "#316976", fontWeight: "700" }}>
        Perfil
      </h3>
      <Container className="d-flex justify-content-center">
        <Card
          className="shadow-sm"
          style={{
            width: "90%",
            maxWidth: "600px",
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 8px 24px rgba(49, 105, 118, 0.12), 0 3px 6px rgba(49, 105, 118, 0.08)",
          }}
        >
          <Row>
            <Col>
              {editing ? (
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: "600", color: "#316976" }}>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Digite seu nome"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: "600", color: "#316976" }}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Digite seu email"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: "600", color: "#316976" }}>Morada</Form.Label>
                    <Form.Control
                      type="text"
                      name="morada"
                      value={formData.morada}
                      onChange={handleChange}
                      placeholder="Digite sua morada"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: "600", color: "#316976" }}>
                      Nova senha (opcional)
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Deixe em branco se não quiser mudar"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                  <div className="d-flex gap-2">
                    <Button variant="success" onClick={handleSave} className="flex-grow-1">
                      Guardar
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => setEditing(false)}
                      className="flex-grow-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <p style={{ fontSize: "1.2rem" }}>
                    <strong>Nome:</strong>
                    <br /> {userData.nome}
                  </p>
                  <p style={{ fontSize: "1.2rem" }}>
                    <strong>E-mail:</strong>
                    <br /> {userData.email}
                  </p>
                  <p style={{ fontSize: "1.2rem" }}>
                    <strong>Morada:</strong>
                    <br /> {userData.morada}
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setEditing(true)}
                    style={{ marginTop: "20px", fontWeight: "600", borderRadius: "10px" }}
                  >
                    Editar Perfil
                  </Button>
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
