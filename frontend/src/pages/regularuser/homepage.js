import React, { useEffect, useState } from 'react';
import Header from '../../components/header';

function HomePage() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Troque a URL pela sua real do backend
    fetch('http://localhost:3000/api/produtos')
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        return res.json();
      })
      .then((data) => {
        setProdutos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="content-section">
      <Header />
      <div className="filter-section">
        <nav className="filter-bar">
          <button>Homem</button>
          <button>Mulher</button>
          <button>Calçados</button>
          <button>Calças</button>
          <button>T-shirts</button>
          <button>Casacos</button>
          <button>Hoodies</button>
          <button>Camisas</button>
        </nav>

        <section className="product-section">
          <h2>Lista de produtos</h2>
          <div className="product-carousel">
            {produtos.length === 0 && <p>Nenhum produto encontrado.</p>}
            {produtos.map((produto) => (
              <div className="product-card" key={produto.idprod}>
                <div className="product-image">
                  {/* Exibir imagem ou placeholder */}
                  {produto.imagem ? (
                    <img src={produto.imagem} alt={produto.nome} style={{ maxWidth: '100%', height: 'auto' }} />
                  ) : (
                    <div style={{ width: '100%', paddingTop: '66%', background: '#eee' }}>Sem imagem</div>
                  )}
                </div>
                <div className="product-info">
                  <h3>{produto.nome}</h3>
                  <p>Valor: R$ {produto.valor.toFixed(2)}</p>
                  <p>Estoque: {produto.stock}</p>
                  <p>Tipo: {produto.idtipoprod_tiposproduto?.nome || 'N/A'}</p>
                  <p>Tamanho: {produto.tamanho || 'N/A'}</p>
                  <button>Ver Artigo</button>
                  {/* Você pode adicionar tags ou hashtags aqui */}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
