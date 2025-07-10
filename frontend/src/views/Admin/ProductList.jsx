import React from "react";
import { Button, Dropdown, Form, Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaPlus } from "react-icons/fa";

const produtosFake = [
  {
    id: 1,
    titulo: "Titulo do Artigo",
    descricao: "Descricao Descricao Descricao Descricao Descricao Descricao",
    categoria: "T-shirt",
    preco: "19.99€",
    tamanho: "M",
    imagem: "https://placehold.co/200x300?text=2:3",
    tags: ["Hoodie", "Verão", "Promoção"]
  },
  {
    id: 2,
    titulo: "Outro Produto",
    descricao: "Descrição curta e direta.",
    categoria: "Casaco",
    preco: "39.99€",
    tamanho: "L",
    imagem: "https://placehold.co/200x300?text=2:3",
    tags: ["Inverno", "Quente"]
  },
  // Adiciona mais objetos conforme necessário
];

const ProdutoAdmin = () => {
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

      {/* Conteúdo principal */}
      <Container className="my-4">
        <h3 className="mb-3">Lista de produtos:</h3>

        {/* Barra de pesquisa e filtros */}
        <Row className="align-items-center mb-4">
          <Col md={5}>
            <Form.Control type="text" placeholder="Pesquisar" />
          </Col>
          <Col md="auto">
            <Dropdown>
              <Dropdown.Toggle variant="custom" style={{ backgroundColor: "#346E7F", border: "none" }}>
                Filtros
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Ordenar por número de vendas</Dropdown.Item>
                <Dropdown.Item>Ordenar por ordem alfabética</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md="auto">
            <Button variant="secondary">
              Adicionar Produto <FaPlus />
            </Button>
          </Col>
        </Row>

        {/* Slide horizontal de produtos */}
        <div className="d-flex overflow-auto gap-4 pb-3">
          {produtosFake.map((produto) => (
            <Card key={produto.id} style={{ minWidth: "300px", backgroundColor: "#B5C9CC" }} className="shadow-sm">
              <div className="d-flex">
                <Image src={produto.imagem} alt={produto.titulo} style={{ width: "140px", height: "210px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{produto.titulo}</Card.Title>
                  <Card.Text style={{ fontSize: "0.9rem" }}>{produto.descricao}</Card.Text>
                  <Button variant="info" size="sm" className="mb-2">Ver Artigo</Button>
                  <Card.Text className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {produto.categoria} / {produto.preco} / {produto.tamanho}
                  </Card.Text>

                  {/* Tags */}
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {produto.tags.map((tag, i) => (
                      <span key={i} className="badge bg-secondary">{tag}</span>
                    ))}
                  </div>

                  {/* Botões de ação */}
                  <div className="d-flex justify-content-between">
                    <Button variant="danger" size="sm">Remover</Button>
                    <Button variant="primary" size="sm">Editar</Button>
                  </div>
                </Card.Body>
              </div>
            </Card>
          ))}
        </div>
      </Container>

      {/* Footer */}
      <footer style={{ backgroundColor: "#346E7F", height: "30px" }} />
    </>
  );
};

export default ProdutoAdmin;
