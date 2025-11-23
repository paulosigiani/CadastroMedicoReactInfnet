import { useState, useEffect } from "react";
import "./App.css";
import { AddForm } from "./components/screen/form";
import { ListMedicos } from "./components/screen/list";
import controller from "./controller/controller";

function App() {
  const [medicos, setMedicos] = useState([]);
  const [medicoEditado, setMedicoEditado] = useState(null);

 
  /* Para a lista de medicos começar inicializada */
/*
  useEffect(() => {
    setMedicos([
      {
        id: 1,
        nome: "Dr. João Pereira",
        especialidade: "Cardiologia",
        telefone: 61999999999,
        valorConsulta: 400.0,
      },
      {
        id: 2,
        nome: "Dra. Maria Silva",
        especialidade: "Dermatologia",
        telefone: 61988888888,
        valorConsulta: 350.0,
      },
      {
        id: 3,
        nome: "Dr. Carlos Souza",
        especialidade: "Ortopedia",
        telefone: 61977777777,
        valorConsulta: 450.0,
      }
    ]);
  }, []);
*/

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

  async function saveMedico({ id, nome, especialidade, telefone, valorConsulta }) {
    if (id) {
      await UpdateMedico({ id, nome, especialidade, telefone, valorConsulta });
    } else {
      await CreateMedico({ nome, especialidade, telefone, valorConsulta });
    }
    setMedicoEditado(null);
  }

  async function CreateMedico(data) {
    const result = await controller.Create(data);
    if (result.error) {
      console.log("Erro ao criar médico:", result.message);
      alert("Erro ao criar médico: " + result.message);
    } else {
      console.log("Médico criado:", result);
      await GetMedicosList();
    }
  }

  async function UpdateMedico(data) {
    const result = await controller.Update(data);
    if (result.error) {
      console.log("Erro ao atualizar médico:", result.message);
      alert("Erro ao atualizar médico: " + result.message);
    } else {
      console.log("Médico atualizado:", result);
      await GetMedicosList();
    }
  }

  async function deleteMedico(id) {
    const result = await controller.Delete(id);
    if (result.error) {
      console.log("Erro ao deletar médico:", result.message);
      alert("Erro ao deletar médico: " + result.message);
    } else {
      console.log("Médico deletado:", result);
      await GetMedicosList();
    }
  }

  async function editarMedico(id) {
    if (!id || id === null) {
      console.error("ID inválido para edição:", id);
      alert("Não é possível editar este médico. ID inválido.");
      return;
    }

    const response = await controller.Read(id);
    if (response.error) {
      console.error("Erro ao buscar médico:", response.message);
      alert("Erro ao buscar médico: " + response.message);
    } else {
      const medico = Array.isArray(response) ? response[0] : response;
      console.log("Médico carregado para edição:", medico);
      setMedicoEditado(medico);
    }
  }

  useEffect(() => {
    GetMedicosList();
  }, []);

  return (
    <div className="app">
      <div className="card-header">
        <h1>Cadastro de Médicos</h1>
      </div>
      <div className="card-form">
        <AddForm handleSave={saveMedico} medicoEditado={medicoEditado} />
      </div>
      <div>
          <ListMedicos medicos={medicos} handleDelete={deleteMedico} handleEdit={editarMedico} />
      </div>
    </div>
  );
}
export default App;
