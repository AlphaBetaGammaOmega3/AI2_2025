import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

const filtros = ["Homem", "Mulher", "Calçado", "Calças", "T-shirts", "Casacos", "Hoodies", "Camisas"];

const Header = () => {
  return (
    <header>
      {/* Barra de pesquisa e ícones */}
      <div className="bg-teal-700 text-white py-3 px-4">
        <Container fluid>
          <Row className="align-items-center">
            <Col xs={12} md={8} className="text-center mb-2 mb-md-0">
              <Form.Control type="text" placeholder="Pesquisar" />
            </Col>
            <Col md={2} className="text-end d-flex justify-content-end gap-3" color="black">
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
      <div className="bg-secondary text-white py-2">
        <Container>
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
