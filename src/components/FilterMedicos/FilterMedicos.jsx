import "./FilterMedicos.css";

function FilterMedicos({ nome, setNome, especialidade, setEspecialidade, totalFiltrados }) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="card-form filter-form">
      <h3 className="filter-title">Filtrar Médicos</h3>
      <form onSubmit={handleSubmit}>
        <div className="filter-container">
          <label className="filter-label">Filtre por Nome:</label>
          <input
            className="filter-input"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Digite o nome..."
          />
        </div>
        <div className="filter-container">
          <label className="filter-label">Filtre por Especialidade:</label>
          <input
            className="filter-input"
            type="text"
            value={especialidade}
            onChange={(event) => setEspecialidade(event.target.value)}
            placeholder="Digite a especialidade..."
          />
        </div>
      </form>
      <p className="filter-result">Encontrados: {totalFiltrados} médico(s)</p>
    </div>
  );
}

export default FilterMedicos;
