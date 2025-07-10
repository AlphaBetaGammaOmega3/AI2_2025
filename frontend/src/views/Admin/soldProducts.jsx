import React, { useState } from "react";
import { Button, Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const vendasFake = [
  {
    id: 1,
    titulo: "Título do Artigo",
    descricao: "descrição descrição descrição descrição descrição",
    preco: "00,00€",
    categoria: "Categoria",
    tags: ["Homem", "Promoção"],
    tamanho: "M",
    comprador: "emailexemplo@gmail.com",
    imagem: "https://placehold.co/100x100?text=1:1"
  },
  {
    id: 2,
    titulo: "Casaco Inverno",
    descricao: "Quente e confortável, ideal para dias frios.",
    preco: "45,00€",
    categoria: "Casaco",
    tags: ["Mulher", "Inverno"],
    tamanho: "L",
    comprador: "cliente@gmail.com",
    imagem: "https://placehold.co/100x100?text=1:1"
  },
  // Adiciona mais vendas conforme necessário
];

const VendasAdmin = () => {
  const [vendaSelecionada, setVendaSelecionada] = useState(null);

  const selecionarVenda = (id) => {
    setVendaSelecionada(id === vendaSelecionada ? null : id);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f5", minWidth:"1530px"}}>
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center p-3"
        style={{ backgroundColor: "#326d7c", color: "white" }}
      >
        <div className="d-flex gap-3">
          <Link to="/homeAdmin">
            <Button variant="outline-light">Utilizadores</Button>
          </Link>
          <Link to="/listProducts">
            <Button variant="outline-light">Produtos</Button>
          </Link>
          <Button variant="outline-light">Vendas</Button>
        </div>
        <Link to="/login" className="ms-3 text-white">
          <FaSignOutAlt size={24} style={{ cursor: "pointer" }} />
        </Link>
      </div>

      <Container className="my-4">
        <h3 className="mb-4">Lista de Vendas:</h3>

        {/* Slide vertical com cards */}
        <div style={{ maxHeight: "500px", overflowY: "auto" }} className="d-flex flex-column gap-3">
          {vendasFake.map((venda) => (
            <Card
              key={venda.id}
              className={`d-flex flex-row align-items-start p-3 gap-3 ${vendaSelecionada === venda.id ? "border border-3 border-primary" : ""}`}
              style={{ backgroundColor: "#B5C9CC", cursor: "pointer" }}
              onClick={() => selecionarVenda(venda.id)}
            >
              <Image src={venda.imagem} alt={venda.titulo} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
              <div className="d-flex flex-column gap-1">
                <div><strong>Artigo:</strong> {venda.titulo}</div>
                <div><strong>Descrição:</strong> {venda.descricao}</div>
                <div className="d-flex flex-wrap gap-3">
                  <div><strong>Preço:</strong> {venda.preco}</div>
                  <div><strong>Categoria:</strong> {venda.categoria}</div>
                  <div><strong>Tamanho:</strong> {venda.tamanho}</div>
                  <div><strong>Comprador:</strong> {venda.comprador}</div>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {venda.tags.map((tag, i) => (
                    <span key={i} className="badge bg-secondary">{tag}</span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Botões de ação */}
        {vendaSelecionada && (
          <div className="mt-4 d-flex gap-3 justify-content-center">
            <Button variant="primary">Editar</Button>
            <Button variant="danger">Remover</Button>
          </div>
        )}
      </Container>

      {/* Footer */}
      <footer style={{ backgroundColor: "#346E7F", height: "30px", marginTop: "200px"}} />
    </div>
  );
};

export default VendasAdmin;
