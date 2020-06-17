import React from 'react';
import { shallow } from 'enzyme';
import Agenda from '../Agenda';
import eventos from './__fixtures__/eventos.json';



test("O componente deve renderizar", () => {
    shallow(<Agenda eventos={[]} />);
});

test("Deve exibir os dias da semana", () => {

    const wrapper = shallow(<Agenda eventos={eventos} />);

    expect(wrapper.find({ children: "segunda" })).toHaveLength(1);
    expect(wrapper.find({ children: "terça" })).toHaveLength(1);
    expect(wrapper.find({ children: "quarta" })).toHaveLength(1);
    expect(wrapper.find({ children: "quinta" })).toHaveLength(1);
    expect(wrapper.find({ children: "sexta" })).toHaveLength(1);
    expect(wrapper.find({ children: "sábado" })).toHaveLength(1);

});

test("Deve exibir os eventos", () => {

    const wrapper = shallow(<Agenda eventos={eventos} />);

    const terca = wrapper.find({ dia: "terça" }).find("EventoItem");
    const sexta = wrapper.find({ dia: "sexta" }).find("EventoItem");

    expect(terca).toHaveLength(2);
    expect(sexta).toHaveLength(1);

});


test("Deve exibir o horario formatado", () => {

    const wrapper = shallow(<Agenda eventos={eventos} />);

    const terca = wrapper.find({ dia: "terça" }).find("EventoItem").first();
    const datatext = terca.find({ children: "08:52" })

    expect(datatext).toHaveLength(1);

});

test("Deve exibir o descrição do evento", () => {

    const wrapper = shallow(<Agenda eventos={eventos} />);

    const terca = wrapper.find({ dia: "terça" }).find("EventoItem").first();
    const desctext = terca.find({ children: "revisar os vestidos" })

    expect(desctext).toHaveLength(1);

});


test("Deve ser possivel clicar nos eventos", () => {

    const handleEventoClicado = jest.fn();

    const wrapper = shallow(<Agenda
        onEventoSelecionado={handleEventoClicado}
        eventos={eventos}
    />);

    const terca = wrapper.find({ dia: "terça" }).find("EventoItem").first();

    terca.simulate("doubleclick")

    expect(handleEventoClicado).toHaveBeenCalledWith(eventos[1].eventos[0]);


});