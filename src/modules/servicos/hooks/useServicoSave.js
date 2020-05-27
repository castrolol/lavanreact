import { useState, useCallback } from 'react';
import http from '../../../infra/http';
import { URLS } from '../../../res/URLS';
import { useSnackbar } from 'notistack';



export default function useServicoSave(data, hasErrors, callback) {
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const save = useCallback(async () => {
        if (hasErrors) {
            callback(true);
            return;
        }

        setLoading(true);

        try {
            await http.post(URLS.SALVAR_SERVICO, data);
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