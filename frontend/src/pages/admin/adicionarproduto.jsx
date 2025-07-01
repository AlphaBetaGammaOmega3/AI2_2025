import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/screenprodutoAdmin.css';

const AdicionaProduto = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    idtipoprod: '',
    imagem: '',
    valor: '',
    stock: '',
    tamanho: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const err = await response.json();
        alert('Erro ao adicionar produto: ' + err.error);
        return;
      }

      navigate('/admin/produtos');
    } catch (error) {
      alert('Erro no envio: ' + error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="header">
        <div className="nav-buttons">
          <button onClick={() => navigate('/admin/main')} className="nav-button">Utilizadores</button>
          <button onClick={() => navigate('/admin/produtos')} className="nav-button">Produtos</button>
          <button onClick={() => navigate('/admin/vendas')} className="nav-button">Vendas</button>
        </div>
        <i className="fa fa-sign-out icon" onClick={() => navigate('/')} title="Logout"></i>
      </div>

      <div className="content">
        <h1 className="title">Adicionar Produto</h1>

        <div className="edit-container">
          <div className="image-preview"></div>

          <div className="form-section">
            <div className="input-row">
              <div className="input-group">
                <label>Nome:</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Categoria (ID):</label>
                <input type="number" name="idtipoprod" value={formData.idtipoprod} onChange={handleChange} />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Preço:</label>
                <input type="number" name="valor" value={formData.valor} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Tamanho:</label>
                <input type="text" name="tamanho" value={formData.tamanho} onChange={handleChange} />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Imagem (URL ou nome do ficheiro):</label>
                <input type="text" name="imagem" value={formData.imagem} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Stock:</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} />
              </div>
            </div>

            <button className="save-button" onClick={handleSubmit}>
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdicionaProduto;
