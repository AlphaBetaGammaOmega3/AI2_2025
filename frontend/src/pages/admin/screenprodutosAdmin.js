// src/pages/admin/ProdutosAdmin.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/screenprodutosAdmin.css"; // Estilos próprios

const ProdutosAdmin = () => {
  const navigate = useNavigate();

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
          <input type="text" placeholder="Pesquisar" />
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
          {/* Aqui vais mapear os produtos em cards */}
          {[1, 2, 3].map((id) => (
            <div className="produto-card" key={id}>
              <div className="image-placeholder">2:3</div>
              <div className="produto-info">
                <h4>Título do Artigo</h4>
                <p>Descrição Descricao Descricao...</p>
                <button>Ver Artigo</button>
                <div className="produto-footer">
                  <span>categoria/preço/tamanho</span>
                  <div>
                    <button className="btn-remover">Remover</button>
                    <button className="btn-editar">Editar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProdutosAdmin;
