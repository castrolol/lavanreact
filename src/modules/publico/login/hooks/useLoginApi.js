import { useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import http from '../../../../infra/http';
import jwtDecode from 'jwt-decode';
import { AppContext } from '../../../context';

export default function useLoginApi() {
 
  const  { data: dataContext } = useContext(AppContext);
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
 
        dataContext.setState({
          usuario: dadosUsuario,
          access_token: retorno.data.access_token,
          refresh_token: retorno.data.refresh_token,
        }); 
      }

    } catch (err) {

      console.log('erro', err);
    } finally {
      setCarregando(false);
    }

  }, [dataContext]);

  return [logar, carregando];
}