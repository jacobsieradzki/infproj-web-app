import React, { useState } from 'react'
import CreateLinkPopup from 'components/CreateLinkPopup/CreateLinkPopup'
import HighlightPageRow from 'components/Highlights/HighlightPageRow'
import Loader from 'components/Loader/Loader'
import Clip from 'models/Clip'
import Course from 'models/Course'
import Link from 'models/Link'
import Resource from 'models/Resource'
import SubtitlesStyles from 'components/Subtitles/SubtitleList.style'

type HighlightListProps = {
  loading: boolean;
  course: Course;
  resource: Resource;
  highlights: Clip[];
  pageClips: Clip[];
  links: Link[];
  currentHighlight?: string;
  showAdd?: boolean;
  refreshLinks: () => void;
}

export const HighlightList: React.FC<HighlightListProps> = ({
  loading,
  course,
  resource,
  highlights,
  pageClips,
  links,
  currentHighlight,
  showAdd,
  refreshLinks,
}) => {

  const [linkProps, setLinkProps] = useState(null);

  const getHighlightsForPage = (pageClip: Clip): Clip[] => {
    return (highlights?.filter(clip => {
      return !!clip.highlight && clip.start_location == pageClip.start_location;
    }) || []);
  }

  const getLinksForPage = (pageClip: Clip): Link[] => {
    return links.filter(link => {
      let sourceClip = link.source_link as Clip;
      return sourceClip?.start_location == pageClip.start_location;
    });
  }

  if (loading) {
    return (
      <SubtitlesStyles.Container>
        <Loader style={{ margin: "calc(50% + 32px) auto" }} />
      </SubtitlesStyles.Container>
    )
  }

  const showConnectionForHighlight = (clip: Clip) => setLinkProps(clip.id);

  return (
    <>
      <CreateLinkPopup isOpen={!!linkProps} closeModal={() => setLinkProps(null)} course={course}
        selectedId={linkProps} selectedType={"CLIP"} handleCreatedLink={refreshLinks} />

      <SubtitlesStyles.Container id={"highlights-list"}>
        <div>
          {pageClips.map((pageClip, index) => (
            <HighlightPageRow
              key={index}
              pageClip={pageClip}
              currentHighlight={currentHighlight}
              highlights={getHighlightsForPage(pageClip)}
              links={getLinksForPage(pageClip)}
              showAddConnection={showAdd}
              handleAddConnection={showConnectionForHighlight}
            />
          ))}
        </div>
      </SubtitlesStyles.Container>
    </>
  )
}

export default HighlightList