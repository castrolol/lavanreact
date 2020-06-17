import React from 'react';
import Layout from '../../components/Layout';
import { Paper, Typography } from '@material-ui/core';
import Agenda from '../../components/Agenda';
import eventos from '../../components/__test__/__fixtures__/eventos.json'


export default function HomePage() {
    return (
        <Layout>
            <Paper style={{ margin: 32, padding: 16 }}>

                <Agenda eventos={eventos} />

            </Paper>
        </Layout>
    )
}