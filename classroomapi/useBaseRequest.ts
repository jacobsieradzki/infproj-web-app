import Log from 'helper/Logging'
import useSWR from 'swr'
import { EndpointHook } from 'models/API'
import useAPIContext, { APIRequestProps } from 'contexts/APIContext'

// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())
const BASE_URL = "https://jake-inf-project.herokuapp.com/";
const LOCAL_BASE_URL = "http://localhost:8888/";

type BaseRequestProps<T> = {
  path: string;
  defaultValue?: T;
  skip?: boolean;
  onCompleted?: (res: T) => void;
}

const useBaseRequest = <T>({
  path,
  defaultValue = null,
  skip = false,
  onCompleted = null,
}: BaseRequestProps<T>): EndpointHook<T> => {

  const api = useAPIContext();

  let url = skip ? null : (LOCAL_BASE_URL + path);

  const { data: response, error } = useSWR(url, fetcher, {
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

export default useBaseRequest