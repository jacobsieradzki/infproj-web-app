import AddConnectionButton from 'components/AddConnectionButton'
import { VerticalStack } from 'components/GlobalStyles'
import LinkPreview from 'components/Link/LinkPreview'
import PdfDocumentHelper from 'helper/pdfDocument'
import { formatHHMMSS } from 'helper/time'
import { IHighlight } from 'lib/react-pdf-highlighter'
import Clip from 'models/Clip'
import Link from 'models/Link'
import Subtitle from 'models/Subtitle'
import { useRouter } from 'next/router'
import React from 'react'
import SubtitlesStyles from 'components/Subtitles/SubtitleList.style'

type HighlightRowProps = {
  highlight: IHighlight;
  isSelected: boolean;
  links?: Link[];
  showAddConnection?: boolean;
}

export const HighlightRow: React.FC<HighlightRowProps> = ({
  highlight,
  isSelected,
  links = [],
  showAddConnection = false,
}) => {

  const router = useRouter();

  const onClick = e => {
    PdfDocumentHelper.updateHash(isSelected ? null : highlight, router);
  };

  return (
    <SubtitlesStyles.Item className={"item" + (isSelected ? " selected" : "")}>
      <button className={"nostyle"} onClick={onClick}>
        <span className={"subheader"}>
          {highlight.comment.emoji && <>{highlight.comment.emoji}&nbsp;&nbsp;</>}
          {highlight.comment.text}
        </span>

        {highlight.content.text && <p className={"content"}>{highlight.content.text}</p>}
        {highlight.content.image && <img src={highlight.content.image} alt={highlight.content.text} />}
      </button>

      {links.length > 0 &&
        <VerticalStack gap={8} className={'links'}>
          {links.map((link, index) => (
            <LinkPreview key={index} link={link} />
          ))}
        </VerticalStack>
      }

      {showAddConnection && <AddConnectionButton className={'add'} label={'Add connection to highlight'} />}
    </SubtitlesStyles.Item>
  )
}

export default HighlightRow