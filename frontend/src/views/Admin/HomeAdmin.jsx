import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";


const AdminDashboard = () => {
  const users = Array(6).fill({
    nome: "Nome do utilizador",
    email: "e-mailexemplo@.com",
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f5", minWidth: "1530px" }}>
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center p-3"
        style={{ backgroundColor: "#326d7c", color: "white" }}
      >
        <div className="d-flex gap-3">
          <Button variant="outline-light">Utilizadores</Button>
          <Link to="/listProducts">
            <Button variant="outline-light">Produtos</Button>
          </Link>
          <Link to="/soldProducts">
            <Button variant="outline-light">Vendas</Button>
          </Link>
        </div>
        <Link to="/login" className="ms-3 text-white">
          <FaSignOutAlt size={24} style={{ cursor: "pointer" }} />
        </Link>
      </div>

      {/* Body */}
      <div className="container-fluid mt-4 px-4">
        <div className="row">
          {/* Lista de utilizadores */}
          <div className="col-md-8">
            <h4>Lista de utilizadores:</h4>
            {users.map((user, index) => (
              <div
                key={index}
                className="d-unset align-items-center p-3 mb-3 rounded"
                style={{ backgroundColor: "#a6bbc3" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <FaUserCircle size={40} />
                  <div>
                    <div>{user.nome}</div>
                    <div style={{ fontSize: "0.9rem", color: "#333" }}>
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="info">Editar</Button>
                  <Button variant="danger">Remover</Button>
                </div>
              </div>
            ))}
          </div>

          {/* Detalhes do utilizador */}
          <div className="col-md-4">
            <Card className="text-center">
              <Card.Header style={{ backgroundColor: "#326d7c" }}>
                <FaUserCircle size={60} color="white" />
              </Card.Header>
              <Card.Body style={{ backgroundColor: "#e8eef0" }}>
                <Card.Title className="text-start">Nome:</Card.Title>
                <Card.Text className="text-start">Adolfo Dias</Card.Text>
                <Card.Title className="text-start">E-mail:</Card.Title>
                <Card.Text className="text-start">emailexemplo@.com</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer color bar */}
      <div
        className="mt-5"
        style={{ height: "30px", backgroundColor: "#326d7c" }}
      />
    </div>
  );
};

export default AdminDashboard;
