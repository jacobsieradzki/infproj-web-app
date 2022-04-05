import React from 'react'
import EmojiDisplayContainer from 'components/Video/VideoEmojiDisplay.style'
import useVideoContext from 'contexts/VideoContext'

const VideoEmojiDisplay = () => {

  const { videoState } = useVideoContext();
  const { reactions } = videoState;

  return (
    <EmojiDisplayContainer id={"reactions-display"}>
      <div className="live-emotes">
        {reactions.map((x, i) => (
          <div key={i} className={'live-emote-container live-emote-container-' + i.toString()}>
            <div className="live-emote">
              <div className="live-emote-content">
                <span className={"emoji"}>{x}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </EmojiDisplayContainer>
  )
}

export default VideoEmojiDisplay