// src/pages/CarrinhoPage.jsx
import React from "react";
import { Link } from "react-router-dom";4
import Header from "../../components/Header";

const Cart = () => {
  return (
    <div>
      {/* HEADER */}
      <Header />

      {/* MAIN */}
      <div className="container my-4">
        <div className="row">
          {/* Produto no carrinho */}
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="row g-0">
                <div
                  className="col-4 d-flex align-items-center justify-content-center bg-dark text-white"
                  style={{ aspectRatio: "2/3" }}
                >
                  2:3
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title">Título do Artigo</h5>
                    <p className="card-text">
                      Descricao Descricao Descricao Descricao Descricao
                      Descricao Descricao
                    </p>
                    <Link to="#" className="btn btn-primary mb-2">
                      Ver Artigo
                    </Link>
                    <p className="card-text">
                      <small className="text-muted">
                        categoria / preço / tamanho
                      </small>
                    </p>
                    <button className="btn btn-danger me-2">Remover</button>
                    <button className="btn btn-secondary">Editar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detalhes de compra */}
          <div className="col-md-6">
            <h4>Detalhes de compra:</h4>
            <p>Valor total: 00,00 €</p>
            <form>
              <div className="mb-3">
                <label className="form-label">Nome de utilizador</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="nome de utilizador"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Morada</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Morada"
                />
              </div>
              <button className="btn btn-primary">Efetuar Compra</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
