import Clip from 'models/Clip'
import React from 'react'
import AddConnectionButton from 'components/AddConnectionButton'
import { VerticalStack } from 'components/GlobalStyles'
import LinkPreview from 'components/Link/LinkPreview'
import PdfDocumentHelper from 'helper/pdfDocument'
import Link from 'models/Link'
import { useRouter } from 'next/router'
import SubtitlesStyles from 'components/Subtitles/SubtitleList.style'

type HighlightRowProps = {
  highlight: Clip;
  isSelected: boolean;
  links?: Link[];
  showAddConnection?: boolean;
  handleAddConnection: (clip: Clip) => void;
}

export const HighlightRow: React.FC<HighlightRowProps> = ({
  highlight: clip,
  isSelected,
  links = [],
  showAddConnection = false,
  handleAddConnection,
}) => {

  const router = useRouter();
  let highlight = clip.toLibraryModel();

  const onClick = e => {
    PdfDocumentHelper.updateHash(isSelected ? null : highlight, router);
  };

  const handleAdd = e => handleAddConnection(clip)

  return (
    <SubtitlesStyles.Item className={"item" + (isSelected ? " selected" : "")}>
      <button className={"nostyle"} onClick={onClick}>
        <span className={"subheader"}>
          {highlight.comment.emoji && <>{highlight.comment.emoji}&nbsp;&nbsp;</>}
          {highlight.comment.text}
        </span>

        {highlight.content.text && <p className={"content"}>{highlight.content.text}</p>}
        {highlight.content.image && <img className={"pdf-img-prev"} src={highlight.content.image} alt={highlight.content.text} />}
      </button>

      {links.length > 0 &&
        <VerticalStack gap={8} className={'links'} style={{ marginTop: 16 }}>
          {links.map((link, index) => (
            <LinkPreview key={index} link={link} />
          ))}
        </VerticalStack>
      }

      {showAddConnection && <AddConnectionButton className={'add'} label={'Add connection to highlight'} onClick={handleAdd} />}
    </SubtitlesStyles.Item>
  )
}

export default HighlightRow