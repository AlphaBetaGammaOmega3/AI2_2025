import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const ProdutoEditar = () => {
  const [formData, setFormData] = useState({
    nome: "",
    categorias: [],
    preco: "",
    tamanho: "",
    descricao: "",
  });

  const categoriasDisponiveis = [
    "Homem",
    "Mulher",
    "Calçado",
    "Calças",
    "T-shirts",
    "Casacos",
    "Camisolas",
    "Camisas",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoriaChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({
      ...prev,
      categorias: options,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar dados para o backend aqui
    console.log("Dados salvos:", formData);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-teal-700 text-white py-3 px-4 d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3">
          <Link to="/admin/users" className="btn btn-outline-light">Utilizadores</Link>
          <Link to="/admin/products" className="btn btn-outline-light">Produtos</Link>
          <Link to="/admin/sales" className="btn btn-outline-light">Vendas</Link>
        </div>
        <Link to="/login" className="text-white fs-4">
          <FaSignOutAlt />
        </Link>
      </header>

      <Container className="my-4">
        <h3 className="mb-4">Editar Produto:</h3>

        <div className="p-4" style={{ backgroundColor: "#e9eff1" }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4} className="d-flex justify-content-center align-items-start">
                <Image
                  src="https://placehold.co/200x300?text=2:3"
                  style={{ width: "100%", maxWidth: "200px", aspectRatio: "2 / 3", objectFit: "cover", boxShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}
                  alt="Imagem do Produto"
                />
              </Col>

              <Col md={8}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="nome"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Categoria:</Form.Label>
                    <Form.Select
                      multiple
                      value={formData.categorias}
                      onChange={handleCategoriaChange}
                      style={{ height: "100px" }}
                    >
                      {categoriasDisponiveis.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label>Preço:</Form.Label>
                    <Form.Control
                      type="text"
                      name="preco"
                      value={formData.preco}
                      onChange={handleChange}
                      placeholder="preço"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Tamanho:</Form.Label>
                    <Form.Control
                      type="text"
                      name="tamanho"
                      value={formData.tamanho}
                      onChange={handleChange}
                      placeholder="tamanho"
                    />
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Descrição:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Autosize height based on content lines"
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button type="submit" variant="primary">Salvar</Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>

      <footer style={{ backgroundColor: "#346E7F", height: "30px" }} />
    </>
  );
};

export default ProdutoEditar;
