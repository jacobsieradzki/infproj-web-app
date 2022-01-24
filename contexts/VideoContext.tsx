import React, { useReducer } from 'react';
import { createContext, useContext } from 'react';

type VideoContextProps = {
  playerId: string;
  isPlaying: boolean;
  playerSeconds: number;
  startClip: number;
  endClip: number;
}

type VideoProviderProps = {
  videoState: VideoContextProps;
  videoDispatch: React.Dispatch<ActionType>;
  setPlayerPlaying: (isPlaying: boolean) => void;
  setPlayerSeconds: (secs: number) => void;
  seekPlayer: (secs: number) => void;
  setClipStart: (secs: number) => void;
  setClipEnd: (secs: number) => void;
}

const INITIAL_STATE: VideoContextProps = {
  playerId: null,
  isPlaying: false,
  playerSeconds: 0,
  startClip: null,
  endClip: null,
};

export const VideoContext = createContext<Partial<VideoProviderProps>>({});
export const useVideoContext = () => useContext(VideoContext);

type ActionType = {
  type: "SET_PLAYER_ID" | "SET_PLAYER_PLAYING" | "SET_PLAYER_SECONDS" | "SEEK_PLAYER" | "SET_CLIP_START" | "SET_CLIP_END" | "ACTION"
  payload?: any;
};

function reducer(state: VideoContextProps, action: ActionType): VideoContextProps {
  switch (action.type) {
    case 'ACTION':
      break;
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
    case "SEEK_PLAYER":
      let element = document.getElementById(state.playerId) as HTMLVideoElement;
      if (element) {
        element.currentTime = action.payload;
      }
      return { ...state, playerSeconds: action.payload };

    default:
      return state;
  }
};

export const VideoContextProvider: React.FunctionComponent = ({ children }) => {

  const [videoState, videoDispatch] = useReducer(reducer, INITIAL_STATE);

  const setPlayerPlaying = (x: boolean) => videoDispatch({ type: "SET_PLAYER_PLAYING", payload: x });
  const setPlayerSeconds = (x: number) => videoDispatch({ type: "SET_PLAYER_SECONDS", payload: x });
  const seekPlayer = (x: number) => videoDispatch({ type: "SEEK_PLAYER", payload: x });
  const setClipStart = (x: number) => videoDispatch({ type: "SET_CLIP_START", payload: x });
  const setClipEnd = (x: number) => videoDispatch({ type: "SET_CLIP_END", payload: x });

  const props: VideoProviderProps = {
    videoState,
    videoDispatch,
    setPlayerPlaying,
    setPlayerSeconds,
    seekPlayer,
    setClipStart,
    setClipEnd,
  };

  return (
    <VideoContext.Provider value={props}>
      {children}
    </VideoContext.Provider>
  );
};

export default useVideoContext;
