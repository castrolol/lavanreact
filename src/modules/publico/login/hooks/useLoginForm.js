import { useState, useCallback, useEffect } from 'react';

function useLoginForm(initialData) {

    const [form, setForm] = useState({})
    const [pristine, setPristine] = useState({})

    useEffect(() => {
        if(!initialData) return;
        
        setForm(initialData);
    }, [initialData])

    const setField = useCallback((field, value) => {
        setForm(_form => ({ ..._form, [field]: value }))
    }, [setForm]);


    const touchField = useCallback((field) => {
        setPristine(_pristine => ({ ..._pristine, [field]: true }))
    }, [setPristine]);

    return [form, setField, pristine, touchField];
}

export default useLoginForm;