import useDiasSemana from '../useDiasSemana';
import { renderHook, act } from '@testing-library/react-hooks'
import moment from 'moment';

const dataMock = moment("2020-06-23");

test("deve retornar os dias da semana", () => {

    const { result } = renderHook(() => useDiasSemana(dataMock));

    expect(result.current.dias[0].nome).toBe("segunda");
    expect(result.current.dias[1].nome).toBe("terça");
    expect(result.current.dias[2].nome).toBe("quarta");
    expect(result.current.dias[3].nome).toBe("quinta");
    expect(result.current.dias[4].nome).toBe("sexta");
    expect(result.current.dias[5].nome).toBe("sábado");

});

test("deve trazer a semana ATUAL", () => {

    const { result } = renderHook(() => useDiasSemana(dataMock));

    expect(result.current.dias[1].dia).toBe(23);
    expect(result.current.dias[5].dia).toBe(27);

});

test("deve ser possivel avançar a semana", () => {

    const { result } = renderHook(() => useDiasSemana(dataMock));

    act(() => {
        result.current.avancarSemana();
    });

    expect(result.current.dias[1].dia).toBe(30);
    expect(result.current.dias[5].dia).toBe(4);

});

test("deve ser possivel voltar a semana", () => {
    const { result } = renderHook(() => useDiasSemana(dataMock));


    act(() => {
        result.current.voltarSemana();
    });


    expect(result.current.dias[1].dia).toBe(16);
    expect(result.current.dias[5].dia).toBe(20);



});

test("deve indicar o dia atual", () => {

    const { result } = renderHook(() => useDiasSemana(dataMock));


    expect(result.current.dias[1].isHoje).toBeTruthy();

    act(() => {
        result.current.voltarSemana();
    });

    expect(result.current.dias[1].isHoje).toBeFalsy();

});

