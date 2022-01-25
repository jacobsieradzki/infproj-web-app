import { HorizontalStack, Spacer } from 'components/GlobalStyles'
import useVideoContext from 'contexts/VideoContext'
import { formatHHMMSS } from 'helper/time'
import React, { useRef, useState } from 'react'
import VideoStyles, { SliderStyle } from './VideoComponent.style'
import Slider from 'react-slider'

const M = 100000000;
const THUMB_SIZE = 16;
export const START_SHOW_TIME_INTERVAL = 4;
export const END_SHOW_TIME_INTERVAL = 15;

const VideoSlider: React.FC = () => {

  const leftLabelRef = useRef(null);
  const rightLabelRef = useRef(null);
  const sliderRef = useRef(null);

  const [showRemaining, setShowRemaining] = useState(false);

  const { videoState, seekPlayer } = useVideoContext();
  const { playerSeconds, playerDuration } = videoState;

  const handleChange = (val, i) => {
    seekPlayer(Math.round(val / M));
  }

  const calculateTimelinePosition = (x: number): number => {
    if (!(leftLabelRef.current && rightLabelRef.current && sliderRef.current)) return 0;
    if (playerDuration == 0) return 0;
    let leftLabelWidth = leftLabelRef.current.offsetWidth;
    let rightLabelWidth = rightLabelRef.current.offsetWidth;
    let sliderWidth = sliderRef.current.offsetWidth - THUMB_SIZE;
    let maxX = sliderWidth - leftLabelWidth - rightLabelWidth;
    let progress = (x*M) / (playerDuration*M);
    let value = (sliderWidth * progress) + (THUMB_SIZE * (3/4)) - (leftLabelWidth / 2);
    return Math.max(0, Math.min(value, maxX));
  }

  let showTime = playerSeconds < START_SHOW_TIME_INTERVAL
    || (playerDuration-playerSeconds) < END_SHOW_TIME_INTERVAL;

  let remaining = playerDuration - playerSeconds;

  return (
    <VideoStyles.SliderOverlay className={"timeline " + (showTime ? "showTime" : "")}>
      <HorizontalStack className={"time"} align={"center"}>
        <div style={{ width: calculateTimelinePosition(playerSeconds) }} />
        <p ref={leftLabelRef}>
          {formatHHMMSS(playerSeconds)}
        </p>
        <Spacer />
        <a ref={rightLabelRef} onClick={() => setShowRemaining(!showRemaining)}>
          {showRemaining ? "-" : ""}
          {formatHHMMSS(showRemaining ? remaining : playerDuration)}
        </a>
      </HorizontalStack>
      <SliderStyle thumbSize={THUMB_SIZE} ref={sliderRef}>
        <Slider
          type="range"
          min={0}
          max={playerDuration*M}
          value={playerSeconds*M}
          onChange={handleChange}
          className="slider"
        />
      </SliderStyle>
    </VideoStyles.SliderOverlay>
  )
}

export default VideoSlider