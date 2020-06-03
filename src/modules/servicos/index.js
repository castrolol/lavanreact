import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ServicosPage from './ServicosPage';
import CadastroServicoPage from './CadastroServicoPage';

export default function ServicosModule() {



    return (
        <Switch>
            <Route exact path="/servicos" component={ServicosPage} />
            <Route path="/servicos/novo" component={CadastroServicoPage} />
            <Route path="/servicos/:id" component={CadastroServicoPage} />
        </Switch>
    )
}