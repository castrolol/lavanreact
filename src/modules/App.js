import React, { useState } from "react";
import Layout from "../components/Layout";
import ServicosModule from "./servicos";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';

function App() {
  return (
    <BrowserRouter>
      <ConfirmProvider>
        <SnackbarProvider maxSnack={3}>

          <Layout>

            <Switch>
              <Route path="/servicos" component={ServicosModule} />
            </Switch>

          </Layout>
        </SnackbarProvider>
      </ConfirmProvider>
    </BrowserRouter>
  );
}

export default App;
