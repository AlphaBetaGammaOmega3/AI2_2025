import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

const filtros = ["Homem", "Mulher", "Calçado", "Calças", "T-shirts", "Casacos", "Hoodies", "Camisas"];

const Header = () => {
  return (
    <header>
      {/* Topo com pesquisa e ícones */}
      <div style={{ backgroundColor: "#346E7F", color: "white" }} className="py-3 px-4 w-100">
        <Container fluid>
          <Row className="align-items-center">
            <Col xs={12} md={8} className="text-center mb-2 mb-md-0">
              <Form.Control type="text" placeholder="Pesquisar" />
            </Col>
            <Col md={4} className="d-flex justify-content-end gap-4">
              <Link to="/cart" className="text-white fs-4">
                <FaShoppingCart />
              </Link>
              <Link to="/login" className="text-white fs-4">
                <FaSignOutAlt />
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Barra de filtros */}
      <div className="py-2" style={{ backgroundColor: "#6c757d", color: "white" }}>
        <Container fluid>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            {filtros.map((filtro) => (
              <Button key={filtro} variant="outline-light" size="sm">
                {filtro}
              </Button>
            ))}
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
