import useVideoContext from 'contexts/VideoContext'
import Resource from 'models/Resource'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import VideoStyles from './VideoComponent.style'

type VideoComponentProps = {
  resource: Resource;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ resource }) => {

  const { videoState, videoDispatch, setPlayerPlaying, setPlayerSeconds, setClipStart, setClipEnd } = useVideoContext();
  const { playerId, startClip, endClip } = videoState;

  const router = useRouter();

  // --------------------------------------------------
  // Video
  // --------------------------------------------------

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    let id = videoRef.current?.id;
    if (!id || playerId == id) return;

    videoDispatch({ type: "SET_PLAYER_ID", payload: videoRef.current.id });
    videoRef.current.onplay = e => setPlayerPlaying(true);
    videoRef.current.onpause = e => setPlayerPlaying(false);
    videoRef.current.ontimeupdate = e => setPlayerSeconds(videoRef.current.currentTime);
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
  // Render
  // --------------------------------------------------

  return (
    <VideoStyles.Container>
      <video id={"video-" + resource.id} ref={videoRef} controls autoPlay>
        <source src={resource.url} type="video/mp4" />
      </video>
    </VideoStyles.Container>
  )
}

export default VideoComponent