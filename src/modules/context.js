import React, { useEffect } from 'react';
import { createContext } from 'react';
import useLocalStorage from '../shared/hooks/useLocalStorage';
import { useHistory } from 'react-router-dom';

export const AppContext = createContext({
  state: {},
  setState: () => null
});

function ContextProvider({ children }) {

  const history = useHistory();
  const [state, setState] = useLocalStorage('@app');

 
  useEffect(() => {

    (() => {
      if (state?.usuario && !history.location.pathname.includes('admin')) {
        history.push('/admin/servicos');
      }

      if (!state?.usuario) {
        history.push('/login');
      }

    })();

  }, [state]);

  return (
    <AppContext.Provider
      value={
        {
          data: {
            state,
            setState
          }
        }
      }
    >
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider;