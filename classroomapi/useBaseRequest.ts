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
  skip?: boolean;
  path: string;
  method?: string;
  username?: string;
  password?: string;
  credentials?: string;
  defaultValue?: T;
  body?: any;
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
    return { data: response.data as T, loading: false, error: null }
  } else {
    return { data: defaultValue, loading, error };
  }
}

export const fetchBaseRequest = <T>({ path, method = "GET", credentials, username, password, body = {} }: BaseRequestProps<T>): Promise<T> => {
  let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

  if (credentials) headers["Authorization"] = "Basic " + credentials;
  if (username && password) headers["Authorization"] = "Basic " + toBase64(username + ":" + password)

  let url = BASE_URL + path;
  let options: RequestInit = { method, headers };

  if (!!body && ["POST", "PUT"].includes(method)) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options).then(res => res.json())
    .then(res => {
      if (res?.status == "success") {
        return res?.data as T;
      } else {
        return null;
      }
    }).catch(res => {
      console.log("!ERROR", res);
      return null;
    });
}

export default useBaseRequest