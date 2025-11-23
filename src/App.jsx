import { useState, useEffect } from "react";
import "./App.css";
import { AddForm } from "./components/screen/form";
import { ListMedicos } from "./components/screen/list";

function App() {
  const [medicos, setMedicos] = useState([]);
  const [medicoEditado, setmedicoEditado] = useState(null);

  /* Para a lista de medicos começar inicializada */
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

  function getMedico(id) {
    return medicos.find((medicos) => medicos.id === id);
  }

  function saveMedico({ id, nome, especialidade, telefone, valorConsulta }) {
    if (id && getMedico(id)) {
      updateMedico({ id, nome, especialidade, telefone, valorConsulta });
    } else {
      setMedicos([
        ...medicos,
        {
          id: Date.now(),
          nome,
          especialidade,
          telefone,
          valorConsulta,
        },
      ]);
    }
    setmedicoEditado(null);
  }

  function removeMedico(id) {
    const newMedicos = medicos.filter((medico) => medico.id !== id);
    setMedicos(newMedicos);
  }

  function updateMedico({ id, nome, especialidade, telefone, valorConsulta }) {
    const newMedicos = [...medicos];
    const index = newMedicos.findIndex((medico) => medico.id === id);
    if (index !== -1) {
      newMedicos[index] = { id, nome, especialidade, telefone, valorConsulta };
      setMedicos(newMedicos);
    }
  }

  function editarMedico(medico) {
    setmedicoEditado(medico);
  }

  return (
    <div className="app">
      <div className="card-header">
        <h1>Cadastro de Médicos</h1>
      </div>
      <div className="card-form">
        <AddForm handleSave={saveMedico} medicoEditado={medicoEditado} />
      </div>
      <ListMedicos medicos={medicos} handleDelete={removeMedico} handleEdit={editarMedico} />
    </div>
  );
}
export default App;
