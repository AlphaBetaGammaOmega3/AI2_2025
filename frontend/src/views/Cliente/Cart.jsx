import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";

const Cart = () => {
  const [carrinho, setCarrinho] = useState([]);

  // imaginando que ao fazer login você armazena o iduser no localStorage
  const iduser = localStorage.getItem("iduser");

  useEffect(() => {
    if (iduser) {
      axios
        .get(`http://localhost:3000/api/carrinhos/${iduser}`)
        .then((res) => {
          setCarrinho(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [iduser]);

  // função para remover produto do carrinho
  const handleRemoverProduto = (idprod) => {
    axios
      .delete(`http://localhost:3000/api/carrinhos/${iduser}/${idprod}`)
      .then(() => {
        // atualizar carrinho local depois de remover
        setCarrinho((prev) => prev.filter((item) => item.idprod !== idprod));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f5", minWidth:"1530px"}}>
      <Header />
      <div className="container-fluid my-4">
        <div className="row">
          {/* Produtos no carrinho */}
          <div className="col-md-6">
            {carrinho.length > 0 ? (
              carrinho.map((item) => (
                <div className="card mb-4" key={item.idprod}>
                  <div className="row g-0">
                    <div
                      className="col-4 d-flex align-items-center justify-content-center bg-dark text-white"
                      style={{ aspectRatio: "2/3" }}
                    >
                      IMG
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.idprod_produto?.titulo}</h5>
                        <p className="card-text">{item.idprod_produto?.descricao}</p>
                        <Link
                          to={`/produtos/${item.idprod}`}
                          className="btn btn-primary mb-2"
                        >
                          Ver Artigo
                        </Link>
                        <p className="card-text">
                          <small className="text-muted">
                            {item.idprod_produto?.preco} €
                          </small>
                        </p>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => handleRemoverProduto(item.idprod)}
                        >
                          Remover
                        </button>
                        <button className="btn btn-secondary">Editar</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>O carrinho está vazio.</p>
            )}
          </div>

          {/* Detalhes de compra */}
          <div className="col-md-6">
            <h4>Detalhes de compra:</h4>
            <p>
              Valor total:{" "}
              {carrinho.reduce(
                (total, item) => total + item.idprod_produto?.preco * item.quantidade,
                0
              ).toFixed(2)}{" "}
              €
            </p>
            <form>
              {/* campos de checkout */}
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
