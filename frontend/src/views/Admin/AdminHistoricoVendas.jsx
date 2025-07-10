import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminHistoricoVendas = () => {
    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/vendasitens') // ou /vendasitens/user/:iduser
            .then(response => {
                setHistorico(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar histórico de vendas:', error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2>Histórico de Vendas</h2>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Usuário</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço Final</th>
                    </tr>
                </thead>
                <tbody>
                    {historico.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">Nenhuma venda registrada</td>
                        </tr>
                    ) : (
                        historico.map((item, index) => (
                            <tr key={index}>
                                <td>{new Date(item.data_venda).toLocaleDateString()}</td>
                                <td>{item.nome_usuario || 'Usuário apagado'}</td>
                                <td>{item.nome_produto}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.preco_final.toFixed(2)} €</td>
                            </tr>
                        ))
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default AdminHistoricoVendas;
