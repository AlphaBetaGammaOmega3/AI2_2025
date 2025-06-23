import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/screenprodutoAdmin.css';
const ProdutoAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Header */}
      <div className="header">
        <div className="nav-buttons">
          <button onClick={() => navigate('/admin/main')} className="nav-button">Utilizadores</button>
          <button onClick={() => navigate('/admin/produtos')} className="nav-button">Produtos</button>
          <button onClick={() => navigate('/admin/vendas')} className="nav-button">Vendas</button>
        </div>
          <i className="fa fa-sign-out icon" onClick={() => navigate('/')} title="Logout"></i>
      </div>

      {/* Conteúdo */}
      <div className="content">
        <h1 className="title">Editar Produto:</h1>

        <div className="edit-container">
          {/* Imagem do produto */}
          <div className="image-preview"></div>

          {/* Formulário */}
          <div className="form-section">
            <div className="input-row">
              <div className="input-group">
                <label>Nome:</label>
                <input type="text" placeholder="nome" />
              </div>
              <div className="input-group">
                <label>Categoria:</label>
                <input type="text" placeholder="categoria" />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Preço:</label>
                <input type="text" placeholder="preço" />
              </div>
              <div className="input-group">
                <label>Tamanho:</label>
                <input type="text" placeholder="tamanho" />
              </div>
            </div>

            <div className="input-group">
              <label>Descrição:</label>
              <textarea placeholder="Autosize height based on content lines" rows={3}></textarea>
            </div>

            <button className="save-button" onClick={() => navigate('/screenprodutosAdmin')}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutoAdmin;
