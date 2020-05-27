import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import { useHistory } from 'react-router-dom'

import useServicosApi from "./hooks/useServicosApi";


const columns = [
  { title: "Nome", field: "nome" },
  { title: "Medida", field: "unidade_medida" },
  { title: "Preço (R$)", field: "preco", type: "numeric" },
  {
    title: "Estimativa Entrega",
    field: "entrega",
    type: "numeric",
    render({ entrega }) {
      return moment().add(entrega, "days").format("DD/MM/YYYY");
    },
  },
];

const useStyles = makeStyles({
  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center'
  },
  servicosFilter: {
    display: 'flex',
    flex: 1,
    padding: "8px 0"
  },
  buttonNovo: {
    height: 30

  }

})

function ServicosPage() {
  const history = useHistory();
  const classes = useStyles();

  const [filtroUnidade, setFiltroUnidade] = useState(null);
  const [servicos, loading] = useServicosApi(filtroUnidade);

  return (
    <div style={{ padding: 16 }}>
      <div className={classes.header} >
        <ServicosFilter value={filtroUnidade} onChange={setFiltroUnidade} />

        <Button
          onClick={() => {
            history.push("/servicos/novo")
          }}
          startIcon={<AddIcon />}
          className={classes.buttonNovo}
          variant="contained"
          size="small"
          color="primary">
          Novo Serviço
        </Button>
      </div>
      <MaterialTable
        isLoading={loading}
        title="Serviços"
        columns={columns}
        data={servicos}
      />
    </div>
  );
}

function ServicosFilter({ value, onChange }) {
  const classes = useStyles();

  const [unidades] = useState(["Peça", "Kg", "Par"]);

  return (
    <div className={classes.servicosFilter} >
      {unidades.map((unidade) => (
        <Chip
          style={{ marginRight: 8 }}
          onClick={() => onChange(value == unidade ? null : unidade)}
          icon={value == unidade ? <DoneIcon /> : null}
          color={value == unidade ? "primary" : undefined}
          label={unidade}
        />
      ))}
    </div>
  );
}

export default ServicosPage;
