import React, { useReducer } from 'react';
import { createContext, useContext } from 'react';

type VideoContextProps = {
  playerId: string;
  isPlaying: boolean;
  isFinished: boolean;
  playerSeconds: number;
  playerDuration: number;
  playerVolume: number;
  startClip: number;
  endClip: number;
  reactions: string[];
}

type VideoProviderProps = {
  videoState: VideoContextProps;
  videoDispatch: React.Dispatch<ActionType>;
  seekPlayer: (secs: number) => void;
  setPlayerFinished: (finished: boolean) => void;
  addReaction: (reaction: string) => void;
  popReaction: () => void;
}

const INITIAL_STATE: VideoContextProps = {
  playerId: null,
  isPlaying: false,
  isFinished: false,
  playerSeconds: 0,
  playerDuration: 0,
  playerVolume: 1,
  startClip: null,
  endClip: null,
  reactions: [],
};

export const VideoContext = createContext<Partial<VideoProviderProps>>({});
export const useVideoContext = () => useContext(VideoContext);

type ActionType = {
  type: "SET_PLAYER_ID" |
    "SET_PLAYER_PLAYING" |
    "SET_PLAYER_FINISHED" |
    "SET_PLAYER_SECONDS" |
    "SET_CLIP_START" |
    "SET_CLIP_END" |
    "SET_PLAYER_DURATION" |
    "SET_PLAYER_VOLUME" |
    "SEEK_PLAYER" |
    "ADD_REACTION" |
    "POP_REACTION";
  payload?: any;
};

function getPlayer(state): HTMLVideoElement {
  return document.getElementById(state.playerId) as HTMLVideoElement;
}

function reducer(state: VideoContextProps, action: ActionType): VideoContextProps {
  let player = getPlayer(state);
  try {
    switch (action.type) {
      case "SET_PLAYER_ID":
        return { ...state, playerId: action.payload };
      case "SET_PLAYER_PLAYING":
        return { ...state, isPlaying: action.payload };
      case "SET_PLAYER_FINISHED":
        return { ...state, isFinished: action.payload };
      case "SET_PLAYER_SECONDS":
        return { ...state, playerSeconds: action.payload };
      case "SET_CLIP_START":
        return { ...state, startClip: action.payload };
      case "SET_CLIP_END":
        return { ...state, endClip: action.payload };
      case "SET_PLAYER_DURATION":
        return { ...state, playerDuration: action.payload };
      case "SET_PLAYER_VOLUME":
        if (player) player.volume = action.payload;
        return { ...state, playerVolume: action.payload };
      case "SEEK_PLAYER":
        if (player) player.currentTime = action.payload;
        return { ...state, playerSeconds: action.payload };
      case "ADD_REACTION":
        return { ...state, reactions: [...state.reactions, action.payload] };
      case "POP_REACTION":
        return { ...state, reactions: state.reactions.slice(1) };
      default:
        return state;
    }
  } catch (e) {
    console.log("FAILED TO REDUCE VIDEO CONTEXT", e);
    return { ...state };
  }
};

export const VideoContextProvider: React.FunctionComponent = ({ children }) => {

  const [videoState, videoDispatch] = useReducer(reducer, INITIAL_STATE);

  const seekPlayer = (x: number) => videoDispatch({ type: "SEEK_PLAYER", payload: x });
  const setPlayerFinished = (x: boolean) => videoDispatch({ type: "SET_PLAYER_FINISHED", payload: x });

  const addReaction = (x: string) => videoDispatch({ type: "ADD_REACTION", payload: x });
  const popReaction = () => videoDispatch({ type: "POP_REACTION" });

  const props: VideoProviderProps = {
    videoState,
    videoDispatch,
    seekPlayer,
    setPlayerFinished,
    addReaction,
    popReaction,
  };

  return (
    <VideoContext.Provider value={props}>
      {children}
    </VideoContext.Provider>
  );
};

export default useVideoContext;
