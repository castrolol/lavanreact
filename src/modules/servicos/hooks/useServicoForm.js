import { useState, useCallback } from 'react';

function useServicoForm() {

    const [form, setForm] = useState({})
    const [pristine, setPristine] = useState({})

    const setField = useCallback((field, value) => {
        setForm(_form => ({ ..._form, [field]: value }))
    }, [setForm]);


    const touchField = useCallback((field) => {
        setPristine(_pristine => ({ ..._pristine, [field]: true }))
    }, [setPristine]);

    return [form, setField, pristine, touchField];
}

export default useServicoForm;