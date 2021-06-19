import { useState } from 'react';
import { url } from '../utils';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

export function useFetchData(initialValues) {
  const { user } = useUserContext();
  const [{ isLoading, data, error }, setState] = useState(initialValues);

  async function fetchData({ apiRoute, method, isAuthRequired, requestBody, transformFunction }) {
    try {
      setState({ isLoading: true });

      const requestOptions = {
        method,
        url: `${url}${apiRoute}`,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (requestBody) requestOptions.data = requestBody;
      if (isAuthRequired)
        requestOptions.auth = { username: user.username, password: user.password };

      const { data } = await axios(requestOptions);
      console.log(data);

      if (transformFunction) transformFunction(data);

      setState({ data });
      setState({ isLoading: false });
    } catch (err) {
      console.dir(err);
      setState({ error: err });
    }
  }

  return { isLoading, data, error, fetchData };
}
