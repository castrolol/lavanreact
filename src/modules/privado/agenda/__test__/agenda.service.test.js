import { agruparEventos } from '../agenda.service';
import eventos from './__fixtures__/datas.json';

import moment from 'moment';


const dataMock = moment("2020-06-16");

test("Deve retornar apenas 6 dias", () => {

    const result = agruparEventos(eventos, dataMock);

    expect(result).toHaveLength(6);

});

test("deve retornar o dia, mesmo sem eventos", () => {

    const result = agruparEventos(eventos, dataMock);

    expect(result[0].dia).toEqual("segunda");
    expect(result[1].dia).toEqual("terça");
    expect(result[2].dia).toEqual("quarta");
    expect(result[3].dia).toEqual("quinta");
    expect(result[4].dia).toEqual("sexta");
    expect(result[5].dia).toEqual("sábado");

})

test("Deve agrupar os eventos por dia", () => {

    const result = agruparEventos(eventos, dataMock);

    expect(result[0].eventos).toHaveLength(0);
    expect(result[1].eventos).toHaveLength(2);
    expect(result[2].eventos).toHaveLength(0);
    expect(result[3].eventos).toHaveLength(0);
    expect(result[4].eventos).toHaveLength(1);
    expect(result[5].eventos).toHaveLength(0);
})


