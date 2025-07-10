import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminVendas = () => {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/vendas");
        setVendas(response.data);
      } catch (err) {
        console.error("Erro ao buscar vendas:", err.message);
      }
    };

    fetchVendas();
  }, []);

  const formatDate = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async (idvenda) => {
    if (window.confirm("Deseja realmente excluir esta venda?")) {
      try {
        await axios.delete(`http://localhost:3000/api/vendas/${idvenda}`);
        setVendas(vendas.filter((v) => v.idvenda !== idvenda));
      } catch (err) {
        console.error("Erro ao excluir venda:", err.message);
      }
    }
  };

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
        <h3>Lista de Vendas:</h3>

        {vendas.map((venda) => (
          <Card className="mb-3" key={venda.idvenda} bg="light" border="secondary">
            <Card.Header>
              <strong>Venda #{venda.idvenda}</strong> — Data: {formatDate(venda.datavenda)}
            </Card.Header>

            {venda.vendas_itens?.map((item, idx) => (
              <Card.Body key={idx} className="d-flex flex-wrap align-items-center justify-content-between">
                <div className="d-flex align-items-center" style={{ gap: "1rem" }}>
                  <img
                    src={item.produto?.imagem || "https://via.placeholder.com/80"}
                    alt="Produto"
                    width="80"
                    height="80"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                  <div>
                    <div><strong>Artigo:</strong> {item.produto?.nome}</div>
                    <div><strong>Descrição:</strong> {item.produto?.descricao}</div>
                  </div>
                </div>

                <div className="text-end">
                  <div><strong>Preço:</strong> €{item.precofinal?.toFixed(2) || "0.00"}</div>
                  <div><strong>Categoria:</strong> {item.produto?.idtipoprod_tiposproduto?.descricao || "N/A"}</div>
                  <div><strong>Tamanho:</strong> {item.produto?.tamanho}</div>
                  <div><strong>Comprador:</strong> {venda.user?.email}</div>
                </div>
              </Card.Body>
            ))}

            <Card.Footer className="text-end">
              <Button variant="secondary" className="me-2">
                Editar
              </Button>
              <Button variant="danger" onClick={() => handleDelete(venda.idvenda)}>
                Remover
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default AdminVendas;
