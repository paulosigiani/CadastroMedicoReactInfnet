import { Link } from "react-router-dom";
import "../../App.css";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="app not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Página não encontrada</h2>
      <p className="not-found-text">A página que você está procurando não existe.</p>
      <Link to="/">
        <button className="submit-button not-found-button">Voltar ao Menu</button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
