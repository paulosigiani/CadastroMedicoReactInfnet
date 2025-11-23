import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ListMedicos } from "../../components/screen/list";
import FiltroMedicos from "../../components/FilterMedicos/FilterMedicos";
import controller from "../../controller/controller";
import "../../App.css";
import "./ListarPage.css";

function ListarPage() {
  const [medicos, setMedicos] = useState([]);
  const [searchParams] = useSearchParams();
  const queryNome = searchParams.get("nome") || "";
  const queryEspecialidade = searchParams.get("especialidade") || "";
  const [nomeFilter, setNomeFilter] = useState(queryNome);
  const [especialidadeFilter, setEspecialidadeFilter] = useState(queryEspecialidade);

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
        <h1>Lista de Médicos</h1>
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
          showActions={false}
        />
      </div>
    </div>
  );
}

export default ListarPage;
