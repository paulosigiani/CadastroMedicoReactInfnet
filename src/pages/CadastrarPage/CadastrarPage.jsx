import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AddForm } from "../../components/screen/form";
import controller from "../../controller/controller";
import "../../App.css";
import "./CadastrarPage.css";

function CadastrarPage() {
  const [medicoEditado, setMedicoEditado] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const { id } = useParams();

  async function saveMedico({
    id,
    nome,
    especialidade,
    telefone,
    valorConsulta,
  }) {
    if (id) {
      await UpdateMedico({ id, nome, especialidade, telefone, valorConsulta });
    } else {
      await CreateMedico({ nome, especialidade, telefone, valorConsulta });
    }

    const headerHeight = document.querySelector('.card-header').offsetHeight;
    window.scrollTo(0, headerHeight + 10);
  }

  async function CreateMedico(data) {
    const result = await controller.Create(data);
    if (result.error) {
      setMensagem("Erro ao criar médico: " + result.message);
    } else {
      console.log("Médico criado:", result);
      setMensagem("Médico cadastrado com sucesso!");
      /* setTimeout(() => setMensagem(""), 3000); */
    }
  }

  useEffect(() => {
    setMensagem("");
  }, [medicoEditado]);

  async function UpdateMedico(data) {
    const result = await controller.Update(data);
    if (result.error) {
      setMensagem("Erro ao atualizar médico: " + result.message);
    } else {
      console.log("Médico atualizado:", result);
      setMensagem("Médico atualizado com sucesso!");
      /* setTimeout(() => setMensagem(""), 3000); */
    }
  }

  useEffect(() => {
    if (id) {
      async function carregarMedico() {
        const response = await controller.Read(id);
        if (response.error) {
          alert("Erro ao buscar médico: " + response.message);
        } else {
          const medico = Array.isArray(response) ? response[0] : response;
          setMedicoEditado(medico);
        }
      }
      carregarMedico();
    }
  }, [id]);

  return (
    <div className="app">
      <div className="card-header">
        {/* 
            Se tiver o id preencheido quer dizer que está editando.
            Nesse caso, exibe botões diferentes do cadastro
        */}
        <h1>{id ? "Editar Médico" : "Cadastrar Médico"}</h1>
        <div className="header-buttons">
          <Link to={id ? "/editar" : "/"}>
            <button className="submit-button">{id ? "Voltar à Lista" : "Voltar ao Menu"}</button>
          </Link>
        </div>
      </div>
      {mensagem && (
        <div
          className={`card-form ${
            mensagem.includes("sucesso") ? "mensagem-sucesso" : "mensagem-erro"
          }`}
        >
          {mensagem}
        </div>
      )}
      <div className="card-form">
        <AddForm
          handleSave={saveMedico}
          medicoEditado={medicoEditado}
          onChangeForm={() => setMensagem("")}
        />
      </div>
    </div>
  );
}

export default CadastrarPage;
