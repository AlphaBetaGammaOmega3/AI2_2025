import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/Header"; // atualiza o caminho se necessário

const produtos = [
  {
    id: 1,
    titulo: "Título do Artigo",
    descricao: "Descricao Descricao Descricao Descricao Descricao",
    imagem: "https://placehold.co/300x200?text=Imagem+Produto",
    tags: ["Homem", "T-shirts", "M"],
  },
  {
    id: 2,
    titulo: "Outro Produto",
    descricao: "Descricao Descricao Descricao Descricao Descricao",
    imagem: "https://placehold.co/300x200?text=Imagem+Produto",
    tags: ["Mulher", "Camisas", "S"],
  }
];

const Home = () => {
  return (
    <>
      <Header />
      <Container style={{ minWidth: "1520px", minHeight: "100vh" }} className="mt-5">
        <h3>Lista de produtos</h3>
        <div className="d-flex  gap-4 py-3">
          {produtos.map((produto) => (
            <Card style={{ minWidth: "300px" }} key={produto.id}>
              <Card.Img variant="top" src={produto.imagem} />
              <Card.Body>
                <Card.Title>{produto.titulo}</Card.Title>
                <Card.Text>{produto.descricao}</Card.Text>
                <Button variant="info" as={Link} to={`/artigo/${produto.id}`}>
                  Ver Artigo
                </Button>
              </Card.Body>
              <Card.Footer >
                <small>{produto.tags.join(" / ")}</small>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </Container>
      <div
        className="mt-5"
        style={{ height: "30px", backgroundColor: "#326d7c" }}
      />
    </>
  );
};

export default Home;
