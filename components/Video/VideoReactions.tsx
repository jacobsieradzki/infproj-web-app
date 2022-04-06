import useAuthContext from 'contexts/AuthContext'
import useVideoContext from 'contexts/VideoContext'
import { formatHHMMSS } from 'helper/time'
import React from 'react'
import styled from 'styled-components'
import { EMOJI_REACTIONS } from 'constants/emoji'

const Layout = styled.div`
  text-align: center;
  
  #reactions-actions {
    display: flex;
    gap: 8px;
    justify-content: center;
    padding: 8px 0;
  }
  
  padding-bottom: 32px;
`;

const ReactionBox = styled.button`
  background-color: transparent;
  padding: 6px 12px;
  border: 1px rgba(255,255,255,0.2) solid;
  border-radius: 999px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: white;
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const VideoReactions: React.FC = () => {

  const { isLoggedIn } = useAuthContext();
  const { videoState, addReaction, popReaction } = useVideoContext();
  const { playerSeconds } = videoState;

  const handleClick = reaction => {
    addReaction(reaction.emoji);
    setTimeout(popReaction, 8000);
  }

  if (!isLoggedIn) return <></>;

  return (
    <Layout>
      <div id={"reactions-actions"}>
        {EMOJI_REACTIONS.map(x => (
          <ReactionBox key={x.label} onClick={() => handleClick(x)}>
            {x.emoji}
            &nbsp;&nbsp;
            {x.label}
          </ReactionBox>
        ))}
      </div>
      <p>
        Leave LIVE feedback to your instructor at {formatHHMMSS(playerSeconds)}. Click as many times as you like!
      </p>
    </Layout>
  )
}

export default VideoReactions