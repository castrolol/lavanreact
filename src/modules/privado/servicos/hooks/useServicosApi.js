import { useEffect, useState, useCallback } from "react";
import http from "../../../../infra/http";
import { URLS } from "../../../../res/URLS";

function useServicoApi(unidade) {
  const [payload, setPayload] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServicos = useCallback(async () => {
    setLoading(true);
    try {
      let url = URLS.OBTER_SERVICOS;
      if (unidade) url = URLS.OBTER_SERVICOS_FILTRADO(unidade);

      const { data } = await http.get(url);
      setPayload(data);
    } catch (e) {
      //TODO: Tratar esse erro urgente...
      alert("Não foi possivel buscar os serviços");
    } finally {
      setLoading(false);
    }
  }, [unidade]);

  useEffect(() => {
    fetchServicos();
  }, [unidade]);

  return [payload, loading, fetchServicos];
}

export default useServicoApi;
