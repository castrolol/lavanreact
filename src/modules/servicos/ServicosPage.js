import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import { useHistory, Route, useRouteMatch } from 'react-router-dom'
import { useConfirm } from 'material-ui-confirm';
import {formatNumber} from 'nmbr';

import AlterarPrecoModal from "./AlterarPrecoModal";
import useServicosApi from "./hooks/useServicosApi";
import useRemoverServico from "./hooks/useRemoverServico";


const columns = [
  { title: "Nome", field: "nome" },
  { title: "Medida", field: "unidade_medida" },
  {
    title: "Preço (R$)",
    field: "preco",
    type: "numeric",
    render({ preco }) {
      return "R$ " + formatNumber(preco, {
        fractionSize: 2,
        minFractionSize: 2,
        thousandDelimiter: '.',
        fractionDelimiter: ','
      });
    }
  },
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
  const match = useRouteMatch("/servicos");

  const confirm = useConfirm();
  const history = useHistory();
  const classes = useStyles();

  const [filtroUnidade, setFiltroUnidade] = useState(null);
  const [servicos, loading, reload] = useServicosApi(filtroUnidade);
  const [remover] = useRemoverServico(reload);

  useEffect(() => {
    if (!match.isExact) return;
    reload();
  }, [match.isExact])

  return (
    <>
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
          localization={{
            'header': { actions: "Ações" }
          }}
          actions={[
            {
              icon: 'attach_money',
              tooltip: 'Alterar Produto',
              onClick: (event, rowData) => history.push(`/servicos/${rowData.id}/alterar-preco`)
            },
            {
              icon: 'edit',
              tooltip: 'Alterar Produto',
              onClick: (event, rowData) => history.push(`/servicos/${rowData.id}`)
            },
            {
              icon: 'delete',
              tooltip: 'Alterar Produto',
              onClick: (event, rowData) => {

                confirm({
                  title: "Deseja realmente remover?",
                  description: (
                    <span>
                      Você deseja realmente remover
                      <strong style={{ color: '#ff3322' }}> permanentemente </strong>
                    o serviço <strong>{rowData.nome}</strong>?
                    </span>
                  ),
                  confirmationText: 'Sim, Desejo Remover',
                  cancellationText: 'Não, cancelar'
                })
                  .then(() => remover(rowData.id))
              }

            }
          ]}
          options={{
            actionsColumnIndex: -1,

          }}
        />
      </div>

      <Route path="/servicos/:id/alterar-preco" component={AlterarPrecoModal} />
    </>
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
