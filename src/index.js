import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'date-fns';
import App from "./modules/App";
import moment from 'moment'
import pt from 'moment/locale/pt-br'

moment.locale("pt-BR", pt);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
