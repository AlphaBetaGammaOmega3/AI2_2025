import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Header from "../../components/Header";

const VerProduto = () => {
  const { idproduto } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const iduser = localStorage.getItem("iduser");

  const fetchProduto = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/produtos/${idproduto}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduto(res.data);
    } catch (error) {
      console.error("Erro ao procurar o produto:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduto();
  }, [idproduto]);

  const handleAddToCart = async () => {
    try {
      if (!iduser) return alert("Precisa estar autenticado.");
      await axios.post(
        `http://localhost:3000/api/carrinhos`,
        {
          iduser: parseInt(iduser),
          idprod: produto.idprod,
          quantidade: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Produto adicionado ao carrinho!");
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err.message);
    }
  };

  if (loading) return <Spinner animation="border" />;

  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <>
      <Header />
      <Container className="my-4" style={{ minWidth: "1520px", minHeight: "100vh" }}>
        <div className="d-flex content-left">
          <Card style={{ maxWidth: "600px", width: "100%" }}>
            <Card.Img variant="top" src={produto.imagem || "https://via.placeholder.com/600x400"} />
            <Card.Body>
              <Card.Title>{produto.nome}</Card.Title>
              <Card.Text>
                <strong>Preço:</strong> €{produto.valor} <br />
                <strong>Tamanho:</strong> {produto.tamanho} <br />
                <strong>Categoria:</strong> {produto.idtipoprod_tiposproduto?.descricao}
              </Card.Text>
              <Button variant="success" onClick={handleAddToCart}>
                Adicionar ao Carrinho
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default VerProduto;
