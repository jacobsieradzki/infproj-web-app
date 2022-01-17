import Resource from 'models/Resource'
import React, { useEffect, useRef, useState } from 'react'
import VideoStyles from './VideoComponent.style'

type VideoComponentProps = {
  resource: Resource;
  onCurrentTimeChange: (seconds: number) => void;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ resource, onCurrentTimeChange }) => {

  const [timeInterval, setTimeInterval] = useState(null);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);


  useEffect(() => {
    let time = currentTime;
    setTimeInterval(setInterval(() => {
      let secs = Math.round(videoRef.current?.currentTime || 0);
      if (secs != time) {
        console.log('sending...', secs, time)
        setCurrentTime(secs);
        onCurrentTimeChange(secs);
      }
    }, 1000));
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <VideoStyles.Container>
      <video ref={videoRef} controls>
        <source src={resource.url} type="video/mp4" />
      </video>
    </VideoStyles.Container>
  )
}

export default VideoComponent