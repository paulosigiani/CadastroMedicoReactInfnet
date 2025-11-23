import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListMedicos } from "../../components/screen/list";
import FiltroMedicos from "../../components/FilterMedicos/FilterMedicos";
import controller from "../../controller/controller";
import "../../App.css";
import "./EditarPage.css";

function EditarPage() {
  const [medicos, setMedicos] = useState([]);
  const [nomeFilter, setNomeFilter] = useState("");
  const [especialidadeFilter, setEspecialidadeFilter] = useState("");

  async function GetMedicosList() {
    const response = await controller.Read();
    if (response.error) {
      setMedicos([]);
      console.error(response.message);
      alert("Erro ao carregar lista de médicos: " + response.message);
    } else {
      setMedicos(response);
    }
  }

  async function deleteMedico(id) {
    if (!window.confirm("Tem certeza que deseja deletar este médico?")) {
      return;
    }
    const result = await controller.Delete(id);
    if (result.error) {
      console.log("Erro ao deletar médico:", result.message);
      alert("Erro ao deletar médico: " + result.message);
    } else {
      console.log("Médico deletado:", result);
      await GetMedicosList();
    }
  }

  useEffect(() => {
    GetMedicosList();
  }, []);

  const medicosFiltrados = medicos.filter((medico) => {
    const nomeFound = medico.nome.toLowerCase().includes(nomeFilter.toLowerCase());
    const especialidadeFound = medico.especialidade
      .toLowerCase()
      .includes(especialidadeFilter.toLowerCase());
    return nomeFound && especialidadeFound;
  });

  return (
    <div className="app">
      <div className="card-header">
        <h1>Editar/Deletar Médicos</h1>
        <div className="header-buttons">
          <Link to="/">
            <button className="submit-button">Voltar ao Menu</button>
          </Link>
        </div>
      </div>

      <FiltroMedicos
        nome={nomeFilter}
        setNome={setNomeFilter}
        especialidade={especialidadeFilter}
        setEspecialidade={setEspecialidadeFilter}
        totalFiltrados={medicosFiltrados.length}
      />

      <div>
        <ListMedicos
          medicos={medicosFiltrados}
          handleDelete={deleteMedico}
          handleEdit={(id) => (window.location.href = `/cadastrar/${id}`)}
          showActions={true}
        />
      </div>
    </div>
  );
}

export default EditarPage;
