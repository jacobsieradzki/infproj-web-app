import React, { useRef } from 'react'
import HighlightPageRow from 'components/Highlights/HighlightPageRow'
import Loader from 'components/Loader/Loader'
import { IHighlight } from 'lib/react-pdf-highlighter'
import Clip from 'models/Clip'
import Course from 'models/Course'
import Link from 'models/Link'
import Resource from 'models/Resource'
import SubtitlesStyles from 'components/Subtitles/SubtitleList.style'

type HighlightListProps = {
  course: Course;
  resource: Resource;
  pageClips: Clip[];
  clips: Clip[];
  links: Link[];
  currentHighlight?: string;
}

export const HighlightList: React.FC<HighlightListProps> = ({
  course,
  resource,
  pageClips,
  clips,
  links,
  currentHighlight
}) => {

  const refList = useRef(null);

  const getLinksForHighlight = (highlight: IHighlight): Link[] => {
    return links.filter(link => {
      return link.link_type == "CLIP" && link.link?.highlight.bounding_rect.page_number == highlight.id;
    });
  }

  const getClipsForHighlight = (highlight: IHighlight): Clip[] => {
    return clips.filter(clip => {
      return !!clip.highlight && clip.highlight.bounding_rect.page_number.toString() == highlight.id;
    }).map(x => new Clip(x));
  }

  let loading = false;

  if (loading) {
    return (
      <SubtitlesStyles.Container>
        <Loader />
      </SubtitlesStyles.Container>
    )
  }

  return (
    <SubtitlesStyles.Container ref={refList} id={"highlights_list"}>
      <div>
        {pageClips.map((pageClip, index) => (
          <HighlightPageRow
            key={index}
            pageClip={pageClip}
            currentHighlight={currentHighlight}
            clips={getClipsForHighlight(pageClip.toLibraryModel())}
            links={getLinksForHighlight(pageClip.toLibraryModel())}
          />
        ))}
      </div>
    </SubtitlesStyles.Container>
  )
}

export default HighlightList