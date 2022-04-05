import useAuthContext from 'contexts/AuthContext'
import useVideoContext from 'contexts/VideoContext'
import React from 'react'
import styled from 'styled-components'
import { EMOJI_REACTIONS } from 'constants/emoji'

const Layout = styled.div`
  display: flex;
  gap: 8px;
  padding-bottom: 32px;
  justify-content: center;
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
  const { addReaction, popReaction } = useVideoContext();

  const handleClick = reaction => {
    addReaction(reaction.emoji);
    setTimeout(popReaction, 8000);
  }

  if (!isLoggedIn) return <></>;

  return (
    <Layout id={"reactions-actions"}>
      {EMOJI_REACTIONS.map(x => (
        <ReactionBox key={x.label} onClick={() => handleClick(x)}>
          {x.emoji}
          &nbsp;&nbsp;
          {x.label}
        </ReactionBox>
      ))}
    </Layout>
  )
}

export default VideoReactions