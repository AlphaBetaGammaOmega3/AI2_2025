// src/pages/admin/ProdutosAdmin.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/screenprodutosAdmin.css";

const ProdutosAdmin = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/produtos", {
      headers: {
        // Se usas token, acrescenta aqui:
        // Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  const handleDelete = async (idproduto) => {
    if (!window.confirm("Tem certeza que deseja remover este produto?")) return;
    try {
      const res = await fetch(`/api/produtos/${idproduto}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setProdutos(produtos.filter((p) => p.idproduto !== idproduto));
      } else {
        const err = await res.json();
        alert("Erro ao apagar produto: " + err.error);
      }
    } catch (err) {
      alert("Erro de rede: " + err.message);
    }
  };

  const filteredProdutos = produtos.filter(p =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="center">
          <button onClick={() => navigate("/admin/main")}>Utilizadores</button>
          <button onClick={() => navigate("/admin/produtos")}>Produtos</button>
          <button onClick={() => navigate("/admin/vendas")}>Vendas</button>
        </div>
        <div className="right">
          <i className="fa fa-sign-out icon" onClick={() => navigate('/')} title="Logout"></i>
        </div>
      </header>

      <main>
        <h2>Lista de produtos:</h2>
        <div className="search-filters">
          <input
            type="text"
            placeholder="Pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select>
            <option value="">Filtros</option>
            <option value="vendas">Por nº de vendas</option>
            <option value="alfabetica">Por ordem alfabética</option>
          </select>
          <button onClick={() => navigate("/admin/adicionar")}>
            Adicionar Produto <i className="fa fa-plus" />
          </button>
        </div>

        <div className="produtos-scroll">
          {filteredProdutos.length === 0 ? (
            <p>Nenhum produto encontrado.</p>
          ) : (
            filteredProdutos.map((produto) => (
              <div className="produto-card" key={produto.idproduto}>
                <div className="image-placeholder">
                  {/* Se tiver imagem real, exibe: */}
                  {produto.imagem ? (
                    <img src={produto.imagem} alt={produto.nome} />
                  ) : (
                    "Sem imagem"
                  )}
                </div>
                <div className="produto-info">
                  <h4>{produto.nome}</h4>
                  <p>
                    Categoria: {produto.idtipoprod_tiposproduto?.nome || "Desconhecida"}
                  </p>
                  <p>Preço: {produto.valor}€</p>
                  <p>Tamanho: {produto.tamanho}</p>
                  {produto.stock !== undefined && (
                    <p style={{ fontWeight: 'bold' }}>Stock: {produto.stock}</p>
                  )}

                  <div className="produto-footer">
                    <button onClick={() => navigate(`/admin/editar/${produto.idproduto}`)} className="btn-editar">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(produto.idproduto)} className="btn-remover">
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ProdutosAdmin;
