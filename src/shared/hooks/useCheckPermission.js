import React, { useCallback, useContext } from 'react';
import { AppContext } from '../../modules/context';

export default function useCheckPermission() {

  const { data } = useContext(AppContext);
 
  const check = useCallback((permissao) => {


    const permissoes = data?.state?.usuario?.permissions ?? [];

    const possuiPermissao = permissoes.includes(permissao);

    return possuiPermissao;

  }, [data]);

  return [check];
}


