import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import InputAdornment from '@material-ui/core/InputAdornment';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useServicoDetalheApi from './hooks/useServicoDetalheApi';
import useServicoSave from './hooks/useServicoSave';
import { TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack'

export default function AlterarPrecoModal() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const { id } = useParams();
    const history = useHistory();
    const [error, setError] = useState(null);
    const [preco, setPreco] = useState("0");

    const [servico, loading] = useServicoDetalheApi(id);

    useEffect(() => {
        if (!servico) return;

        setPreco(servico?.preco);
    }, [servico])



    const [save, submitting] = useServicoSave(id, { ...servico, preco }, false, (err) => {

        if (err) {
            return;
        }


        enqueueSnackbar("Preço alterado com sucesso!!", {
            variant: "success",
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        })
        history.replace("/servicos")

    });

    const handleSave = useCallback(async () => {

        const numberPreco = Number(preco);
        if (!numberPreco || numberPreco <= 0) {
            return;
        }

        await save();

    }, [save, preco]);

    return (
        <Dialog open>
            <DialogTitle>Alterar Preço de {servico?.nome}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <TextField
                        error={error}
                        helperText={error || null}
                        value={preco || 0}
                        onChange={e => {
                            const numberPreco = Number(e.target.value);
                            if (numberPreco > 0) {
                                setError(null);
                            }
                            setPreco(e.target.value)

                        }}
                        onBlur={() => {
                            const numberPreco = Number(preco);
                            if (!numberPreco || numberPreco <= 0) {
                                setError("O preço deve ser maior que 0");
                            }
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        }}
                        type="number"
                        label="Preço" />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => history.replace('/servicos')} >
                    Cancelar
                </Button>
                <Button onClick={handleSave} color="primary" autoFocus>
                    Alterar Preço
                </Button>
            </DialogActions>
        </Dialog>
    )

}
