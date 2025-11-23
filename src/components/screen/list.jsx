export function ListMedicos({
  medicos = [],
  handleDelete,
  handleEdit,
  showActions = false,
}) {
  if (medicos.length === 0) return null;

  return (
    <>
      <div className="card-header">
        <h2>Médicos Cadastrados:</h2>
      </div>
      <div className="list">
        {medicos?.map((medico) => (
          <Item
            key={medico.id}
            {...medico}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            showActions={showActions}
          />
        ))}
      </div>
    </>
  );
}

function Item({
  id,
  nome,
  especialidade,
  telefone,
  valorConsulta,
  handleDelete,
  handleEdit,
  showActions,
}) {
  function onDelete() {
    handleDelete?.(id);
  }

  function onEdit() {
    handleEdit?.(id);
    window.scrollTo(0, 0);
  }

  function formatarTelefone(telefone) {
    const apenasNumeros = String(telefone || "").replace(/\D/g, "");
    if (apenasNumeros.length === 11) {
      return (
        "(" +
        apenasNumeros.slice(0, 2) +
        ") " +
        apenasNumeros.slice(2, 7) +
        "-" +
        apenasNumeros.slice(7)
      );
    }
    return telefone ?? "";
  }

  return (
    <div className="item">
      <div className="item-info">
        <h3 className="item-nome">{nome}</h3>
        <div className="item-details">
          <span className="item-especialidade">{especialidade}</span>
          <span className="item-telefone">
            {telefone ? formatarTelefone(telefone) : "N/A"}
          </span>
          <span className="item-valor">
            {valorConsulta ? `R$ ${valorConsulta.toFixed(2)}` : "N/A"}
          </span>
        </div>
      </div>

      {showActions && (
        <div className="item-actions">
          <button className="edit-button" onClick={onEdit}>
            Editar
          </button>
          <button className="delete-button" onClick={onDelete}>
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}
