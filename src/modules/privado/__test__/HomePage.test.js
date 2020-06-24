import React from 'react';
import moxios from 'moxios';
import { render, act } from '@testing-library/react'
import http from '../../../infra/http';
import HomePage from '../HomePage';
import { URLS } from '../../../res/URLS';
import { getProps } from '../../../components/Agenda';

jest.mock("../../../components/Agenda")

beforeEach(() => {
    moxios.install(http);
})

afterEach(() => {
    moxios.uninstall();
})

test("Deve buscar os eventos", (done) => {

    render(<HomePage />);

    moxios.wait(() => {

        let request = moxios.requests.mostRecent()

        expect(request.url).toBe(URLS.OBTER_EVENTOS)

        done();
    });

});

test("Deve passar os eventos pra agenda", (done) => {

    const { rerender } = render(<HomePage />);
    moxios.wait(async () => {

        let request = moxios.requests.mostRecent();

        await act(async () => {
            await request.respondWith({
                status: 200,
                response: [{}, {}, {}]
            })

            rerender(<HomePage />);
        })

        expect(getProps().eventos).toHaveLength(3);

        done();
    });

});

test("Deve buscar os detalhes", (done) => {

    render(<HomePage />);

    getProps().onEventoSelecionado({ id: 99 });

    moxios.wait(async () => {
        let request = moxios.requests.mostRecent()

        expect(request.url).toBe(URLS.OBTER_EVENTO_DETALHE(99))

        done();
    });

});

test("Deve exibir os detalhes", (done) => {

    const { rerender, getByTestId } = render(<HomePage />);

    getProps().onEventoSelecionado({ id: 99 });

    moxios.wait(async () => {
        let request = moxios.requests.mostRecent()

        await act(async () => {
            await request.respondWith({
                status: 200,
                response: { nome: "Nuvem Tecnologia" }
            })

            rerender(<HomePage />);
        })

        const detalhe = getByTestId("detalhe-nome");

        expect(detalhe.textContent).toBe("Nuvem Tecnologia");

        done();
    });
});

