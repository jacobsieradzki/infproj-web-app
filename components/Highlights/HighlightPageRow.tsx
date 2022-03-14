import React from 'react'
import AddConnectionButton from 'components/AddConnectionButton'
import { VerticalStack } from 'components/GlobalStyles'
import HighlightRow from 'components/Highlights/HighlightRow'
import LinkPreview from 'components/Link/LinkPreview'
import Clip from 'models/Clip'
import Link from 'models/Link'
import SubtitlesStyles from 'components/Subtitles/SubtitleList.style'

type HighlightPageRowProps = {
  pageClip: Clip;
  currentHighlight: string;
  highlights: Clip[];
  links?: Link[];
  showAddConnection: boolean;
  handleAddConnection: (clip: Clip) => void;
}

export const HighlightPageRow: React.FC<HighlightPageRowProps> = ({
  pageClip,
  currentHighlight,
  highlights,
  links = [],
  showAddConnection = false,
  handleAddConnection,
}) => {

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
      return sourceClip?.type === "PDF_CLIP" && !!highlight && sourceClip.id?.toString() == id;
    }).sort((a, b) => {
      let aClip = a.source_link as Clip;
      let bClip = b.source_link as Clip;
      return bClip.highlight.bounding_rect.y1 - aClip.highlight.bounding_rect.y2;
    });
  }

  const handleAddPage = e => handleAddConnection(pageClip);

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
      {highlight.content.image && <img className={"pdf-page-prev"} src={highlight.content.image} alt={highlight.content.text} />}

      {pageAttachedLinks.length > 0 && (
        <SubtitlesStyles.Inset>
          <VerticalStack gap={8} className={'links page-links'}>
            {pageAttachedLinks.map((link, index) => (
              <LinkPreview key={index} link={link} />
            ))}
          </VerticalStack>
        </SubtitlesStyles.Inset>
      )}

      {highlights.length > 0 && (
        <VerticalStack gap={8} className={'links highlight-links'}>
          {highlights.map((clip, index) => (
            <HighlightRow
              key={index}
              highlight={clip}
              isSelected={clip.highlight.id.toString() == currentHighlight}
              links={getLinksForHighlight(clip.id.toString())}
              showAddConnection={showAddConnection}
              handleAddConnection={handleAddConnection}
            />
          ))}
        </VerticalStack>
      )}

      {showAddConnection && <AddConnectionButton className={'add'} label={'Add Connection to page'} onClick={handleAddPage} />}
    </SubtitlesStyles.PageContainer>
  )
}

export default HighlightPageRow