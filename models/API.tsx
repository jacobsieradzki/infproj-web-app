
export type EndpointHook<T> = {
  data: T;
  loading: boolean;
  error: any;
}