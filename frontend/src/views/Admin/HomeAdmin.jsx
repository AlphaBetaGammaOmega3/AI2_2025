import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavBar ";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [tiposUsers, setTiposUsers] = useState([]);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    morada: "",
    idtipouser: 2,
  });

  const apiUrl = "http://localhost:3000/api/users";

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setErro("Token não encontrado. Faça login novamente.");
        return;
      }

      const res = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
      setErro(null);
    } catch (err) {
      console.error("Erro ao buscar utilizadores:", err);
      setErro("Erro ao buscar utilizadores. Verifique se tem permissões.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(res.data);
    } catch (err) {
      console.error("Erro ao buscar utilizador logado:", err);
    }
  };

  const fetchTiposUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/tiposusers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTiposUsers(res.data);
    } catch (err) {
      console.error("Erro ao buscar tipos de utilizador:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
    fetchTiposUsers();
  }, []);

  if (loading) return <p>A carregar utilizadores...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  const handleDelete = async (iduser) => {
    if (window.confirm("Deseja realmente remover este utilizador?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${apiUrl}/${iduser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchUsers();
      } catch (err) {
        console.error("Erro ao remover utilizador:", err.message);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      nome: user.nome.trim(),
      email: user.email.trim(),
      morada: user.morada?.trim() || "",
      idtipouser: user.idtipouser || 2,
      password: "",
    });
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingUser(null);
    setFormData({
      nome: "",
      email: "",
      password: "",
      morada: "",
      idtipouser: 2,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (editingUser) {
        await axios.put(`${apiUrl}/${editingUser.iduser}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(apiUrl, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error("Erro ao salvar utilizador:", err.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f5", minWidth: "1530px" }}>
      {/* Header */}
            <AdminNavBar />
      <div className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: "#326d7c", color: "white" }}>
        <div className="d-flex gap-3">
          <Link to="/homeAdmin" className="btn btn-outline-light">Utilizadores</Link>
          <Link to="/adminprodutos" className="btn btn-outline-light">Produtos</Link>
          <Link to="/adminvendas" className="btn btn-outline-light">Vendas</Link>
        </div>
        <FaSignOutAlt size={24} />
      </div>

      {/* Body */}
      <div className="container-fluid mt-4 px-4">
        <div className="row">
          {/* Lista de utilizadores */}
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Lista de utilizadores:</h4>
              <Button variant="success" onClick={handleCreate}>Criar novo</Button>
            </div>

            {users.map((user) => (
              <div key={user.iduser} className="d-flex justify-content-between align-items-center p-3 mb-3 rounded" style={{ backgroundColor: "#a6bbc3" }}>
                <div className="d-flex align-items-center gap-3">
                  <FaUserCircle size={40} />
                  <div>
                    <div>{user.nome.trim()}</div>
                    <div style={{ fontSize: "0.9rem", color: "#333" }}>
                      {user.email.trim()} — {user.tipouser?.descricao}
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="info" onClick={() => handleEdit(user)}>Editar</Button>
                  <Button variant="danger" onClick={() => handleDelete(user.iduser)}>Remover</Button>
                </div>
              </div>
            ))}
          </div>

          {/* Cartão do utilizador logado */}
          <div className="col-md-4">
            <Card className="text-center">
              <Card.Header style={{ backgroundColor: "#326d7c" }}>
                <FaUserCircle size={60} color="white" />
              </Card.Header>
              <Card.Body style={{ backgroundColor: "#e8eef0" }}>
                <Card.Title className="text-start">Nome:</Card.Title>
                <Card.Text className="text-start">{currentUser?.nome || "—"}</Card.Text>
                <Card.Title className="text-start">E-mail:</Card.Title>
                <Card.Text className="text-start">{currentUser?.email || "—"}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5" style={{ height: "30px", backgroundColor: "#326d7c" }} />

      {/* Modal de formulário */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? "Editar Utilizador" : "Criar Utilizador"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Morada</Form.Label>
              <Form.Control
                type="text"
                value={formData.morada}
                onChange={(e) => setFormData({ ...formData, morada: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Tipo de Utilizador</Form.Label>
              <Form.Select
                value={formData.idtipouser}
                onChange={(e) => setFormData({ ...formData, idtipouser: parseInt(e.target.value) })}
                required
              >
                {tiposUsers.map((tipo) => (
                  <option key={tipo.idtipouser} value={tipo.idtipouser}>
                    {tipo.descricao}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={editingUser ? "Nova senha (opcional)" : "Senha"}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2 w-100">
              {editingUser ? "Salvar Alterações" : "Criar"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
