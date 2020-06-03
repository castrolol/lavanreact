import { useState, useCallback } from 'react';
import http from '../../../infra/http';
import { URLS } from '../../../res/URLS';
import { useSnackbar } from 'notistack';



export default function useServicoSave(id, data, hasErrors, callback) {
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const save = useCallback(async () => {
        if (hasErrors) {
            callback(true);
            return;
        }

        setLoading(true);

        try {
            if (id) { // representa uma edição!...
                await http.put(URLS.ALTERAR_SERVICO(id), data);
            } else { // representa uma crianção
                await http.post(URLS.ADICIONAR_SERVICO, data);
            }
            callback(null, true);
        } catch (err) {
            // notifcar?
            //alert("Não foi possivel salvar...")
            enqueueSnackbar("Não foi possivel salvar...", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            })
        } finally {
            setLoading(false);
        }
    }, [data, hasErrors, callback]);


    return [save, loading];
}