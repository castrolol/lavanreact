import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ServicosPage from './ServicosPage';
import CadastroServicoPage from './CadastroServicoPage';
import Layout from '../../../components/Layout';

export default function ServicosModule() {

  return (
    <Layout>
      <Switch>
        <Route path="/admin/servicos" component={ServicosPage} />
        <Route exact path="/admin/servicos/novo" component={CadastroServicoPage} />
        <Route exact path="/admin/servicos/:id" component={CadastroServicoPage} />
      </Switch>
    </Layout>
  )
}