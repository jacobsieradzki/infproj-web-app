import LinkStyle from 'components/Link/Link.style'
import useAuthContext from 'contexts/AuthContext'
import React, { useState } from 'react'
import styled from 'styled-components'
import { EMOJI_REACTIONS } from 'constants/emoji'

const ReactionBox = styled.button`
  background-color: transparent;
  border: 1px rgba(255,255,255,0.2) solid;
  border-radius: 999px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 6px;
  font-size: 12px;
  
  &.add-reaction {
    opacity: 0.3;
  }
  
  &:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.2);
    border-color: white;
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const LinkReactions: React.FC = () => {

  const { isLoggedIn } = useAuthContext();

  const [reactions, setReactions] = useState({});

  const setReaction = (reaction, num) => setReactions({ ...reactions, [reaction]: num });
  const getReactionCount = (reaction) => reactions[reaction] || 0;
  const handleClick = reaction => setReaction(reaction, getReactionCount(reaction) + 1);
  const getClassName = r => getReactionCount(r) > 0 ? "" : " add-reaction";

  if (!isLoggedIn) return <></>;

  return (
    <LinkStyle.Reactions id={"links-reactions"}>
      {EMOJI_REACTIONS.map(x => (
        <ReactionBox key={x.label} onClick={() => handleClick(x.emoji)} className={getClassName(x.emoji)}>
          {x.emoji}
          &nbsp;&nbsp;
          {getReactionCount(x.emoji) || 0}
        </ReactionBox>
      ))}
    </LinkStyle.Reactions>
  )
}

export default LinkReactions