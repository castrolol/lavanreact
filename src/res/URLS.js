export const BASE_URL = "http://localhost:8000";

export const URLS = {
  OBTER_SERVICOS: "servicos",
  SALVAR_SERVICO: "servicos",
  DELETE_SERVICO: (id) => `servicos/${id}`,
  OBTER_SERVICOS_FILTRADO: (unidade) => `servicos?unidade=${unidade}`,
};
