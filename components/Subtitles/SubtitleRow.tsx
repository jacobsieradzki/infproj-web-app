import AddConnectionButton from 'components/AddConnectionButton'
import { VerticalStack } from 'components/GlobalStyles'
import LinkPreview from 'components/Link/LinkPreview'
import { formatHHMMSS } from 'helper/time'
import Link from 'models/Link'
import Subtitle from 'models/Subtitle'
import React from 'react'
import SubtitlesStyles from 'components/Subtitles/SubtitleList.style'

type SubtitleRowProps = {
  subtitle: Subtitle;
  isSelected: boolean;
  links: Link[];
}

export const SubtitleRow: React.FC<SubtitleRowProps> = ({ subtitle, isSelected, links }) => {

  return (
    <SubtitlesStyles.Item className={"item" + (isSelected ? " selected" : "")}>
      <div id={"secs_" + subtitle.start_seconds} style={{ height: 24 }} />
      <span>{formatHHMMSS(subtitle.start_seconds)}</span>
      <p>{subtitle.content}</p>
      {links.length > 0 &&
        <VerticalStack gap={8} className={'links'}>
          {links.map((link, index) => (
            <LinkPreview key={index} link={link} />
          ))}
        </VerticalStack>
      }
      <AddConnectionButton className={"add"} />
    </SubtitlesStyles.Item>
  )
}

export default SubtitleRow