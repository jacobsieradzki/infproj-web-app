import { END_SHOW_TIME_INTERVAL, START_SHOW_TIME_INTERVAL } from 'components/Video/VideoSlider'
import React from 'react'
import useVideoContext from 'contexts/VideoContext'
import VideoStyles from './VideoComponent.style'

const MiniVideoSlider: React.FC = () => {

  const { videoState } = useVideoContext();
  const { playerSeconds, playerDuration } = videoState;

  let showTime = !(playerSeconds < START_SHOW_TIME_INTERVAL
    || (playerDuration-playerSeconds) <= END_SHOW_TIME_INTERVAL);
  let progress = (playerSeconds / playerDuration) * 100;

  return (
    <VideoStyles.MiniSlider
      className={"mini-timeline " + (showTime ? "showMini" : "")}
      style={{
        width: progress.toString() + "%"
      }}
    />
  )
}

export default MiniVideoSlider