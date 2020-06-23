import { useMemo, useCallback, useState } from 'react';

export default function useDiasSemana(dataAtual) {

    const [semana, setSemana] = useState(0);

    const dias = useMemo(() => {

        const inicioSemana = dataAtual.clone().startOf("week");

        inicioSemana.add(semana, "week");

        const dias = [];

        for (var i = 0; i < 6; i++) {
            inicioSemana.add(1, "day");

            dias.push({
                nome: inicioSemana.format("dddd").split("-")[0],
                dia: Number(inicioSemana.format("DD")),
                isHoje: dataAtual.startOf("day").isSame(inicioSemana)
            });
        }

        return dias;

    }, [dataAtual, semana]);

    const avancarSemana = useCallback(() => {

        setSemana(atual => atual + 1);

    }, [setSemana]);

    const voltarSemana = useCallback(() => {

        setSemana(atual => atual - 1);

    }, [setSemana]);

    return { voltarSemana, dias, avancarSemana };
}