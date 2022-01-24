import { faExpand, faPause, faPlay, faRedoAlt, faUndoAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Spacer } from 'components/GlobalStyles'
import MiniVideoSlider from 'components/Video/MiniVideoSlider'
import VideoOverlay, { VideoOverlayType } from 'components/Video/VideoOverlay'
import VideoSlider from 'components/Video/VideoSlider'
import useVideoContext from 'contexts/VideoContext'
import Resource from 'models/Resource'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import VideoStyles from './VideoComponent.style'

export const JUMP_INTERVAL = 15;

type VideoComponentProps = {
  resource: Resource;
}

type ButtonProps = { icon: IconDefinition; onClick?: Function };
const Button = ({ icon, onClick }: ButtonProps) => (
  <VideoStyles.Button onClick={onClick}>
    <FontAwesomeIcon icon={icon} />
  </VideoStyles.Button>
)

const VideoComponent: React.FC<VideoComponentProps> = ({ resource }) => {

  const { videoState, videoDispatch, seekPlayer } = useVideoContext();
  const { playerId, isPlaying, playerSeconds, playerDuration, startClip, endClip } = videoState;

  const router = useRouter();

  // --------------------------------------------------
  // Video
  // --------------------------------------------------

  const videoRef = useRef<HTMLVideoElement>(null);

  const setPlayerId = (x: string) => videoDispatch({ type: "SET_PLAYER_ID", payload: x });
  const setPlayerPlaying = (x: boolean) => videoDispatch({ type: "SET_PLAYER_PLAYING", payload: x });
  const setPlayerSeconds = (x: number) => videoDispatch({ type: "SET_PLAYER_SECONDS", payload: x });
  const setPlayerDuration = (x: number) => videoDispatch({ type: "SET_PLAYER_DURATION", payload: x });
  const setClipStart = (x: number) => videoDispatch({ type: "SET_CLIP_START", payload: x });
  const setClipEnd = (x: number) => videoDispatch({ type: "SET_CLIP_END", payload: x });

  useEffect(() => {
    let id = videoRef.current?.id;
    if (!id || playerId == id) return;

    setPlayerId(videoRef.current.id);
    videoRef.current.onplay = e => setPlayerPlaying(true);
    videoRef.current.onpause = e => setPlayerPlaying(false);
    videoRef.current.ontimeupdate = e => setPlayerSeconds(videoRef.current.currentTime)
    videoRef.current.ondurationchange = e => setPlayerDuration(videoRef.current.duration);
    videoRef.current.onwaiting = e => console.log("WAITING");
  }, [videoRef.current]);

  // --------------------------------------------------
  // Clips
  // --------------------------------------------------

  useEffect(() => {
    let queryStartClip = router.query?.start?.toString();
    let queryEndClip = router.query?.end?.toString();
    if (queryStartClip != null) setClipStart(parseInt(queryStartClip));
    if (queryEndClip != null) setClipEnd(parseInt(queryEndClip));
  }, [router]);

  useEffect(() => {
    if (startClip == null || endClip == null) return;
    let url = router.asPath.split("?")[0];
    if (startClip > 0) url += "?start=" + startClip.toString();
    if (startClip > 0 && endClip > 0) url += "&end=" + endClip.toString();
    router.replace(router.pathname, url, { shallow: true });
  }, [startClip, endClip]);

  // --------------------------------------------------
  // Actions
  // --------------------------------------------------

  const togglePlay = e => {
    isPlaying ? videoRef.current?.pause() : videoRef.current?.play();
    setPlayerPlaying(!isPlaying);
  }

  const onJumpBackward = e => {
    setOverlayState("JUMP_BACK");
    seekPlayer(Math.max(0, playerSeconds - JUMP_INTERVAL))
  };

  const onJumpForward = e => {
    setOverlayState("JUMP_FORWARD");
    seekPlayer(Math.min(playerSeconds + JUMP_INTERVAL, playerDuration));
  }

  const onFullScreen = async e => {
    await videoRef.current?.requestFullscreen();
  }

  const [overlayState, _setOverlayState] = useState<VideoOverlayType>(null);
  const [overlayInterval, setOverlayInterval] = useState(null);

  const setOverlayState = (state: VideoOverlayType) => {
    _setOverlayState(state);
    if (overlayInterval) clearInterval(overlayInterval);
    setOverlayInterval(setInterval(() => {
      setOverlayState(null);
    }, 2500));
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <VideoStyles.Container>
      <VideoStyles.VideoWrapper>
        <video id={"video-" + resource.id} ref={videoRef} autoPlay>
          <source src={resource.url} type="video/mp4" />
        </video>
        {/*<VideoOverlay state={overlayState} />*/}
        <VideoStyles.SliderOverlay>
          <VideoSlider />
        </VideoStyles.SliderOverlay>
        <MiniVideoSlider />
      </VideoStyles.VideoWrapper>
      <VideoStyles.Controls>
        <Button icon={faUndoAlt} onClick={onJumpBackward} />
        <Button icon={isPlaying ? faPause : faPlay} onClick={togglePlay} />
        <Button icon={faRedoAlt} onClick={onJumpForward} />
        <Spacer />
        <Button icon={faExpand} onClick={onFullScreen} />
      </VideoStyles.Controls>
    </VideoStyles.Container>
  )
}

export default VideoComponent