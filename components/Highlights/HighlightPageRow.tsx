import AddConnectionButton from 'components/AddConnectionButton'
import { VerticalStack } from 'components/GlobalStyles'
import HighlightRow from 'components/Highlights/HighlightRow'
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

type HighlightPageRowProps = {
  pageClip: Clip;
  currentHighlight: string;
  clips?: Clip[];
  links?: Link[];
}

export const HighlightPageRow: React.FC<HighlightPageRowProps> = ({
  pageClip,
  currentHighlight,
  clips = [],
  links = []
}) => {

  let highlight = pageClip.toLibraryModel();

  console.log("ROW", highlight, links);

  const getLinksForHighlight = (highlightClip: Clip): Link[] => {
    console.log("getLinksForHighlight", links, highlightClip);
    return links.filter(link => {
      return link.link_type == "CLIP" && link.source_id.toString() == highlightClip.id;
    });
  }

  const getLinksForPage = (highlightClip: Clip): Link[] => {
    console.log("getLinksForPage", links, highlightClip);
    return links.filter(link => {
      return link.source_link?.type == "PDF_PAGE" && link.source_link?.start_location == highlightClip.start_location;
    });
  }

  let pageLinks = getLinksForPage(pageClip);

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

      {clips.length > 0 &&
        <VerticalStack gap={8} className={'links'}>
          {clips.map((clip, index) => (
            <HighlightRow
              key={index}
              highlight={clip.toLibraryModel()}
              isSelected={clip.highlight.id.toString() == currentHighlight}
              links={getLinksForHighlight(clip)}
            />
          ))}
        </VerticalStack>
      }

      {pageLinks.length > 0 &&
        <SubtitlesStyles.Inset>
          <VerticalStack gap={8} className={'links'}>
            {pageLinks.map((link, index) => (
              <LinkPreview key={index} link={link} />
            ))}
          </VerticalStack>
        </SubtitlesStyles.Inset>
      }

      <AddConnectionButton className={"add"} label={"Add Connection to page"} />
    </SubtitlesStyles.PageContainer>
  )
}

export default HighlightPageRow