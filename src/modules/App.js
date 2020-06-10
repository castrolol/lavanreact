import React, { useState } from "react";
import Layout from "../components/Layout";
import { ServicosModule, SemPermissaoModule } from "./privado";
import { LoginModule } from "./publico";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';
import ContextProvider from './context';

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <ConfirmProvider>
          <SnackbarProvider maxSnack={3}>

            <Switch>
              <Route path="/login" component={LoginModule} />
              <Route path="/admin/servicos" component={ServicosModule} />
              <Route path="/admin/sem-permissao" component={SemPermissaoModule} />
            </Switch>

          </SnackbarProvider>
        </ConfirmProvider>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
