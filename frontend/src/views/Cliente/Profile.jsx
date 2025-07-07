import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const Perfil = () => {
  return (
    <>
      <Container fluid className="bg-light min-vh-100">
        <h3 className="py-4 px-4">Perfil</h3>
        <Container className="d-flex justify-content-center">
          <Card className="p-4 rounded shadow" style={{ width: "80%", backgroundColor: "#ddd", borderRadius: "25px" }}>
            <Row className="align-items-center">
              <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                <FaUserCircle size={150} color="#316976" />
              </Col>
              <Col xs={12} md={8}>
                <p><strong>Nome:</strong><br /> usernameexemplo123</p>
                <p><strong>E-mail:</strong><br /> emailexemplo@gmail.com</p>
                <p><strong>Compras efetuadas:</strong><br /> 000000</p>
              </Col>
            </Row>
          </Card>
        </Container>
      </Container>
    </>
  );
};

export default Perfil;
