import { Link } from "react-router-dom";

const AdminNavBar = () => (
  <div
    className="d-unset justify-content-between align-items-center p-3"
    style={{ backgroundColor: "#326d7c", color: "white" }}
  >
    <div className="d-flex gap-3">
      <Link to="/admintiposusers" className="btn btn-outline-light">Tipos de Users</Link>
      <Link to="/homeAdmin" className="btn btn-outline-light">Utilizadores</Link>
      <Link to="/admintiposprodutos" className="btn btn-outline-light">Tipos de Produtos</Link>
      <Link to="/adminprodutos" className="btn btn-outline-light">Produtos</Link>
      <Link to="/adminvendas" className="btn btn-outline-light">Vendas</Link>
      <Link to="/adminhistoricovendas" className="btn btn-outline-light">Histórico de Vendas</Link>
    </div>
  </div>
);

export default AdminNavBar;
