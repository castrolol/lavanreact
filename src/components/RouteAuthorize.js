import React from 'react';
import { useHistory, Route } from 'react-router-dom';
import useCheckPermission from '../shared/hooks/useCheckPermission';

function RouteAuthorize({ permissao, ...props }) {

  const history = useHistory();
  const [check] = useCheckPermission();

  if (permissao) {

    const possuiPermissao = check(permissao);

    if (!possuiPermissao) {
      history.push('/admin/sem-permissao');

      return null;
    }
  }

  return (
    <Route {...props} />
  )
}

export default RouteAuthorize;
