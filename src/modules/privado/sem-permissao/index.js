import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SemPermissaoPage from './SemPermissaoPage';

function Routes() {

  return (
    <Switch>
      <Route path="/admin/sem-permissao" component={SemPermissaoPage} />
    </Switch>
  )
}

export default Routes;