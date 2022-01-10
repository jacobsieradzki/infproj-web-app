import { useEffect, useState } from 'react'
import { EndpointHook } from 'models/API'
import useAPIContext, { APIRequestProps } from 'contexts/APIContext'

type BaseRequestProps<T> = {
  path: string;
  requestProps?: APIRequestProps;
  defaultValue: T;
}

const useBaseRequest = <T>({
  path,
  requestProps,
  defaultValue = null
}: BaseRequestProps<T>): EndpointHook<T> => {

  const api = useAPIContext();

  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);

    api.makeRequest<T>(path, requestProps)
      .then(response => {
        setLoading(false);
        setData(response.data || defaultValue);
      }).catch(error => {
        setLoading(false);
        setError(error);
      });

  }, [requestProps]);

  return { data, loading, error };
}

export default useBaseRequest