import React from 'react';
import '../../styles/Carrinho.css';
import Header from '../../components/header';

const CartPage = () => {
  return (
    <div className="content-section">
      <Header />

      <div className="cart-container">
        {/* Itens do carrinho */}
        <div className="cart-items">
          <div className="product-card">
            <div className="product-image">2:3</div>

            <div className="product-info">
              <h3>Título do Artigo</h3>
              <p>Descricao Descricao Descricao Descricao</p>

              <button className="view-button">Ver Artigo</button>
              <p>categoria / preço / tamanho</p>

              <div className="action-buttons">
                <button className="remove-button">Remover</button>
                <button className="edit-button">Editar</button>
              </div>
            </div>
          </div>
        </div>

        {/* Detalhes da compra */}
        <div className="checkout-details">
          <h2>Detalhes de compra:</h2>
          <p>Valor total: 00,00 €</p>

          <input type="text" placeholder="Nome de utilizador" />
          <input type="text" placeholder="Telemóvel" />

          <button className="checkout-button">Efetuar Compra</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
