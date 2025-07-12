import React, { useEffect, useState } from "react";
import { Container, Button, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import AdminNavBar from "../../components/AdminNavBar ";


const AdminTiposProdutos = () => {
  const [tipos, setTipos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTipo, setEditingTipo] = useState(null);
  const [descricao, setDescricao] = useState("");

  const fetchTipos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/tiposprodutos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTipos(res.data);
    } catch (error) {
      alert("Erro ao buscar tipos de produtos");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  const openForm = (tipo = null) => {
    if (tipo) {
      setEditingTipo(tipo);
      setDescricao(tipo.descricao);
    } else {
      setEditingTipo(null);
      setDescricao("");
    }
    setShowForm(true);
  };

  const handleDelete = async (idtipoproduto) => {
    if (window.confirm("Quer mesmo apagar este tipo de produto?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/tiposprodutos/${idtipoproduto}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchTipos();
      } catch (error) {
        alert("Erro ao apagar tipo de produto");
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editingTipo) {
        // Update
        await axios.put(
          `http://localhost:3000/api/tiposprodutos/${editingTipo.idtipoprod}`,
          { descricao },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create
        await axios.post(
          "http://localhost:3000/api/tiposprodutos",
          { descricao },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setShowForm(false);
      fetchTipos();
    } catch (error) {
      alert("Erro ao salvar tipo de produto");
      console.error(error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f5", minWidth: "1530px" }}>
      <AdminNavBar />
      <Container className="mt-4">
        <h3>Gestão de Tipos de Produtos</h3>
        <Button className="mb-3" onClick={() => openForm()}>Adicionar Tipo Produto</Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map((tipo) => (
              <tr key={tipo.idtipoprod}>
                <td>{tipo.idtipoprod}</td>
                <td>{tipo.descricao}</td>
                <td>
                  <Button size="sm" variant="secondary" onClick={() => openForm(tipo)}>Editar</Button>{" "}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(tipo.idtipoprod)}>Apagar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showForm} onHide={() => setShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingTipo ? "Editar Tipo Produto" : "Criar Tipo Produto"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" className="mt-3" variant="primary">
                {editingTipo ? "Salvar Alterações" : "Criar Tipo Produto"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminTiposProdutos;
