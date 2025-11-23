import { Link } from "react-router-dom";
import "../../App.css";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="app">
      <div className="card-header">
        <h1>Sistema de Cadastro de Médicos</h1>
      </div>
      <div className="card-form home-content">
        <h2 className="home-title">Bem-vindo!</h2>
        <p className="home-description">Escolha uma opção abaixo:</p>
        <div className="menu-buttons">
          <Link to="/cadastrar">
            <button className="submit-button">Cadastrar Médico</button>
          </Link>
          <Link to="/listar">
            <button className="submit-button">Listar Médicos</button>
          </Link>
          <Link to="/editar">
            <button className="submit-button">Editar Médicos</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
