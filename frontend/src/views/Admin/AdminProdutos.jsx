import React, { useEffect, useState } from "react";
import {
  Container, Card, Button, Form, Row, Col, InputGroup
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/produtos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProdutos(response.data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err.message);
      }
    };

    fetchProdutos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja remover este produto?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/produtos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProdutos(produtos.filter((p) => p.idproduto !== id));
      } catch (err) {
        console.error("Erro ao remover produto:", err.message);
      }
    }
  };

  const filteredProdutos = produtos.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Navegação no topo */}
      <div
        className="d-flex justify-content-between align-items-center p-3"
        style={{ backgroundColor: "#326d7c", color: "white" }}
      >
        <div className="d-flex gap-3">
          <Link to="/homeAdmin" className="btn btn-outline-light">Utilizadores</Link>
          <Link to="/adminprodutos" className="btn btn-outline-light">Produtos</Link>
          <Link to="/adminvendas" className="btn btn-outline-light">Vendas</Link>
        </div>
      </div>

      <Container className="mt-4">
        <h3>Lista de produtos:</h3>

        <Row className="mb-3">
          <Col md={4}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Pesquisar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-secondary">🔍</Button>
            </InputGroup>
          </Col>
          <Col md="auto">
            <Button variant="secondary">Filtros ⌄</Button>
          </Col>
          <Col md="auto">
            <Button variant="outline-primary" as={Link} to="/admin/produtos/novo">
              Adicionar Produto ➕
            </Button>
          </Col>
        </Row>

        <div className="d-flex flex-wrap gap-4 py-3">
          {filteredProdutos.map((produto) => (
            <Card style={{ width: "18rem" }} key={produto.idproduto}>
              <Card.Img
                variant="top"
                src={produto.imagem || "https://via.placeholder.com/300x200?text=2:3"}
                alt="Imagem do Produto"
              />
              <Card.Body>
                <Card.Title>{produto.nome}</Card.Title>
                <Card.Text>
                  {produto.descricao?.slice(0, 100)}...
                  <br />
                  <strong>€{produto.valor}</strong> | Tamanho: {produto.tamanho}
                  <br />
                  <span className="text-success">
                    Estoque: {produto.stock ?? 0} unidade
                    {produto.stock === 1 ? "" : "s"}
                  </span>
                </Card.Text>

                <Button
                  variant="info"
                  as={Link}
                  to={`/artigo/${produto.idproduto}`}
                  className="mb-2"
                  block="true"
                >
                  Ver Artigo
                </Button>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(produto.idproduto)}
                  >
                    Remover
                  </Button>
                  <Button
                    variant="secondary"
                    as={Link}
                    to={`/admin/produtos/editar/${produto.idproduto}`}
                  >
                    Editar
                  </Button>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted">
                {produto.idtipoprod_tiposproduto?.descricao || "Sem categoria"}
              </Card.Footer>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default AdminProdutos;
