import React, { useReducer } from 'react';
import { createContext, useContext } from 'react';

const BASE_URL = "https://jake-inf-project.herokuapp.com/";

type APIContextProps = {
  test: string;
}

export type APIRequestProps = {
  queryParams?: any;
}

export type APIResponseProps<T> = {
  status: string;
  message: string;
  debug_message: string;
  data: T;
}

type APIProviderProps = {
  apiState: APIContextProps;
  apiDispatch: React.Dispatch<ActionType>;
  makeRequest: <T>(url: string, props: APIRequestProps) => Promise<APIResponseProps<T>>;
}

const INITIAL_STATE: APIContextProps = {
  test: "test"
};

export const APIContext = createContext<Partial<APIProviderProps>>({});
export const useAPIContext = () => useContext(APIContext);

type ActionType = {
  type: "SET_DONE" | "REMOVE_DONE"
  payload?: any;
};

function reducer(state: APIContextProps, action: ActionType): APIContextProps {
  switch (action.type) {
    case "SET_DONE":
      return state;

    case "REMOVE_DONE":
      return state;

    default:
      return state;
  }
};

export const APIContextProvider: React.FunctionComponent = ({ children }) => {

  const [apiState, apiDispatch] = useReducer(reducer, INITIAL_STATE);

  function makeRequest<T>(endpoint: string): Promise<APIResponseProps<T>> {
    const url = BASE_URL + endpoint
    return new Promise<APIResponseProps<T>>(function(resolve, reject) {
      fetch(url, {
        credentials: 'include'
      }).then(res => res.json())
        .then((response: APIResponseProps<T>) => {
          if (response.status == "success") {
            resolve(response);
          } else {
            reject(response.debug_message || response.message || "SERVER_ERROR");
          }
        })
        .catch(error => {
          reject(error.toString());
        });
    })
  }

  const props: APIProviderProps = {
    apiState,
    apiDispatch,
    makeRequest,
  };

  return (
    <APIContext.Provider value={props}>
      {children}
    </APIContext.Provider>
  );
};

export default useAPIContext;
