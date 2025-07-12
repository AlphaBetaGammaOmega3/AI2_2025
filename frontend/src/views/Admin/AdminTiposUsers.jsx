import React, { useEffect, useState } from "react";
import { Container, Button, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import AdminNavBar from "../../components/AdminNavBar ";

const AdminTiposUsers = () => {
  const [tipos, setTipos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTipo, setEditingTipo] = useState(null);
  const [descricao, setDescricao] = useState("");

  const fetchTipos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/tiposusers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTipos(res.data);
    } catch (error) {
      alert("Erro ao procurar tipos de users");
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

  const handleDelete = async (idtipouser) => {
    if (window.confirm("Quer mesmo apagar este tipo de user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/tiposusers/${idtipouser}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchTipos();
      } catch (error) {
        alert("Erro ao apagar tipo de user");
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editingTipo) {
        await axios.put(
          `http://localhost:3000/api/tiposusers/${editingTipo.idtipouser}`,
          { descricao },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/tiposusers",
          { descricao },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setShowForm(false);
      fetchTipos();
    } catch (error) {
      alert("Erro ao salvar tipo de user");
      console.error(error);
    }
  };

  return (
    <div style={{minHeight:"100vh", backgroundColor: "#f0f4f5", minWidth: "1530px"}}>
      <AdminNavBar />
      <Container className="mt-4">
        <h3>Gestão de Tipos de Utilizadores</h3>
        <Button className="mb-3" onClick={() => openForm()}>Adicionar Tipo User</Button>

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
              <tr key={tipo.idtipouser}>
                <td>{tipo.idtipouser}</td>
                <td>{tipo.descricao}</td>
                <td>
                  <Button size="sm" variant="secondary" onClick={() => openForm(tipo)}>Editar</Button>{" "}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(tipo.idtipouser)}>Apagar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showForm} onHide={() => setShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingTipo ? "Editar Tipo User" : "Criar Tipo User"}</Modal.Title>
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
                {editingTipo ? "Salvar Alterações" : "Criar Tipo User"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminTiposUsers;
