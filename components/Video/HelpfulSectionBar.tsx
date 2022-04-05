import React from 'react'
import { END_SHOW_TIME_INTERVAL, START_SHOW_TIME_INTERVAL } from 'components/Video/VideoSlider'
import useVideoContext from 'contexts/VideoContext'
import VideoStyles, { HelpfulStyle } from './VideoComponent.style'

const HelpfulSectionBar: React.FC = () => {

  const { videoState } = useVideoContext();
  const { playerSeconds, playerDuration } = videoState;

  let showTime = playerSeconds < START_SHOW_TIME_INTERVAL
    || (playerDuration-playerSeconds) < END_SHOW_TIME_INTERVAL;

  return (
    <VideoStyles.SliderOverlay className={"timeline clear" + (showTime ? " showTime" : "")}>
      <HelpfulStyle>
        <p>🙌 Your class found this section helpful</p>
        <div className={"bar"} />
      </HelpfulStyle>
    </VideoStyles.SliderOverlay>
  )
}

export default HelpfulSectionBar