import Log from 'helper/Logging'
import useSWR from 'swr'
import { EndpointHook } from 'models/API'
import useAPIContext from 'contexts/APIContext'

const toBase64 = (str: string): string => Buffer.from(str).toString('base64');
// @ts-ignore
const noAuthFetcher = (url) => fetch(url).then(res => res.json());
// @ts-ignore
const authFetcher = (url, username, password) => fetch({ headers: { 'Authorization': 'Basic ' + toBase64(username + ":" + password) } })
  .then(res => res.json())

export const BASE_URL = "http://localhost:8888/";
// export const BASE_URL = "https://jake-inf-project.herokuapp.com/";

type BaseRequestProps<T> = {
  path: string;
  username?: string;
  password?: string;
  credentials?: string;
  defaultValue?: T;
  skip?: boolean;
  onCompleted?: (res: T) => void;
}

const useBaseRequest = <T>({
  path,
  credentials = null,
  defaultValue = null,
  skip = false,
  onCompleted = null,
}: BaseRequestProps<T>): EndpointHook<T> => {

  const api = useAPIContext();

  let willAuthenticate = !!credentials;
  let url = BASE_URL + path;
  let paths = willAuthenticate ? [url, credentials] : url;
  if (skip) paths = null;
  let fetcher = willAuthenticate ? authFetcher : noAuthFetcher;

  const { data: response, error } = useSWR(paths, fetcher, {
    fallbackData: defaultValue,
    onSuccess: props => {
      if (!!onCompleted) onCompleted(props.data);
    }
  });
  let loading = !response && !error;

  if (response?.status == "success") {
    let data = response.data as T;
    Log.debug('API', "useBaseRequest", { data, loading, error });
    return {
      data: response.data as T,
      loading: false,
      error: null,
    }
  } else {
    Log.debug('API', "useBaseRequest", { response, loading, error });
    return {
      data: defaultValue,
      loading,
      error
    };
  }
}

export const fetchBaseRequest = <T>({ path, credentials, username, password }: BaseRequestProps<T>): Promise<T> => {
  let headers = {};
  if (credentials) headers["Authorization"] = "Basic " + credentials;
  if (username && password) headers["Authorization"] = "Basic " + toBase64(username + ":" + password)

  return fetch(BASE_URL + path, { headers })
    .then(res => res.json())
    .then(res => {
      if (res?.status == "success") {
        return res?.data as T;
      } else {
        return null;
      }
    }
  )
}

export default useBaseRequest