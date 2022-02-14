import AddConnectionButton from 'components/AddConnectionButton'
import { VerticalStack } from 'components/GlobalStyles'
import LinkPreview from 'components/Link/LinkPreview'
import useVideoContext from 'contexts/VideoContext'
import { formatHHMMSS } from 'helper/time'
import Link from 'models/Link'
import Subtitle from 'models/Subtitle'
import React from 'react'
import SubtitlesStyles from 'components/Subtitles/SubtitleList.style'

type SubtitleRowProps = {
  subtitle: Subtitle;
  isSelected: boolean;
  links: Link[];
  showAddConnection?: boolean;
}

export const SubtitleRow: React.FC<SubtitleRowProps> = ({
  subtitle,
  isSelected,
  links,
  showAddConnection = false,
}) => {

  const { seekPlayer } = useVideoContext();

  const onClick = e => {
    seekPlayer(subtitle.start_seconds);
  }

  return (
    <SubtitlesStyles.Item className={"item time" + (isSelected ? " selected" : "")}>
      <div id={"secs_" + subtitle.start_seconds} style={{ height: 24 }} />
      <button className={"nostyle"} onClick={onClick}>
        <span className={"subheader"}>{formatHHMMSS(subtitle.start_seconds)}</span>
        <p>{subtitle.content}</p>
      </button>
      {links.length > 0 &&
        <VerticalStack gap={16} className={'links'}>
          {links.map((link, index) => (
            <LinkPreview key={index} link={link} />
          ))}
        </VerticalStack>
      }
      {showAddConnection && <AddConnectionButton className={'add'} />}
    </SubtitlesStyles.Item>
  )
}

export default SubtitleRow