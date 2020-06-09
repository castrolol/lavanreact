import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './LoginPage';

function Routes() {

  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
    </Switch>
  )
} 

export default Routes;