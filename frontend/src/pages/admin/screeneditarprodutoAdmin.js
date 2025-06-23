// src/pages/admin/ProdutoAdmin.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/screenprodutoAdmin.css';

const ProdutoAdmin = () => {
  const navigate = useNavigate();
  const { idproduto } = useParams();
  const [produto, setProduto] = useState({
    nome: '',
    idtipoprod: '',
    valor: '',
    tamanho: '',
    imagem: '',
    stock: '',
  });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Buscar produto atual
    fetch(`/api/produtos/${idproduto}`)
      .then(res => res.json())
      .then(data => {
        setProduto({
          nome: data.nome || '',
          idtipoprod: data.idtipoprod || '',
          valor: data.valor || '',
          tamanho: data.tamanho || '',
          imagem: data.imagem || '',
          stock: data.stock || '',
        });
      })
      .catch(err => console.error('Erro ao carregar produto:', err));

    // Buscar categorias disponíveis
    fetch(`/api/tiposprodutos`)
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error('Erro ao carregar categorias:', err));
  }, [idproduto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/produtos/${idproduto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto),
      });

      if (res.ok) {
        alert("Produto atualizado com sucesso.");
        navigate('/admin/produtos');
      } else {
        const err = await res.json();
        alert("Erro ao atualizar produto: " + err.error);
      }
    } catch (error) {
      alert("Erro de rede: " + error.message);
    }
  };

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
        <h1 className="title">Editar Produto</h1>

        <div className="edit-container">
          {/* Imagem do produto */}
          <div className="image-preview">
            {produto.imagem ? (
              <img src={produto.imagem} alt="Preview" />
            ) : (
              <span>Sem imagem</span>
            )}
          </div>

          {/* Formulário */}
          <div className="form-section">
            <div className="input-row">
              <div className="input-group">
                <label>Nome:</label>
                <input type="text" name="nome" value={produto.nome} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Categoria:</label>
                <select name="idtipoprod" value={produto.idtipoprod} onChange={handleChange}>
                  <option value="">Selecione</option>
                  {categorias.map((cat) => (
                    <option key={cat.idtipoprod} value={cat.idtipoprod}>{cat.nome}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Preço (€):</label>
                <input type="number" name="valor" value={produto.valor} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Tamanho:</label>
                <input type="text" name="tamanho" value={produto.tamanho} onChange={handleChange} />
              </div>
            </div>

            <div className="input-group">
              <label>Imagem (URL):</label>
              <input type="text" name="imagem" value={produto.imagem} onChange={handleChange} />
            </div>

            <div className="input-group">
              <label>Stock:</label>
              <input type="number" name="stock" value={produto.stock} onChange={handleChange} />
            </div>

            <button className="save-button" onClick={handleSubmit}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutoAdmin;
