import { useState, useEffect } from "react";

export function AddForm({ handleSave, medicoEditado }) {
  const CLEAN_STATE = {
    id: null,
    nome: "",
    especialidade: "",
    telefone: "",
    valorConsulta: 0,
  };

  const [data, setData] = useState({ ...CLEAN_STATE });
  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [valorConsulta, setValorConsulta] = useState("");

  useEffect(() => {
    if (medicoEditado) {
      setData(medicoEditado);

      const telefoneInput = { value: medicoEditado.telefone };
      handleTelefoneChange({ target: telefoneInput });

      const valorInput = {
        value: (medicoEditado.valorConsulta * 100).toString(),
      };
      handleValorConsultaChange({ target: valorInput });
    } else {
      handleReset();
    }
  }, [medicoEditado]);

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Dados do formulário:", data);

    if (!data.nome || data.nome.trim() === "") {
      alert("Por favor, preencha o nome do médico corretamente");
      return;
    }

    if (!data.especialidade || data.especialidade.trim() === "") {
      alert("Por favor, preencha a especialidade corretamente");
      return;
    }

    if (!data.telefone || data.telefone.length !== 11) {
      alert("Por favor, preencha o telefone com 11 dígitos (DDD + número)");
      return;
    }

    if (!data.valorConsulta || data.valorConsulta <= 0) {
      alert("Por favor, preencha um valor de consulta válido");
      return;
    }
    if (data.valorConsulta > 9999.99) {
      alert("O valor da consulta não pode ser maior que R$ 9999,99");
      return;
    }

    try {
      handleSave(data);
      handleReset();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  }

  function handleReset() {
    setData({ ...CLEAN_STATE });
    setNome("");
    setEspecialidade("");
    setTelefone("");
    setValorConsulta("");
  }

  function handleChange({ target }) {
    const { name, value } = target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleNomeChange({ target }) {
    const textoFiltrado = target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    const textoCapitalizado = capitalizacaoAutomatica(textoFiltrado);

    setNome(textoCapitalizado);
    setData((prevData) => ({
      ...prevData,
      nome: textoCapitalizado,
    }));
  }

  function handleEspecialidadeChange({ target }) {
    const textoFiltrado = target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    const textoCapitalizado = capitalizacaoAutomatica(textoFiltrado);

    setEspecialidade(textoCapitalizado);
    setData((prevData) => ({
      ...prevData,
      especialidade: textoCapitalizado,
    }));
  }

  function capitalizacaoAutomatica(texto) {
    return texto
      .toLowerCase()
      .split(" ")
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ");
  }

  function handleTelefoneChange({ target }) {
    const valorNumerico = target.value.replace(/\D/g, "").slice(0, 11);
    let valorFormatado = valorNumerico;

    if (valorFormatado.length > 0) valorFormatado = "(" + valorFormatado;
    if (valorFormatado.length > 3)
      valorFormatado =
        valorFormatado.slice(0, 3) + ") " + valorFormatado.slice(3);
    if (valorFormatado.length > 10)
      valorFormatado =
        valorFormatado.slice(0, 10) + "-" + valorFormatado.slice(10);

    setTelefone(valorFormatado);
    setData((prevData) => ({
      ...prevData,
      telefone: valorNumerico,
    }));
  }

  function handleValorConsultaChange({ target }) {
    const valorNumerico = target.value.replace(/\D/g, "").replace(/^0+/, "");

    const valorLimitado = valorNumerico.slice(0, 6);
    let valorFormatado = "";

    if (valorLimitado.length === 0) {
      valorFormatado = "";
    } else if (valorLimitado.length === 1) {
      valorFormatado = "R$ 0,0" + valorLimitado;
    } else if (valorLimitado.length === 2) {
      valorFormatado = "R$ 0," + valorLimitado;
    } else {
      valorFormatado =
        "R$ " + valorLimitado.slice(0, -2) + "," + valorLimitado.slice(-2);
    }

    setValorConsulta(valorFormatado);
    const valorFinal =
      valorLimitado.length > 0 ? Number(valorLimitado) / 100 : 0;
    setData((prevData) => ({
      ...prevData,
      valorConsulta: valorFinal,
    }));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Dr(a)"
            value={data.nome}
            onChange={handleNomeChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="especialidade">Especialidade</label>
          <input
            type="text"
            id="especialidade"
            name="especialidade"
            value={data.especialidade}
            onChange={handleEspecialidadeChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            pattern="\([0-9]{2}\)\s[0-9]{5}-[0-9]{4}"
            placeholder="(99) 99999-9999"
            value={telefone}
            onChange={handleTelefoneChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="valorConsulta">Valor da consulta</label>
          <input
            type="text"
            id="valorConsulta"
            name="valorConsulta"
            pattern="R\$ [0-9]{1,4},[0-9]{2}"
            placeholder="R$ 0,00"
            value={valorConsulta}
            onChange={handleValorConsultaChange}
          />
        </div>
        <div>
          <input
            className="submit-button"
            type="submit"
            value="Salvar"
          />
          <button className="reset-button" type="button" onClick={handleReset}>
            Limpar
          </button>
        </div>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
