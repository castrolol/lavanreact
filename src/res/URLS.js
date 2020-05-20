export const BASE_URL = "http://localhost:5000";


export const URLS = {
    OBTER_SERVICOS: "servicos",
    OBTER_SERVICOS_FILTRADO: (unidade) => `servicos?unidade=${unidade}`,
};