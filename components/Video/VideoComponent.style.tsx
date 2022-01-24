import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  border: 2px solid rgb(76 95 114);
  
  video {
    width: 100%;
  }
`;

const VideoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  
  .timeline:not(.showTime) {
    opacity: 0;
    transform: translateY(100px);
    transition: all .3s;
  }
  &:hover {
    .timeline { 
      opacity: 1;
      transform: none; 
    }
    .mini-timeline { height: 0; opacity: 0; }
    .time { opacity: 1; }
  }
`;

const VideoOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 32px 16px 16px;
  background: #000;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
  
  .time {
    margin: 8px 0;
    opacity: 0;
    transition: opacity .3s;
    font-weight: 600;
    font-size: 0.9rem;
    & > p, a { text-shadow: 0 0 8px rgb(0 0 0); }
    & > a { cursor: pointer; }
    & > a:hover { text-decoration: underline; }
  }
  
  &.showTime {
    .time { opacity: 1; }
  }
`;

const MiniSlider = styled.div`
  width: 100%;
  background-color: white;
  height: 0;
  opacity: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  transition: all .2s;
  &.showMini { height: 2px; opacity: 1; }
`;

const Controls = styled.div`
  background-color: var(--secondary-color);
  display: flex;
  gap: 4px;
  padding: 8px;
`;

const Button = styled.button`
  width: 36px;
  height: 36px;
  background-color: transparent;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: var(--primary-color);
  }
`;

const VideoStyles = {
  Container,
  VideoWrapper,
  VideoOverlay,
  SliderOverlay,
  MiniSlider,
  Controls,
  Button,
}

export default VideoStyles

type SliderStyleProps = { thumbSize: number };
export const SliderStyle = styled.div<SliderStyleProps>`
  width: 100%;
  z-index: 1000;
  padding: 8px 0;
  
  .thumb {
    width: ${props => props.thumbSize}px;
    height: ${props => props.thumbSize}px;
    border-radius: 50%;
    cursor: pointer;
    transition: all .1s;
    background-color: #d7d7d7;
    margin-top: -${props => props.thumbSize/4}px;
    margin-left: ${props => props.thumbSize/4}px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    &:hover { box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2); };
  }
  
  .track, .slider {
    transition: all .1s;
  }
  
  .track-0 {
    height: ${props => props.thumbSize/2}px;
    border-radius: 999px;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .slider {
    height: ${props => props.thumbSize/2}px;
    background-color: rgba(255, 255, 255, .3);
    border-radius: 5px;
    background-size: 0% 100%;
    background-image: linear-gradient(#fff, #fff);
    background-repeat: no-repeat;
    cursor: pointer;
  }
  
  .slider:hover {
    .thumb {
      background-color: white;
    }
  }
`;