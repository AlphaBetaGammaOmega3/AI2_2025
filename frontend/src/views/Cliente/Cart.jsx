import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";

const Cart = () => {
  // Estados principais
  const [carrinho, setCarrinho] = useState([]);
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [morada, setMorada] = useState("");
  const [loading, setLoading] = useState(false);

  const iduser = localStorage.getItem("iduser");
  const token = localStorage.getItem("token");

  // Função para carregar os produtos no carrinho
  const carregarCarrinho = () => {
    axios
      .get(`http://localhost:3000/api/carrinhos/${iduser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCarrinho(res.data))
      .catch((err) => console.error("Erro ao carregar carrinho:", err));
  };

  // Carrega os dados do utilizador e o carrinho
  useEffect(() => {
    if (!iduser || !token) return;

    carregarCarrinho();

    axios
      .get(`http://localhost:3000/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNome(res.data.nome);
        setEmail(res.data.email);
        setMorada(res.data.morada || "");
      })
      .catch((err) =>
        console.error("Erro ao carregar dados do utilizador:", err)
      );
  }, [iduser, token]);

  // Remover produto do carrinho
  const handleRemoverProduto = (idprod) => {
    if (!iduser || !token) {
      alert("Precisa estar autenticado para remover do carrinho.");
      return;
    }

    axios
      .delete(`http://localhost:3000/api/carrinhos/${iduser}/${idprod}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCarrinho((prev) => prev.filter((item) => item.idprod !== idprod));
      })
      .catch((err) => {
        console.error("Erro ao remover produto do carrinho:", err);
        alert("Erro ao remover produto do carrinho.");
      });
  };

  // Finalizar compra
  const handleEfetuarCompra = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Precisa estar autenticado para comprar.");
      return;
    }

    setLoading(true);
    try {
      // Atualiza morada do usuário
      await axios.put(
        `http://localhost:3000/api/users/${iduser}`,
        { morada },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Cria a venda
      await axios.post(
        "http://localhost:3000/api/vendas",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCompraFinalizada(true);
      setCarrinho([]);
      carregarCarrinho();
      alert("Compra realizada com sucesso!");
    } catch (err) {
      console.error("Erro ao efetuar compra:", err.response?.data || err);
      alert("Erro ao finalizar compra.");
    }
    setLoading(false);
  };

  // Total da compra
  const total = carrinho.reduce(
    (sum, item) =>
      sum + (item.idprod_produto?.valor || 0) * (item.quantidade || 1),
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f4f5",
        minWidth: "1530px",
      }}
    >
      <Header />

      <div className="container-fluid my-5">
        <div className="row">
          {/* Produtos no Carrinho */}
          <div className="col-md-6">
            <h4>Produtos no Carrinho:</h4>

            {carrinho.length > 0 ? (
              carrinho.map((item) => (
                <div className="card mb-4" key={item.idprod}>
                  <div className="row g-0">
                    <div className="col-4 d-flex align-items-center justify-content-center bg-dark text-white">
                      <img
                        src={
                          item.idprod_produto?.imagem ||
                          "https://via.placeholder.com/150"
                        }
                        alt={item.idprod_produto?.nome || "Produto"}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {item.idprod_produto?.nome}
                        </h5>
                        <p>{item.idprod_produto?.descricao}</p>
                        <p className="text-muted">
                          Preço unitário: €{item.idprod_produto?.valor}
                          <br />
                          Quantidade: {item.quantidade}
                        </p>
                        <Link
                          to={`/artigo/${item.idprod}`}
                          className="btn btn-primary me-2"
                        >
                          Ver Artigo
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemoverProduto(item.idprod)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>
                {compraFinalizada
                  ? "Carrinho esvaziado após a compra."
                  : "O carrinho está vazio."}
              </p>
            )}
          </div>

          {/* Formulário de Checkout */}
          <div className="col-md-6">
            <h4>Detalhes de compra:</h4>
            <p>
              <strong>Valor total:</strong> €{total.toFixed(2)}
            </p>

            <form onSubmit={handleEfetuarCompra}>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  value={nome}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Morada</label>
                <input
                  type="text"
                  className="form-control"
                  value={morada}
                  onChange={(e) => setMorada(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Processando..." : "Efetuar Compra"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
