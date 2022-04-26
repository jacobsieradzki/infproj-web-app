import useMembership, { UseMembershipCallbackProps } from 'helper/useMembership'
import Membership from 'models/Membership'
import React, { createContext, useContext, useReducer } from 'react';
import { useStorage } from 'helper/useStorage';
import User from 'models/User'

const toBase64 = (str: string): string => Buffer.from(str).toString('base64');

export type AuthCredentialsProps = {
  username: string;
  password: string;
}

export type AuthContextProps = {
  user: User;
  credentials: string;
  memberships: Membership[];
  popup: boolean;
}

type AuthProviderProps = {
  authState: AuthContextProps;
  authDispatch: React.Dispatch<ActionType>;
  isLoggedIn: boolean;
  setUser: (x: User) => void;
  setCredentials: (x: AuthCredentialsProps) => void;
  logOut: () => void;
  setMemberships: (x: Membership[]) => void;
  membership: UseMembershipCallbackProps;
  setPopup: (x: boolean) => void;
}

const INITIAL_STATE: AuthContextProps = {
  user: null,
  credentials: null,
  memberships: [],
  popup: false,
};

export const AuthContext = createContext<Partial<AuthProviderProps>>({});
export const useAuthContext = () => useContext(AuthContext);

type ActionType = {
  type: "REHYDRATE" |
    "SET_USER" |
    "SET_CREDENTIALS" |
    "SET_MEMBERSHIPS" |
    "SET_POPUP";
  payload?: any;
};

function reducer(state: AuthContextProps, action: ActionType): AuthContextProps {
  switch (action.type) {
    case "REHYDRATE":
      return { ...state, ...action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_CREDENTIALS":
      return { ...state, credentials: action.payload };
    case "SET_MEMBERSHIPS":
      return { ...state, memberships: action.payload };
    case "SET_POPUP":
      return { ...state, popup: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FunctionComponent = ({ children }) => {

  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);

  const isLoggedIn = !!authState?.user && !!authState?.credentials;

  const setUser = (user: User) => authDispatch({ type: "SET_USER", payload: user });

  const setCredentials = (c: AuthCredentialsProps) => {
    authDispatch({ type: "SET_CREDENTIALS", payload: c ? toBase64(c.username + ":" + c.password) : null });
  }

  const setMemberships = (m: Membership[]) => authDispatch({ type: "SET_MEMBERSHIPS", payload: m });

  const setPopup = (x: boolean) => authDispatch({ type: "SET_POPUP", payload: x });

  const logOut = () => {
    setUser(null);
    setCredentials(null);
  };

  const props: AuthProviderProps = {
    authState,
    authDispatch,
    isLoggedIn,
    setUser,
    setCredentials,
    logOut,
    setMemberships,
    membership: useMembership(authState.memberships),
    setPopup,
  };

  const { rehydrated, error } = useStorage(authState, payload => authDispatch({ type: 'REHYDRATE', payload }));

  return (
    <AuthContext.Provider value={props}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;
