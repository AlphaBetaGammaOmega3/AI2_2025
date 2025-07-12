import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import Header from "../../components/Header";

const MinhasVendas = () => {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const fetchMinhasVendas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/vendas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVendas(response.data);
      } catch (err) {
        console.error("Erro ao buscar suas vendas:", err.message);
      }
    };

    fetchMinhasVendas();
  }, []);

  const formatDateOnly = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <Header />
      <Container style={{ minWidth: "1520px", minHeight: "100vh" }} className="mt-4">
        <h3 className="mb-4 text-left text-black">Minhas Compras</h3>
        {vendas.length === 0 && <p className="text-center">Você ainda não fez nenhuma compra.</p>}

        {vendas.map((venda, index) => (
          <Card className="mb-4 shadow-sm" key={venda.idvenda} bg="light" border="secondary">
            <Card.Header className="d-flex justify-content-between">
              <strong>Compra #{index + 1}</strong>
              <span>Data: {formatDateOnly(venda.datacompra)}</span>
            </Card.Header>

            {venda.vendas_itens && venda.vendas_itens.map((item, idx) => (
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

            <Card.Footer className="text-end">
              <strong>Valor Total da Compra:</strong> €{venda.valorfinal?.toFixed(2)}
            </Card.Footer>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default MinhasVendas;
