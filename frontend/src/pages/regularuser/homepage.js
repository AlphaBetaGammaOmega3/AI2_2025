import React from 'react';
import Header from '../../components/header';

function HomePage() {
    return (
        <div className='content-section'>
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
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div className="product-card" key={item}>
                                <div className="product-image">3:2</div>
                                <div className="product-info">
                                    <h3>Título do Artigo</h3>
                                    <p>Descricao Descricao Descricao Descricao</p>
                                    <button>Ver Artigo</button>
                                    <p className="tags">tipoartigo/hashtags/tamanho</p>
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
