import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaShoppingCart, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const filtros = ["Calçado", "Calças", "T-shirts", "Casacos", "Camisolas", "Camisas"];

const Header = () => {
  return (
    <header>
      {/* Topo com ícones à direita */}
      <div style={{ backgroundColor: "#346E7F", color: "white" }} className="py-3 px-4 w-100">
        <Container fluid>
          <Row className="align-items-center">
            <Col className="d-flex justify-content-end gap-4">
              <Link to="/cart" className="text-white fs-4">
                <FaShoppingCart />
              </Link>
              <Link to="/profile" className="text-white fs-4">
                <FaUserCircle />
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
