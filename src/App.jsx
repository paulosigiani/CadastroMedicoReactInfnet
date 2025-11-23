import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import CadastrarPage from "./pages/CadastrarPage/CadastrarPage";
import ListarPage from "./pages/ListarPage/ListarPage";
import EditarPage from "./pages/EditarPage/EditarPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastrar" element={<CadastrarPage />} />
        <Route path="/cadastrar/:id" element={<CadastrarPage />} />
        <Route path="/listar" element={<ListarPage />} />
        <Route path="/editar" element={<EditarPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
