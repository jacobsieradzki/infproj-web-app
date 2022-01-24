import React, { useReducer } from 'react';
import { createContext, useContext } from 'react';

type VideoContextProps = {
  playerId: string;
  isPlaying: boolean;
  playerSeconds: number;
  playerDuration: number;
  startClip: number;
  endClip: number;
}

type VideoProviderProps = {
  videoState: VideoContextProps;
  videoDispatch: React.Dispatch<ActionType>;
  seekPlayer: (secs: number) => void;
}

const INITIAL_STATE: VideoContextProps = {
  playerId: null,
  isPlaying: false,
  playerSeconds: 0,
  playerDuration: 0,
  startClip: null,
  endClip: null,
};

export const VideoContext = createContext<Partial<VideoProviderProps>>({});
export const useVideoContext = () => useContext(VideoContext);

type ActionType = {
  type: "SET_PLAYER_ID" |
    "SET_PLAYER_PLAYING" |
    "SET_PLAYER_SECONDS" |
    "SET_CLIP_START" |
    "SET_CLIP_END" |
    "SET_PLAYER_DURATION" |
    "SEEK_PLAYER";
  payload?: any;
};

function getPlayer(state): HTMLVideoElement {
  return document.getElementById(state.playerId) as HTMLVideoElement;
}

function reducer(state: VideoContextProps, action: ActionType): VideoContextProps {
  let player = getPlayer(state);
  switch (action.type) {
    case "SET_PLAYER_ID":
      return { ...state, playerId: action.payload };
    case "SET_PLAYER_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_PLAYER_SECONDS":
      return { ...state, playerSeconds: action.payload };
    case "SET_CLIP_START":
      return { ...state, startClip: action.payload };
    case "SET_CLIP_END":
      return { ...state, endClip: action.payload };
    case "SET_PLAYER_DURATION":
      return { ...state, playerDuration: action.payload };
    case "SEEK_PLAYER":
      if (player) player.currentTime = action.payload;
      return { ...state, playerSeconds: action.payload };
    default:
      return state;
  }
};

export const VideoContextProvider: React.FunctionComponent = ({ children }) => {

  const [videoState, videoDispatch] = useReducer(reducer, INITIAL_STATE);

  const seekPlayer = (x: number) => videoDispatch({ type: "SEEK_PLAYER", payload: x });

  const props: VideoProviderProps = {
    videoState,
    videoDispatch,
    seekPlayer,
  };

  return (
    <VideoContext.Provider value={props}>
      {children}
    </VideoContext.Provider>
  );
};

export default useVideoContext;
