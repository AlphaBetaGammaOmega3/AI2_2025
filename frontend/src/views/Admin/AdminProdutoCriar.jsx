import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProdutoCriar = () => {
  const [form, setForm] = useState({
    nome: "",
    imagem: "",
    valor: "",
    stock: "",
    tamanho: "",
    idtipoprod: ""
  });
  const [tipos, setTipos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/tiposprodutos")
      .then(res => setTipos(res.data))
      .catch(err => console.error("Erro ao buscar tipos:", err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/produtos", form);
      navigate("/adminprodutos");
    } catch (err) {
      console.error("Erro ao criar produto:", err.message);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Criar Novo Produto</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control name="nome" value={form.nome} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagem (URL)</Form.Label>
              <Form.Control name="imagem" value={form.imagem} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Valor (€)</Form.Label>
              <Form.Control type="number" name="valor" value={form.valor} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estoque</Form.Label>
              <Form.Control type="number" name="stock" value={form.stock} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tamanho</Form.Label>
              <Form.Control name="tamanho" value={form.tamanho} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de Produto</Form.Label>
              <Form.Select name="idtipoprod" value={form.idtipoprod} onChange={handleChange} required>
                <option value="">Selecione...</option>
                {tipos.map(t => (
                  <option key={t.idtipoprod} value={t.idtipoprod}>{t.descricao}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="success">Criar</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AdminProdutoCriar;
