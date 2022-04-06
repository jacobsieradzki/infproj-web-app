import { FormHelperText } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useGetSubtitles from 'classroomapi/useGetSubtitles'
import CreateLinkPopup from 'components/CreateLinkPopup/CreateLinkPopup'
import { Spacer } from 'components/GlobalStyles'
import Loader from 'components/Loader/Loader'
import { StudentCourseNewEnrollmentLoginAlert } from 'components/Membership/MembershipAlerts'
import SubtitleRow from 'components/Subtitles/SubtitleRow'
import useAuthContext from 'contexts/AuthContext'
import usePopupContext from 'contexts/PopupContext'
import useVideoContext from 'contexts/VideoContext'
import Course from 'models/Course'
import Link from 'models/Link'
import Resource from 'models/Resource'
import Subtitle from 'models/Subtitle'
import SubtitlesStyles from 'components/Subtitles/SubtitleList.style'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

type SubtitleListProps = {
  course: Course;
  resource: Resource;
  links: Link[];
  refreshLinks: () => void;
  showAdd?: boolean;
}

export const SubtitleList: React.FC<SubtitleListProps> = ({
  course,
  resource,
  links,
  refreshLinks,
  showAdd = false,
}) => {

  const { isLoggedIn } = useAuthContext();
  const { showError } = usePopupContext();
  const { videoState, videoDispatch, seekPlayer } = useVideoContext();
  const { isPlaying, playerSeconds, startClip } = videoState;

  const refList = useRef(null);
  const [selectedSecs, setSelectedSecs] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const [linkProps, setLinksProps] = useState(null);

  const [showAllResults, setShowAllResults] = useState(false);

  const { data: subtitles, loading, error } = useGetSubtitles({
    courseId: course.id,
    resourceId: resource.id
  });

  const getClosestSubtitleSeconds = (secs: number): number => {
    if (subtitles.length == 0) return 0;
    let eligible = subtitles.filter(x => x.start_seconds <= secs);
    return Math.max(...eligible.map(x => x.start_seconds));
  };

  useEffect(() => {
    let secs = getClosestSubtitleSeconds(playerSeconds);
    if (selectedSecs == secs) return;

    setSelectedSecs(secs);

    let element = document.getElementById("secs_" + secs);
    let endElement = document.getElementById("secs_end");
    if (element) {
      if (autoPlay) {
        endElement?.scrollIntoView({ block: 'nearest', inline: 'center' });
        setTimeout(() => {
          element?.scrollIntoView({ block: 'nearest', inline: 'center' });
        }, 10);
      }
    }
  }, [playerSeconds]);

  useEffect(() => {
    if (!isPlaying) {
      setTimeout(() => seekPlayer(getClosestSubtitleSeconds(startClip)), 50);
    }
  }, [startClip, subtitles]);

  const getLinksForSubtitle = (subtitle: Subtitle): Link[] => {
    return links.filter(link => {
      return showAllResults || link.approved;
    }).filter(link => {
      if (link.source_link?.type == "VIDEO_CLIP") {
        return getClosestSubtitleSeconds(link.source_link.start_location) == subtitle.start_seconds;
      } else {
        return link.subtitle_id == subtitle.id;
      }
    });
  }

  const showConnectionForSubtitle = (subtitle: Subtitle) => {
    if (isLoggedIn) {
      setLinksProps(subtitle.id);
      videoDispatch({ type: "SET_PLAYER_PLAYING", payload: false });
    } else {
      showError("Please login to create connections in discussion.");
    }
  }


  if (loading) {
    return (
      <SubtitlesStyles.Container>
        <Loader style={{ margin: "calc(50% + 32px) auto" }} />
      </SubtitlesStyles.Container>
    )
  }

  let subtitlesArr = subtitles.sort((a, b) => (a.start_seconds - b.start_seconds));
  let switchLabel = showAllResults ? "Toggle to show reviewed resources" : "Toggle to show replies from all students";

  return (
    <>
      <CreateLinkPopup isOpen={!!linkProps} closeModal={() => setLinksProps(null)} course={course}
        selectedId={resource.id} selectedType={"RESOURCE"} anchorSubtitleId={linkProps}
        handleCreatedLink={refreshLinks} />

      <SubtitlesStyles.Container ref={refList} id={"subtitles-list"} className={isPlaying && autoPlay ? "autoplay" : ""}>
        <StudentCourseNewEnrollmentLoginAlert />

        <FormGroup className={"reply-filter"}>
          <FormControlLabel control={<Switch value={showAllResults}
            onChange={e => setShowAllResults(e.target.checked)} />}
            label={switchLabel} />
          {showAllResults && <FormHelperText>
            Reviewed resources are posted by instructors, or a student reply that has been promoted by an instructor.
          </FormHelperText>}
        </FormGroup>

        <div className={"subtitle-rows"}>
          {subtitlesArr.map((subtitle, index) => (
            <SubtitleRow
              key={index}
              subtitle={subtitle}
              isSelected={subtitle.start_seconds == selectedSecs}
              links={getLinksForSubtitle(subtitle)}
              showAddConnection={showAdd}
              addConnection={() => showConnectionForSubtitle(subtitle)}
            />
          ))}
        </div>

        <div id={"secs_end"} />

        {isPlaying && subtitles.length > 0 && (
          <SubtitlesStyles.AutoPlay className={'bg-blur'} as={'button'} onClick={() => setAutoPlay(!autoPlay)}>
            <p>Auto play</p>
            <Spacer />
            <FontAwesomeIcon icon={autoPlay ? faCheckSquare : faSquare} size={'1x'} color={'white'} />
          </SubtitlesStyles.AutoPlay>
        )}
      </SubtitlesStyles.Container>
    </>
  )
}

export default SubtitleList