import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import moment from 'moment';
import useServicosApi from './hooks/useServicosApi';

const columns = [
    { title: 'Nome', field: 'nome' },
    { title: 'Medida', field: 'unidade_medida' },
    { title: 'Preço (R$)', field: 'preco', type: 'numeric' },
    {
        title: 'Estimativa Entrega',
        field: 'entrega',
        type: 'numeric',
        render({ entrega }) {
            return moment().add(entrega, 'days').format("DD/MM/YYYY")
        }
    },

]

function ServicosPage() {
    const [filtroUnidade, setFiltroUnidade] = useState(null);
    
    const [servicos, loading] = useServicosApi(filtroUnidade);


    return (
        <div style={{ padding: 16 }}>
            <ServicosFilter value={filtroUnidade} onChange={setFiltroUnidade} />

            <MaterialTable
                isLoading={loading}
                title="Serviços"
                columns={columns}
                data={servicos}
            />
        </div>
    )
}

function ServicosFilter({ value, onChange }) {
    const [unidades] = useState([
        "Peça",
        "Kg",
        "Par"
    ])



    return (
        <div style={{ padding: '8px 0' }}>
            {unidades.map(unidade => (
                <Chip
                    style={{ marginRight: 8 }}
                    onClick={() => onChange(value == unidade ? null : unidade)}
                    icon={value == unidade ? <DoneIcon /> : null}
                    color={value == unidade ? "primary" : undefined}
                    label={unidade} />
            ))}
        </div>

    )
}

export default ServicosPage;