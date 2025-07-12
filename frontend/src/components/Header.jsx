import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaShoppingCart, FaSignOutAlt, FaUser, FaCoins } from "react-icons/fa";

const filtros = ["Calçado", "Calças", "T-shirts", "Casacos", "Camisolas", "Camisas"];

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      {/* Topo com ícones */}
      <div style={{ backgroundColor: "#346E7F", color: "white" }} className="py-3 px-4 w-100">
        <Container fluid>
          <Row className="align-items-center">
            <Col className="d-flex justify-content-end gap-4">
              {!token ? (
                <Link to="/login" className="text-white fs-5">
                  Login
                </Link>
              ) : (
                <>
                  <Link to="/minhascompras" className="text-white fs-4">
                    <FaCoins />
                  </Link>
                  <Link to="/cart" className="text-white fs-4">
                    <FaShoppingCart />
                  </Link>
                  <Link to="/perfil" className="text-white fs-4">
                    <FaUser />
                  </Link>
                  <Button
                    variant="link"
                    className="text-white fs-4 p-0 border-0"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Barra de filtros apenas para utilizadores autenticados */}
      {token && (
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
      )}
    </header>
  );
};

export default Header;
