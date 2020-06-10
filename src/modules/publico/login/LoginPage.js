import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import styles from './LoginPage.module.css';
import Button from '@material-ui/core/Button';
import useLoginForm from './hooks/useLoginForm';
import useLoginApi from './hooks/useLoginApi';

export default function LoginPage() {

  const [form, setField] = useLoginForm();
  const [logar, carregando] = useLoginApi();

  return (
    <div className={styles.root}>
      <Paper className={styles.content}>
        <div className={styles.row}>
          <TextField
            value={form.email || ""}
            type="email"
            fullWidth
            onChange={e => setField("email", e.target.value)}
            label="Email" />
        </div>
        <div className={styles.row}>
          <TextField
            value={form.senha || ""}
            type="password"
            fullWidth
            onChange={e => setField("senha", e.target.value)}
            label="Senha" />
        </div>
        <div className={styles.row}>
          <Button
            variant="contained"
            disabled={!form.email || !form.senha || carregando}
            onClick={() => logar(form.email, form.senha)}
            className={styles.buttonLogin}
            color="primary">{carregando ? 'Entrando...' : 'Entrar'}</Button>
        </div>
      </Paper>
    </div >
  )
}