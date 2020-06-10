import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import http from '../../../../infra/http';
import jwtDecode from 'jwt-decode';

export default function useLoginApi() {

  const history = useHistory();
  const [carregando, setCarregando] = useState();

  const logar = useCallback(async (email, senha) => {

    setCarregando(true);

    try {

      const retorno = await http.post('/token', {
        grant_type: 'password',
        username: email,
        password: senha
      });
 
      if(retorno.status === 200) {


        const dadosUsuario = jwtDecode(retorno.data.access_token);

        console.log('dadosUsuario', dadosUsuario)

        // history.push('/admin/servicos');
      }

    } catch (err) {

      console.log('erro', err);
    } finally {
      setCarregando(false);
    }

  }, []);

  return [logar, carregando];
}