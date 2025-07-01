import React, { useEffect, useState } from 'react';
import Header from '../../components/header';

const HomePage = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  return (
    <div className="content-section">
      <Header />

      <div className="filter-section">
        <nav className="filter-bar">
          {['Homem', 'Mulher', 'Calçados', 'Calças', 'T-shirts', 'Casacos', 'Hoodies', 'Camisas'].map((filtro) => (
            <button key={filtro}>{filtro}</button>
          ))}
        </nav>

        <section className="product-section">
          <h2>Lista de produtos</h2>

          {loading && <p>Carregando produtos...</p>}
          {error && <p>Erro: {error}</p>}

          <div className="product-carousel">
            {produtos.length === 0 && !loading && !error && <p>Nenhum produto encontrado.</p>}

            {produtos.map((produto) => (
              <div className="product-card" key={produto.idprod}>
                <div className="product-image">
                  {produto.imagem ? (
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        paddingTop: '66%',
                        background: '#eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        color: '#888',
                      }}
                    >
                      Sem imagem
                    </div>
                  )}
                </div>

                <div className="product-info">
                  <h3>{produto.nome}</h3>
                  <p>Valor: € {produto.valor.toFixed(2)}</p>
                  <p>Estoque: {produto.stock}</p>
                  <p>Tipo: {produto.idtipoprod_tiposproduto?.nome || 'N/A'}</p>
                  <p>Tamanho: {produto.tamanho || 'N/A'}</p>
                  <button>Ver Artigo</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
