import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ServicosPage from './ServicosPage';
import CadastroServicoPage from './CadastroServicoPage';
import Layout from '../../../components/Layout';
import RouteAuthorize from '../../../components/RouteAuthorize';
import { PERMISSOES } from '../../../res/enums';

export default function ServicosModule() {

  return (
    <Layout>
      <Switch>
        <RouteAuthorize permissao={PERMISSOES.SERVICOS.INCLUIR} exact path="/admin/servicos/novo" component={CadastroServicoPage} />
        <RouteAuthorize permissao={PERMISSOES.SERVICOS.ALTERAR} exact path="/admin/servicos/:id" component={CadastroServicoPage} />
        <RouteAuthorize permissao={PERMISSOES.SERVICOS.VISUALIZAR} path="/admin/servicos" component={ServicosPage} />
      </Switch>
    </Layout>
  )
}