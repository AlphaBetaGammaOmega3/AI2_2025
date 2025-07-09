import React from "react";
import { Button, Form, Row, Col, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const ProdutoEditar = () => {
  return (
    <div style={{minHeight: "100vh", backgroundColor:"#f0f4f5", minWidth:"1530px"}}>
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center p-3"
        style={{ backgroundColor: "#326d7c", color: "white" }}
      >
        <div className="d-flex gap-3">
          <Button variant="outline-light">Utilizadores</Button>
          <Button variant="outline-light">Produtos</Button>
          <Button variant="outline-light">Vendas</Button>
        </div>
        <FaSignOutAlt size={24} />
      </div>

      {/* Conteúdo principal */}
      <Container className="my-4">
        <h3 className="mb-4">Editar Produto:</h3>

        <div className="p-4" style={{ backgroundColor: "#edf0f1", borderRadius: "8px" }}>
          <Row>
            {/* Imagem */}
            <Col md={4} className="d-flex align-items-center justify-content-center mb-3 mb-md-0">
              <div style={{ width: "100%", maxWidth: "250px" }}>
                <Image
                  src="https://placehold.co/300x450?text=2:3"
                  alt="Imagem do produto"
                  fluid
                  rounded
                />
              </div>
            </Col>

            {/* Formulário */}
            <Col md={8}>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Nome:</Form.Label>
                      <Form.Control type="text" placeholder="nome" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Categoria:</Form.Label>
                      <Form.Control type="text" placeholder="categoria" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Preço:</Form.Label>
                      <Form.Control type="text" placeholder="preço" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Tamanho:</Form.Label>
                      <Form.Control type="text" placeholder="tamanho" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Descrição:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Autosize height based on content lines"
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="custom-blue" style={{ backgroundColor: "#346E7F", border: "none" }}>
                    Salvar
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Footer */}
      <footer style={{marginTop:"600px", backgroundColor: "#346E7F", height: "30px" }} />
    </div>
  );
};

export default ProdutoEditar;
