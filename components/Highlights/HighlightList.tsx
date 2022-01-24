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

  const getClipsForHighlight = (pageClip: Clip): Clip[] => {
    return clips.filter(clip => {
      return !!clip.highlight && clip.highlight.bounding_rect.page_number == pageClip.start_location;
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
            clips={getClipsForHighlight(pageClip)}
            links={links}
          />
        ))}
      </div>
    </SubtitlesStyles.Container>
  )
}

export default HighlightList