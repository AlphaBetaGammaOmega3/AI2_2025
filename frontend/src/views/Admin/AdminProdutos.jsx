import React, { useEffect, useState } from "react";
import {
  Container, Card, Button, Form, Row, Col, Modal
} from "react-bootstrap";
import axios from "axios";
import AdminNavBar from "../../components/AdminNavBar ";

const AdminProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduto, setEditingProduto] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    imagem: "",
    valor: "",
    stock: "",
    tamanho: "",
    idtipoprod: ""
  });

  const fetchProdutos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/produtos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos(res.data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  const fetchTipos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/tiposprodutos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTipos(res.data);
    } catch (err) {
      console.error("Erro ao buscar tipos:", err);
    }
  };

  useEffect(() => {
    fetchProdutos();
    fetchTipos();
  }, []);

  const handleEdit = (produto) => {
    setEditingProduto(produto);
    setFormData({
      nome: produto.nome,
      imagem: produto.imagem,
      valor: produto.valor,
      stock: produto.stock,
      tamanho: produto.tamanho,
      idtipoprod: produto.idtipoprod
    });
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingProduto(null);
    setFormData({
      nome: "",
      imagem: "",
      valor: "",
      stock: "",
      tamanho: "",
      idtipoprod: ""
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja remover este produto?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/produtos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchProdutos();
      } catch (err) {
        console.error("Erro ao remover produto:", err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        valor: parseFloat(formData.valor),
        stock: parseInt(formData.stock, 10),
        idtipoprod: parseInt(formData.idtipoprod, 10),
      };

      if (editingProduto) {
        await axios.put(
          `http://localhost:3000/api/produtos/${editingProduto.idprod}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:3000/api/produtos", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setShowForm(false);
      fetchProdutos();
    } catch (err) {
      console.error("Erro ao salvar produto:", err.message);
      alert("Erro ao salvar produto. Veja o console.");
    }
  };

  const filteredProdutos = tipoSelecionado
    ? produtos.filter((p) => p.idtipoprod === parseInt(tipoSelecionado))
    : produtos;

  return (
    <>
      <AdminNavBar />
      <Container className="mt-4">
        <h3>Lista de produtos:</h3>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Select
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
            >
              <option value="">Todos os Tipos</option>
              {tipos.map((t) => (
                <option key={t.idtipoprod} value={t.idtipoprod}>
                  {t.descricao}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md="auto">
            <Button variant="outline-primary" onClick={handleCreate}>
              Adicionar Produto ➕
            </Button>
          </Col>
        </Row>

        <div className="d-flex flex-wrap gap-4 py-3">
          {filteredProdutos.map((produto) => (
            <Card style={{ width: "18rem" }} key={produto.idprod}>
              <Card.Img
                variant="top"
                src={produto.imagem || "https://via.placeholder.com/300x200?text=2:3"}
                alt="Imagem do Produto"
              />
              <Card.Body>
                <Card.Title>{produto.nome}</Card.Title>
                <Card.Text>
                  <strong>€{produto.valor}</strong> | Tamanho: {produto.tamanho}
                  <br />
                  <span className="text-success">
                    Estoque: {produto.stock ?? 0} unidade
                    {produto.stock === 1 ? "" : "s"}
                  </span>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="danger" onClick={() => handleDelete(produto.idprod)}>Remover</Button>
                  <Button variant="secondary" onClick={() => handleEdit(produto)}>Editar</Button>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted">
                {produto.idtipoprod_tiposproduto?.descricao || "Sem categoria"}
              </Card.Footer>
            </Card>
          ))}
        </div>
      </Container>

      {/* Modal de criação/edição */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduto ? "Editar Produto" : "Criar Produto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Imagem (URL)</Form.Label>
              <Form.Control
                value={formData.imagem}
                onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Valor (€)</Form.Label>
              <Form.Control
                type="number"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Estoque</Form.Label>
              <Form.Control
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Tamanho</Form.Label>
              <Form.Control
                value={formData.tamanho}
                onChange={(e) => setFormData({ ...formData, tamanho: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Produto</Form.Label>
              <Form.Select
                value={formData.idtipoprod}
                onChange={(e) => setFormData({ ...formData, idtipoprod: e.target.value })}
                required
              >
                <option value="">Selecione...</option>
                {tipos.map((t) => (
                  <option key={t.idtipoprod} value={t.idtipoprod}>
                    {t.descricao}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              {editingProduto ? "Salvar Alterações" : "Criar Produto"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminProdutos;
