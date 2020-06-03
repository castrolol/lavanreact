export const BASE_URL = "http://localhost:8000";

export const URLS = {
  OBTER_SERVICOS: "servicos",
  OBTER_SERVICO_DETALHE: (id) => `servicos/${id}`,
  ALTERAR_SERVICO: (id) => `servicos/${id}`,
  ADICIONAR_SERVICO: "servicos",
  DELETE_SERVICO: (id) => `servicos/${id}`,
  OBTER_SERVICOS_FILTRADO: (unidade) => `servicos?unidade=${unidade}`,
};
