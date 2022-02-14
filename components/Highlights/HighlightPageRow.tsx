import AddConnectionButton from 'components/AddConnectionButton'
import { VerticalStack } from 'components/GlobalStyles'
import HighlightRow from 'components/Highlights/HighlightRow'
import LinkPreview from 'components/Link/LinkPreview'
import PdfDocumentHelper from 'helper/pdfDocument'
import { formatHHMMSS } from 'helper/time'
import { IHighlight } from 'lib/react-pdf-highlighter'
import Clip from 'models/Clip'
import Highlight from 'models/Highlight'
import Link from 'models/Link'
import Subtitle from 'models/Subtitle'
import { useRouter } from 'next/router'
import React from 'react'
import SubtitlesStyles from 'components/Subtitles/SubtitleList.style'

type HighlightPageRowProps = {
  pageClip: Clip;
  currentHighlight: string;
  highlights: Clip[];
  links?: Link[];
  showAddConnection: boolean;
}

export const HighlightPageRow: React.FC<HighlightPageRowProps> = ({
  pageClip,
  currentHighlight,
  highlights,
  links = [],
  showAddConnection = false,
}) => {

  console.log(">>> PAGE", pageClip);
  let highlight = pageClip.toLibraryModel();

  const getPageAttachedLinks = (page: number): Link[] => {
    return links.filter(link => {
      let sourceClip = link.source_link as Clip;
      if (sourceClip) {
        return sourceClip?.type == "PDF_PAGE" && sourceClip?.start_location == page;
      }
    });
  }

  const getLinksForHighlight = (id: string): Link[] => {
    return links.filter(link => {
      let sourceClip = link.source_link as Clip;
      if (sourceClip) {
        return sourceClip?.type == "PDF_CLIP" && !!highlight && sourceClip.id.toString() == id;
      }
    });
  }

  let pageAttachedLinks = getPageAttachedLinks(pageClip.start_location);

  return (
    <SubtitlesStyles.PageContainer className={"item"}>
      <SubtitlesStyles.Inset>
        <span className={"header"}>
          {highlight.comment.emoji && <>{highlight.comment.emoji}&nbsp;</>}
          {highlight.comment.text}
        </span>
      </SubtitlesStyles.Inset>

      {highlight.content.text && <p>{highlight.content.text}</p>}
      {highlight.content.image && <img src={highlight.content.image} alt={highlight.content.text} />}

      {highlights.length > 0 &&
        <VerticalStack gap={8} className={'links'}>
          {highlights.map((clip, index) => (
            <HighlightRow
              key={index}
              highlight={clip.toLibraryModel()}
              isSelected={clip.highlight.id.toString() == currentHighlight}
              links={getLinksForHighlight(clip.id.toString())}
              showAddConnection={showAddConnection}
            />
          ))}
        </VerticalStack>
      }

      {pageAttachedLinks.length > 0 &&
        <SubtitlesStyles.Inset>
          <VerticalStack gap={8} className={'links'}>
            {pageAttachedLinks.map((link, index) => (
              <LinkPreview key={index} link={link} />
            ))}
          </VerticalStack>
        </SubtitlesStyles.Inset>
      }

      {showAddConnection && <AddConnectionButton className={'add'} label={'Add Connection to page'} />}
    </SubtitlesStyles.PageContainer>
  )
}

export default HighlightPageRow