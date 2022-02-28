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
  bodyType?: "json" | "formdata";
  onCompleted?: (res: T) => void;
}

const useBaseRequest = <T>({
  path,
  credentials = null,
  defaultValue = null,
  skip = false,
  onCompleted = null,
}: BaseRequestProps<T>): EndpointHook<T> => {

  let willAuthenticate = !!credentials;
  let url = BASE_URL + path;
  let paths = willAuthenticate ? [url, credentials] : url;
  if (skip) paths = null;
  let fetcher = willAuthenticate ? authFetcher : noAuthFetcher;

  const { data: response, error, mutate, isValidating } = useSWR(paths, fetcher, {
    fallbackData: defaultValue,
    onSuccess: props => {
      if (!!onCompleted) onCompleted(props.data);
    }
  });
  const refresh = async () => mutate();
  let loading = isValidating || (!response && !error);

  if (response?.status == "success") {
    return { data: response.data as T, loading: false, error: null, refresh }
  } else {
    return { data: defaultValue, loading, error, refresh };
  }
}

export const fetchBaseRequest = <T>({
  path,
  method = "GET",
  credentials,
  username,
  password,
  body = {},
  bodyType = "json",
}: BaseRequestProps<T>): Promise<T> => {
  let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

  if (credentials) headers["Authorization"] = "Basic " + credentials;
  if (username && password) headers["Authorization"] = "Basic " + toBase64(username + ":" + password)

  let url = BASE_URL + path;
  let options: RequestInit = { method, headers };

  if (!!body && ["POST", "PUT"].includes(method)) {
    if (bodyType === "json") {
      options.body = JSON.stringify(body);
    }
    if (bodyType === "formdata") {
      options.body = body;
      delete headers['Content-Type'];
    }
  }

  return fetch(url, options).then(res => res.json())
    .then(res => {
      if (res?.status == "success") {
        return res?.data as T;
      } else {
        return null;
      }
    }).catch(res => {
      return null;
    });
}

export default useBaseRequest