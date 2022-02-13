import React, { useEffect, useRef, useState } from 'react'
import Loader from 'components/Loader/Loader'
import Slider from 'react-slider'
import { useRouter } from 'next/router'
import { faExpand, faPause, faPlay, faVolumeMute, faVolumeUp, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import { Spacer } from 'components/GlobalStyles'
import MiniVideoSlider from 'components/Video/MiniVideoSlider'
import VideoOverlay, { VideoOverlayType } from 'components/Video/VideoOverlay'
import VideoSlider from 'components/Video/VideoSlider'
import useVideoContext from 'contexts/VideoContext'
import Resource from 'models/Resource'
import VideoStyles, { SliderStyle } from './VideoComponent.style'

export const JUMP_INTERVAL = 10;

type VideoComponentProps = {
  resource: Resource;
}

type ButtonProps = { active?: boolean; icon?: IconDefinition; iconElement?: React.ReactElement; onClick?: Function; label?: React.ReactElement; className?: string; };
const Button = ({ active = false, icon, iconElement, onClick, label, className = "" }: ButtonProps) => (
  <VideoStyles.Button onClick={onClick} className={className + (label ? " tooltip" : "") + (active ? " active" : "")}>
    <span className={label ? "tooltip-text" : ""}>{label}</span>
    {icon && <FontAwesomeIcon icon={icon} />}
    {iconElement || <></>}
  </VideoStyles.Button>
)

const VideoComponent: React.FC<VideoComponentProps> = ({ resource }) => {

  const { videoState, videoDispatch, seekPlayer } = useVideoContext();
  const { playerId, isPlaying, playerSeconds, playerDuration, playerVolume, startClip, endClip } = videoState;

  const [pipEnabled, setPipEnabled] = useState(false);
  const [buffering, setBuffering] = useState(false);

  const router = useRouter();

  // --------------------------------------------------
  // Video
  // --------------------------------------------------

  const videoRef = useRef<HTMLVideoElement>(null);

  const setPlayerId = (x: string) => videoDispatch({ type: "SET_PLAYER_ID", payload: x });
  const setPlayerPlaying = (x: boolean) => {
    videoDispatch({ type: "SET_PLAYER_PLAYING", payload: x });
    setBuffering(false);
  };
  const setPlayerSeconds = (x: number) => videoDispatch({ type: "SET_PLAYER_SECONDS", payload: x });
  const setPlayerDuration = (x: number) => videoDispatch({ type: "SET_PLAYER_DURATION", payload: x });
  const setPlayerVolume = (x: number) => videoDispatch({ type: "SET_PLAYER_VOLUME", payload: x });
  const setClipStart = (x: number) => videoDispatch({ type: "SET_CLIP_START", payload: x });
  const setClipEnd = (x: number) => videoDispatch({ type: "SET_CLIP_END", payload: x });

  useEffect(() => {
    if (!videoRef.current) return;
    setPlayerId(videoRef.current.id);
    videoRef.current.onplay = e => setPlayerPlaying(true);
    videoRef.current.onpause = e => setPlayerPlaying(false);
    videoRef.current.ontimeupdate = e => setPlayerSeconds(videoRef.current.currentTime)
    videoRef.current.ondurationchange = e => setPlayerDuration(videoRef.current.duration);
    videoRef.current.onvolumechange = e => setPlayerVolume(videoRef.current.volume);
    setPlayerVolume(videoRef.current.volume);
    videoRef.current.onwaiting = e => setBuffering(true);
    setPipEnabled(!!videoRef.current.requestPictureInPicture);
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

  const [volumeExpanded, setVolumeExpanded] = useState(false);

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

  const onVolumeClick = e => setVolumeExpanded(!volumeExpanded);
  const onMuteClick = e => setPlayerVolume(playerVolume == 0 ? 1 : 0);
  const onFullScreen = async e => await videoRef.current?.requestFullscreen();
  const onPictureInPicture = async e => await videoRef.current?.requestPictureInPicture();

  const [overlayState, _setOverlayState] = useState<VideoOverlayType>(null);
  const [overlayTimeout, setOverlayTimeout] = useState(null);

  const setOverlayState = (state: VideoOverlayType) => {
    _setOverlayState(state);
    if (overlayTimeout) clearTimeout(overlayTimeout);
    setOverlayTimeout(setTimeout(() => {
      setOverlayState(null);
    }, 1000));
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  let isMuted = playerVolume == 0;

  return (
    <VideoStyles.Container>
      <VideoStyles.VideoWrapper>
        <video id={"video-" + resource.id} ref={videoRef} autoPlay>
          <source src={resource.url} type="video/mp4" />
        </video>
        <VideoOverlay state={overlayState} />
        <VideoStyles.SliderOverlay>
          <VideoSlider />
        </VideoStyles.SliderOverlay>
        <MiniVideoSlider />
      </VideoStyles.VideoWrapper>
      <VideoStyles.Controls>
        {(!buffering || isPlaying) ? (<>
          <Button
            iconElement={<Replay10Icon fontSize={'small'} />}
            onClick={onJumpBackward}
            label={<>Rewind<br />{JUMP_INTERVAL} seconds</>}
          />

          <Button
            icon={isPlaying ? faPause : faPlay}
            onClick={togglePlay}
          />

          <Button
            iconElement={<Forward10Icon fontSize={'small'} />}
            onClick={onJumpForward}
            label={<>Jump<br />{JUMP_INTERVAL} seconds</>}
          />

          <Spacer />

          <VideoStyles.VolumeControl className={volumeExpanded ? "expand" : ""}>
            <SliderStyle thumbSize={8}>
              <Slider
                type="range"
                min={0}
                max={1000}
                value={Math.round(playerVolume*1000)}
                onChange={val => setPlayerVolume(val/1000)}
                className="slider"
              />
            </SliderStyle>
            <Button
              icon={faVolumeMute}
              className={"mute" + (isMuted ? " active" : "")}
              onClick={onMuteClick}
              label={<>Mute</>}/>
            <Button
              icon={faVolumeUp}
              onClick={onVolumeClick}
              label={<>Volume</>} />
          </VideoStyles.VolumeControl>

          {pipEnabled && <Button
            iconElement={<PictureInPictureIcon fontSize={"small"} style={{ marginTop: 3 }} />}
            onClick={onPictureInPicture}
            label={<>Picture in Picture</>} />}

          <Button
            icon={faExpand}
            onClick={onFullScreen}
            label={<>Full Screen</>} />
        </>) : (
          <Loader size={24} />
        )}
      </VideoStyles.Controls>
    </VideoStyles.Container>
  )
}

export default VideoComponent