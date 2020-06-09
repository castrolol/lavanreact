import React, { useState } from "react";
import Layout from "../components/Layout";
import { ServicosModule } from "./privado";
import { LoginModule } from "./publico";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';

function App() {
  return (
    <BrowserRouter>
      <ConfirmProvider>
        <SnackbarProvider maxSnack={3}>
  
          <Switch>
            <Route path="/login" component={LoginModule} />
            <Route path="/admin/servicos" component={ServicosModule} />
          </Switch>
 
        </SnackbarProvider>
      </ConfirmProvider>
    </BrowserRouter>
  );
}

export default App;
