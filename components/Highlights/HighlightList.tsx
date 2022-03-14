import CreateLinkPopup from 'components/CreateLinkPopup/CreateLinkPopup'
import Subtitle from 'models/Subtitle'
import React, { useState } from 'react'
import useAuthContext from 'contexts/AuthContext'
import useMembership from 'helper/useMembership'
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

  const [linkProps, setLinksProps] = useState(null);

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

  let showAddConnection = (isDiscussion && membership.hasStudentMembershipToCourse(course))
    || (!isDiscussion && membership.hasStaffPermissionForCourse(course));

  console.log("ALL HIGHLIGHTS", highlights);
  console.log("ALL LINKS", links);
  console.log("PAGE CLIPS", pageClips);

  const showConnectionForHighlight = (clip: Clip) => setLinksProps(clip.id);

  return (
    <>
      <CreateLinkPopup isOpen={!!linkProps} closeModal={() => setLinksProps(null)} course={course}
        selectedId={resource.id} selectedType={"RESOURCE"} anchorSubtitleId={linkProps}
        handleCreatedLink={() => {}} />

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
              handleAddConnection={showConnectionForHighlight}
            />
          ))}
        </div>
      </SubtitlesStyles.Container>
    </>
  )
}

export default HighlightList