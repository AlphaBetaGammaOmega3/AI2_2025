import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/screenvendasAdmin.css';

const VendasAdmin = () => {
  const navigate = useNavigate();

  const vendas = [
    {
      id: 1,
      titulo: 'Título do Artigo',
      descricao:
        'descrição descrição descrição descrição descrição descrição descrição descrição',
      preco: '00,00€',
      categoria: 'categoria',
      tamanho: 'tamanho',
      comprador: 'emailexemplo@gmail.com',
      imagem: 'https://via.placeholder.com/50x50',
    },
    // Podes adicionar mais objetos para simular vendas
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="header">
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate('/admin/main')}>
            Utilizadores
          </button>
          <button className="nav-button" onClick={() => navigate('/admin/produtos')}>
            Produtos
          </button>
          <button className="nav-button">Vendas</button>
        </div>
        <i
          className="fa fa-sign-out icon"
          onClick={() => navigate('/')}
          title="Logout"
        ></i>
      </div>

      {/* Conteúdo */}
      <div className="content">
        <h1 className="title">Lista de Vendas:</h1>

        <div className="space-y-4">
          {vendas.map((venda) => (
            <div key={venda.id} className="venda-card">
              <img src={venda.imagem} alt="Produto" className="venda-imagem" />
              <div className="venda-info">
                <div>
                  <strong>Artigo:</strong><br />
                  {venda.titulo}
                </div>
                <div>
                  <strong>Descrição:</strong><br />
                  {venda.descricao}
                </div>
                <div>
                  <strong>Preço:</strong> {venda.preco}<br />
                  <strong>Categoria:</strong> {venda.categoria}<br />
                  <strong>Tamanho:</strong> {venda.tamanho}<br />
                  <strong>Comprador:</strong> {venda.comprador}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botões gerais */}
        <div className="button-container">
          <button
            onClick={() => navigate('/admin/produto')}
            className="edit-button"
          >
            Editar
          </button>
          <button className="delete-button">Remover</button>
        </div>
      </div>
    </div>
  );
};

export default VendasAdmin;
