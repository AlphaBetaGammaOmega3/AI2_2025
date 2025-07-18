import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import axios from "axios";
import AdminNavBar from "../../components/AdminNavBar ";

const AdminVendas = () => {
  const [vendas, setVendas] = useState([]);
  const baseURL = "http://localhost:3000/uploads/";

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/vendas", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Limpar caminho da imagem em cada item
        const vendasLimpas = response.data.map((venda) => ({
          ...venda,
          vendas_itens: venda.vendas_itens.map((item) => ({
            ...item,
            imagemprod: item.imagemprod
              ? baseURL + item.imagemprod.split(/(\\|\/)/).pop()
              : null,
          })),
        }));

        setVendas(vendasLimpas);
      } catch (err) {
        console.error("Erro ao procurar vendas:", err.message);
      }
    };

    fetchVendas();
  }, []);

  const formatDateOnly = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDelete = async (idvenda) => {
    if (window.confirm("Deseja realmente excluir esta venda?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/vendas/${idvenda}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVendas(vendas.filter((v) => v.idvenda !== idvenda));
      } catch (err) {
        console.error("Erro ao excluir venda:", err.message);
      }
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f5", minWidth: "1530px" }}>
      <AdminNavBar />
      <Container className="mt-4">
        <h3>Lista de Vendas:</h3>

        {vendas.length === 0 && <p>Sem vendas registradas.</p>}

        {vendas.map((venda) => (
          <Card className="mb-4 shadow-sm" style={{ maxWidth: "500px" }} key={venda.idvenda} bg="light" border="secondary">
            <Card.Header>
              <strong>Venda #{venda.idvenda}</strong> — Data: {formatDateOnly(venda.datacompra)}
            </Card.Header>

            {venda.vendas_itens.map((item, idx) => (
              <Card.Body key={idx} className="d-flex flex-wrap align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.imagemprod || "https://via.placeholder.com/80"}
                    alt="Produto"
                    width="80"
                    height="80"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                  <div>
                    <div><strong>Produto:</strong> {item.nomeprod}</div>
                    <div><strong>Tamanho:</strong> {item.tamanhoprod}</div>
                    <div><strong>Quantidade:</strong> {item.quantidade}</div>
                  </div>
                </div>

                <div className="text-end">
                  <div><strong>Preço Unitário:</strong> €{item.precounitario.toFixed(2)}</div>
                  <div><strong>Preço Total:</strong> €{(item.quantidade * item.precounitario).toFixed(2)}</div>
                </div>
              </Card.Body>
            ))}

            <Card.Footer className="d-flex justify-content-between">
              <div>
                <strong>Valor Final da Venda:</strong> €{venda.valorfinal?.toFixed(2)}
              </div>
              <div>
                <Button variant="danger" onClick={() => handleDelete(venda.idvenda)}>
                  Remover
                </Button>
              </div>
            </Card.Footer>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default AdminVendas;
