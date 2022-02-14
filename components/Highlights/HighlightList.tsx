import useAuthContext from 'contexts/AuthContext'
import useMembership from 'helper/useMembership'
import Highlight from 'models/Highlight'
import React, { useRef } from 'react'
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
  isDiscussion?: boolean;
}

export const HighlightList: React.FC<HighlightListProps> = ({
  loading,
  course,
  resource,
  highlights,
  pageClips,
  links,
  currentHighlight,
  isDiscussion,
}) => {

  const { authState } = useAuthContext();
  const { memberships } = authState;
  const membership = useMembership(memberships);

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
        <Loader />
      </SubtitlesStyles.Container>
    )
  }

  let showAddConnection = (isDiscussion && membership.hasStudentMembershipToCourse(course))
    || (!isDiscussion && membership.hasStaffPermissionForCourse(course));

  console.log("ALL HIGHLIGHTS", highlights);
  console.log("ALL LINKS", links);
  console.log("PAGE CLIPS", pageClips);

  return (
    <SubtitlesStyles.Container id={"highlights-list"}>
      <div>
        {pageClips.map((pageClip, index) => (
          <HighlightPageRow
            key={index}
            pageClip={pageClip}
            currentHighlight={currentHighlight}
            highlights={getHighlightsForPage(pageClip)}
            links={getLinksForPage(pageClip)}
            showAddConnection={showAddConnection}
          />
        ))}
      </div>
    </SubtitlesStyles.Container>
  )
}

export default HighlightList