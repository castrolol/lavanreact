import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import http from '../../../../infra/http';
import { URLS } from '../../../../res/URLS';


function useRemoverServico(successCallback) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const remover = useCallback(async (id) => {
        setLoading(true);

        try {
            await http.delete(URLS.DELETE_SERVICO(id))

            successCallback();

        } catch (e) {
            let mensagem = "Não foi possivel remover o serviço";
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

    }, []);

    return [remover];
}


export default useRemoverServico;