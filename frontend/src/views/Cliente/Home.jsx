import React, { useEffect, useState } from "react";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const iduser = localStorage.getItem("iduser");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProdutos();
    fetchTipos();
  }, []);

  // Buscar lista de produtos
  const fetchProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/produtos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remover caminhos da imagem para ficar só o nome do ficheiro
      const produtosLimpos = res.data.map(p => ({
        ...p,
        imagem: p.imagem ? p.imagem.split(/(\\|\/)/).pop() : null
      }));
      setProdutos(produtosLimpos);
    } catch (error) {
      console.error("Erro ao procurar produtos:", error.message);
    }
  };

  // Buscar tipos de produtos
  const fetchTipos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tiposprodutos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTipos(res.data);
    } catch (err) {
      console.error("Erro ao procurar tipos:", err.message);
    }
  };

  const handleAddToCart = async (produtoId) => {
    if (!iduser) {
      alert("Precisa estar autenticado para adicionar ao carrinho.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/api/carrinhos`,
        {
          iduser: parseInt(iduser),
          idprod: produtoId,
          quantidade: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Produto adicionado ao carrinho!");
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err.response?.data || err.message);
      alert("Erro ao adicionar ao carrinho.");
    }
  };

  const produtosFiltrados = tipoSelecionado
    ? produtos.filter((p) => p.idtipoprod === parseInt(tipoSelecionado))
    : produtos;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f5", minWidth: "1530px" }}>
      <Header />
      <Container style={{ minWidth: "1520px", minHeight: "100vh" }} className="mt-5">
        <Row className="mb-3 align-items-center">
          <Col md={4}>
            <h3>Lista de produtos</h3>
          </Col>
          <Col md={4}>
            <Form.Select
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              {tipos.map((tipo, index) => (
                <option key={tipo.idtipoprod || index} value={tipo.idtipoprod}>
                  {tipo.descricao}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <div className="d-flex flex-wrap gap-4 py-3">
          {produtosFiltrados.map((produto) => (
            <Card style={{ minWidth: "300px" }} key={produto.idprod}>
              <Card.Img
                variant="top"
                src={produto.imagem ? `http://localhost:3000/uploads/${produto.imagem}` : "https://via.placeholder.com/600x400"}
                alt={produto.nome}
              />
              <Card.Body>
                <Card.Title>{produto.nome}</Card.Title>
                <Card.Text>
                  {produto.valor ? `Preço: €${produto.valor}` : ""}
                  <br />
                  Tamanho: {produto.tamanho}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="info" as={Link} to={`/artigo/${produto.idprod}`}>
                    Ver Artigo
                  </Button>
                  <Button variant="success" onClick={() => handleAddToCart(produto.idprod)}>
                    Adicionar
                  </Button>
                </div>
              </Card.Body>
              <Card.Footer>
                <small>{produto.idtipoprod_tiposproduto?.descricao || ""}</small>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </Container>
      <div className="mt-5" style={{ height: "30px", backgroundColor: "#326d7c" }} />
    </div>
  );
};

export default Home;
