import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack'
import { URLS } from '../../../../res/URLS';
import http from '../../../../infra/http';



function useServicoDetalheApi(id) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [payload, setPayload] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        (async () => {
            try {

                const { data } = await http.get(URLS.OBTER_SERVICO_DETALHE(id))

                setPayload(data);

            } catch (e) {
                let mensagem = "Não não foi possivel buscar este serviço";

                if (e?.response?.message) {
                    mensagem = e?.response?.message;
                }

                enqueueSnackbar(mensagem, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                })

            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    return [payload, loading]
}

export default useServicoDetalheApi;