import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import moment from 'moment';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import styles from './CadastroServicoPage.module.css';
import useServicoForm from './hooks/useServicoForm';
import useServicoFormValidations from './hooks/useServicoFormValidations';
import useServicoSave from './hooks/useServicoSave';
import { useSnackbar } from 'notistack';


export default function CadastroServicoPage() {
    const history = useHistory();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [form, setField, pristine, touchField] = useServicoForm();
    const [errors, hasErrors] = useServicoFormValidations(form);

    const [save, loading, error] = useServicoSave(form, hasErrors, (error, success) => {
        if (error) {
            for (let field in errors) {
                touchField(field)
            }
            return;
        }


        enqueueSnackbar("Salvo com sucesso!", {
            variant: "success",
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        })
        history.replace("/servicos")
        // notifique!...
        // redirecione!!
    });

    return (
        <div className={styles.root}>
            <div className={styles.header}>

                <Typography variant="h5" >Cadastro de Serviço</Typography>
                <Button
                    onClick={save}
                    startIcon={<SaveIcon />}
                    variant="contained"
                    size="small"
                    color="primary">
                    Salvar
        </Button>
            </div>
            <Paper className={styles.content} >
                <div className={styles.row}>
                    <TextField
                        error={pristine.nome && errors.nome}
                        helperText={pristine.nome ? errors.nome : null}
                        value={form.nome}
                        onBlur={() => touchField("nome")}
                        onChange={e => setField("nome", e.target.value)}
                        label="Nome do Serviço" />
                </div>

                <div className={styles.row}>
                    <TextField
                        error={pristine.medida && errors.medida}
                        helperText={pristine.medida ? errors.medida : null}
                        onBlur={() => touchField("medida")}
                        value={form.medida}
                        onChange={e => setField("medida", e.target.value)}
                        className={styles.select}
                        select
                        label="Medida"  >
                        <MenuItem value="Peça" >Peça</MenuItem>
                        <MenuItem value="Kg" >Kg</MenuItem>
                        <MenuItem value="Par" >Par</MenuItem>
                    </TextField>
                    <TextField
                        error={pristine.preco && errors.preco}
                        helperText={pristine.preco ? errors.preco : null}
                        value={form.preco}
                        onChange={e => setField("preco", (e.target.value))}
                        onBlur={() => touchField("preco")}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        }}
                        type="number"
                        label="Preço" />
                </div>

                <div>
                    <FormLabel component="legend">Prazo de entrega</FormLabel>

                    <RadioGroup
                        value={form.prazo}
                        onChange={e => setField("prazo", e.target.value)}

                        error={pristine.prazo && errors.prazo}
                        helperText={pristine.prazo ? errors.prazo : null}

                        style={{ flexDirection: 'row' }}
                        aria-label="gender"
                        name="gender1"  >
                        <FormControlLabel value="1" control={<Radio />} label="1 Dia" />
                        <FormControlLabel value="2" control={<Radio />} label="2 Dias" />
                        <FormControlLabel value="3" control={<Radio />} label="3 Dias" />
                        <FormControlLabel value="4" control={<Radio />} label="4 Dias" />
                        <FormControlLabel value="5" control={<Radio />} label="5 Dias" />
                    </RadioGroup>
                </div>

                <div>
                    <TextField
                        value={form.dataCriacao}
                        onChange={e => setField("dataCriacao", e.target.value)}

                        id="date"
                        label="Data do Cadastro"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
            </Paper>

        </div >
    )
}