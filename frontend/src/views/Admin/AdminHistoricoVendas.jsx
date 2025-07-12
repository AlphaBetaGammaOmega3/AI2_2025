import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavBar from "../../components/AdminNavBar ";

const AdminHistoricoVendas = () => {
  const [historico, setHistorico] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return; // Evita chamada se não estiver autenticado

    axios.get('http://localhost:3000/api/vendasitens', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setHistorico(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar histórico de vendas:', error);
      });
  }, [token]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f5", minWidth: "1530px" }}>
      <AdminNavBar />
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
                  <td>{item.data_venda ? new Date(item.data_venda).toLocaleDateString() : '-'}</td>
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
    </div>
  );
};

export default AdminHistoricoVendas;
