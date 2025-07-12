import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import AdminNavBar from "../../components/AdminNavBar ";

const AdminVerProduto = () => {
  const { idproduto } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/produtos/${idproduto}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduto(res.data);
      } catch (error) {
        console.error("Erro ao carregar o produto:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduto();
  }, [idproduto]);

  if (loading) return <Spinner animation="border" />;

  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f5", minWidth: "1530px" }}>
      <AdminNavBar />
      <Container className="mt-4">
        <Card style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Card.Img variant="top" src={produto.imagem || "https://via.placeholder.com/600x400"} />
          <Card.Body>
            <Card.Title>{produto.nome}</Card.Title>
            <Card.Text>
              <strong>Preço:</strong> €{produto.valor} <br />
              <strong>Tamanho:</strong> {produto.tamanho} <br />
              <strong>Estoque:</strong> {produto.stock} unidades <br />
              <strong>Categoria:</strong> {produto.idtipoprod_tiposproduto?.descricao}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminVerProduto;
