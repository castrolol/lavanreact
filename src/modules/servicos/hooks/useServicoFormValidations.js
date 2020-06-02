import { useState, useMemo } from 'react';

function useServicoFormValidations(form) {

    // fields
    const nome = useMemo(() => {
        if (!form.nome) return "Nome deve ser informado";
        if (form.nome.length < 3) return "Nome deve ter no minimo 3 letras"
        return null;
    }, [form.nome]);

    const unidade_medida = useMemo(() => {
        if (!form.unidade_medida) return "Medida deve ser selecionada";
        return null;
    }, [form.unidade_medida]);


    const preco = useMemo(() => {
        if (!form.preco) return "Preço deve ser informaado";
        if (!Number(form.preco)) return "Preço deve ser válido"
        if (Number(form.preco) < 1) return "Preço ser no minimo 1 real"
        return null;
    }, [form.preco]);

    const prazo = useMemo(() => {
        if (!form.prazo) return "Prazo deve ser selecionado";
        return null;
    }, [form.prazo]);



    // agrupado
    const errors = useMemo(() => ({
        nome,
        unidade_medida,
        preco,
        prazo
    }), [nome, unidade_medida, preco, prazo])

    const hasErrors = useMemo(() => {
        return (
            !!nome ||
            !!unidade_medida ||
            !!preco ||
            !!prazo
        );
    }, [nome, unidade_medida, preco, prazo]);

    return [errors, hasErrors];
}

export default useServicoFormValidations;