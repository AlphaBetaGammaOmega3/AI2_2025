import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

const Home = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/produtos");
        setProdutos(response.data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err.message);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h3>Lista de produtos</h3>
        <div className="d-flex flex-wrap gap-4 py-3">
          {produtos.map((produto) => (
            <Card style={{ minWidth: "300px" }} key={produto.idproduto}>
              <Card.Img variant="top" src={produto.imagem} />
              <Card.Body>
                <Card.Title>{produto.nome}</Card.Title>
                <Card.Text>
                  {produto.valor ? `Preço: €${produto.valor}` : ""}
                  <br />
                  Tamanho: {produto.tamanho}
                </Card.Text>
                <Button
                  variant="info"
                  as={Link}
                  to={`/artigo/${produto.idproduto}`}
                >
                  Ver Artigo
                </Button>
              </Card.Body>
              <Card.Footer>
                <small>
                  Tipo: {produto.idtipoprod_tiposproduto?.descricao || "N/A"}
                </small>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
