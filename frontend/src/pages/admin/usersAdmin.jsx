import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/mainscreenAdmin.css';

const AdminHomePage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Erro ao buscar utilizadores:', err));
  }, []);

  const handleDelete = async (iduser) => {
    if (!window.confirm('Deseja remover este utilizador?')) return;

    try {
      const res = await fetch(`/api/users/${iduser}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.iduser !== iduser));
        if (selected?.iduser === iduser) setSelected(null);
      } else {
        const err = await res.json();
        alert('Erro ao remover: ' + err.error);
      }
    } catch (error) {
      alert('Erro de rede: ' + error.message);
    }
  };

  return (
    <div className="admin-container">
      {/* Barra de navegação */}
      <nav className="admin-navbar">
        <button>Utilizadores</button>
        <button onClick={() => navigate('/admin/produtos')}>Produtos</button>
        <button onClick={() => navigate('/admin/vendas')}>Vendas</button>
        <i
          className="fa fa-sign-out icon"
          onClick={() => navigate('/')}
          title="Logout"
        ></i>
      </nav>

      {/* Conteúdo principal */}
      <div className="admin-content">
        {/* Lista de utilizadores */}
        <div className="user-list">
          <h2>Lista de utilizadores:</h2>
          {users.map((user) => (
            <div
              key={user.iduser}
              className="user-item"
              onClick={() => setSelected(user)}
            >
              <i className="fa fa-user-circle" />

              <div>
                <p>{user.nome}</p>
                <p>{user.email}</p>
                <p className="tipo-user">{user.tipouser?.nome || 'Sem tipo'}</p>
              </div>

              <button
                className="edit"
                onClick={(e) => {
                  e.stopPropagation(); // Evita abrir detalhes ao clicar
                  navigate(`/admin/utilizadores/editar/${user.iduser}`);
                }}
              >
                Editar
              </button>

              <button
                className="remove"
                onClick={(e) => {
                  e.stopPropagation(); // Evita abrir detalhes ao clicar
                  handleDelete(user.iduser);
                }}
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        {/* Detalhes do utilizador selecionado */}
        <div className="user-detail">
          {selected ? (
            <>
              <div className="user-detail-header">
                <i className="fa fa-user-circle" />
              </div>
              <div className="user-detail-body">
                <p>
                  <strong>Nome:</strong> {selected.nome}
                </p>
                <p>
                  <strong>Email:</strong> {selected.email}
                </p>
                <p>
                  <strong>Morada:</strong> {selected.morada}
                </p>
                <p>
                  <strong>Tipo:</strong> {selected.tipouser?.nome || 'N/A'}
                </p>
              </div>
            </>
          ) : (
            <p>Seleciona um utilizador para ver os detalhes.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
