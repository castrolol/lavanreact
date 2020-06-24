import React, { useEffect, useCallback, useState } from 'react';
import Layout from '../../components/Layout';
import { Paper, Typography } from '@material-ui/core';
import Agenda from '../../components/Agenda';
// import eventos from '../../components/__test__/__fixtures__/eventos.json'
import { URLS } from '../../res/URLS';
import http from '../../infra/http';


export default function HomePage() {
    const [eventos, setEventos] = useState([]);
    const [eventoDetalhe, setEventoDetalhe] = useState(null);


    useEffect(() => {
        (async () => {
            const res = await http.get(URLS.OBTER_EVENTOS);

            setEventos(res.data);
        })();
    }, []);

    const buscarDetalhes = useCallback(async (detalhe) => {

        const res = await http.get(URLS.OBTER_EVENTO_DETALHE(detalhe.id));
        setEventoDetalhe(res.data);

    }, [])

    return (
        <Layout>
            <Paper style={{ margin: 32, padding: 16 }}>

                <Agenda eventos={eventos} onEventoSelecionado={buscarDetalhes} />
                {eventoDetalhe ?
                    <span data-testid="detalhe-nome">{eventoDetalhe.nome}</span>
                    : null}

            </Paper>
        </Layout>
    )
}