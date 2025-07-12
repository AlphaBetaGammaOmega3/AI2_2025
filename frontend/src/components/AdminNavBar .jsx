import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Importa o ícone

const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center p-3"
      style={{ backgroundColor: "#326d7c", color: "white" }}
    >
      {/* Botões de navegação (esquerda) */}
      <div className="d-flex gap-3">
        <Link to="/admintiposusers" className="btn btn-outline-light">Tipos de Utilizadores</Link>
        <Link to="/homeAdmin" className="btn btn-outline-light">Utilizadores</Link>
        <Link to="/admintiposprodutos" className="btn btn-outline-light">Tipos de Produtos</Link>
        <Link to="/adminprodutos" className="btn btn-outline-light">Produtos</Link>
        <Link to="/adminvendas" className="btn btn-outline-light">Vendas</Link>
      </div>

      {/* Botão de logout com ícone (direita) */}
      <button
        className="btn text-white fs-4"
        onClick={handleLogout}
        title="Logout"
      >
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default AdminNavBar;
