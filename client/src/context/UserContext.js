import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { url } from '../utils';

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
        const { data } = await axios({
          method: 'get',
          url: `${url}/api/users`,
          auth: { username, password },
        });
        console.log(data);
        localStorage.user = JSON.stringify({ ...data, username, password });
        setUser({ ...data, username, password });
      } catch (err) {
        console.log(err);
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
