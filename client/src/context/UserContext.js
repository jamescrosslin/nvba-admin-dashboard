import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { url } from '../config';

const UserContext = createContext({
  user: {},
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const { user, setUser } = useContext(UserContext);

  const signIn = useCallback(
    async (username, password) => {
      try {
        const response = await axios({
          method: 'get',
          url: `${url}/api/users`,
          auth: { username, password },
        });
        const { data } = response;
        localStorage.user = JSON.stringify({ ...data, username, password });
        setUser({ ...data, username, password });
        return response;
      } catch (err) {
        console.log(err);
        return err.response;
      }
    },
    [setUser],
  );

  const signOut = useCallback(() => {
    setUser({});
    localStorage.removeItem('user');
  }, [setUser]);

  return { user, signIn, signOut };
};
