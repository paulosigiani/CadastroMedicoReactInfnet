const base = "http://localhost:3000/medicos";

async function Create({ nome, especialidade, telefone, valorConsulta }) {
  const controller = new AbortController();
  const signal = controller.signal;

  const request = fetch(base, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome,
      especialidade,
      telefone,
      valorConsulta,
    }),
    signal,
  }).catch((err) => ({
    error: err,
    aborted: err.name === "AbortError",
  }));

  setTimeout(() => {
    controller.abort();
  }, 5000);

  const response = await request;

  if (response.error) {
    console.error("Erro no create:", response.error);
    return { error: true, message: response.error.message };
  } else {
    if (!response.ok) {
      return { error: true, message: `HTTP ${response.status}: ${response.statusText}` };
    }
    const result = await response.json();
    return result;
  }
}

async function Read(id) {
  const controller = new AbortController();
  const signal = controller.signal;

  const request = fetch(id ? `${base}/${id}` : base, {
    signal,
  }).catch((err) => ({
    error: err,
    aborted: err.name === "AbortError",
  }));

  setTimeout(() => {
    controller.abort();
  }, 5000);

  const response = await request;

  if (response.error) {
    console.error("Erro no Read:", response.error);
    return { error: true, message: response.error.message };
  } else {
    console.log("Lendo", response);
    if (!response.ok) {
      return { error: true, message: `HTTP ${response.status}: ${response.statusText}` };
    }
    const result = await response.json();
    return Array.isArray(result) ? result : [result];
  }
}

async function Update({ id, nome, especialidade, telefone, valorConsulta }) {
  const controller = new AbortController();
  const signal = controller.signal;

  const request = fetch(`${base}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome,
      especialidade,
      telefone,
      valorConsulta,
    }),
    signal,
  }).catch((err) => ({
    error: err,
    aborted: err.name === "AbortError",
  }));

  setTimeout(() => {
    controller.abort();
  }, 5000);

  const response = await request;

  if (response.error) {
    console.error("Erro no update:", response.error);
    return { error: true, message: response.error.message };
  } else {
    if (!response.ok) {
      return { error: true, message: `HTTP ${response.status}: ${response.statusText}` };
    }
    const result = await response.json();
    return result;
  }
}

async function Delete(id) {
  const controller = new AbortController();
  const signal = controller.signal;

  const request = fetch(`${base}/${id}`, {
    method: "DELETE",
    signal,
  }).catch((err) => ({
    error: err,
    aborted: err.name === "AbortError",
  }));

  setTimeout(() => {
    controller.abort();
  }, 5000);

  const response = await request;

  if (response.error) {
    console.error("Erro no delete:", response.error);
    return { error: true, message: response.error.message };
  } else {
    if (!response.ok) {
      return { error: true, message: `HTTP ${response.status}: ${response.statusText}` };
    }
    return { success: true };
  }
}

export default {
  Create,
  Read,
  Update,
  Delete,
};
