import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useGetSubtitles from 'api/useGetSubtitles'
import AddConnectionButton from 'components/AddConnectionButton'
import { Spacer } from 'components/GlobalStyles'
import Loader from 'components/Loader/Loader'
import SubtitleRow from 'components/Subtitles/SubtitleRow'
import { formatHHMMSS } from 'helper/time'
import Course from 'models/Course'
import Link from 'models/Link'
import Resource from 'models/Resource'
import Subtitle from 'models/Subtitle'
import React, { useEffect, useRef, useState } from 'react'
import SubtitlesStyles from 'components/Subtitles/SubtitleList.style'

type SubtitleListProps = {
  course: Course;
  resource: Resource;
  links: Link[];
  playerSeconds: number;
}

export const SubtitleList: React.FC<SubtitleListProps> = ({
  course,
  resource,
  links,
  playerSeconds,
}) => {

  const refList = useRef(null);
  const [selectedSecs, setSelectedSecs] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    let element = document.getElementById("secs_" + playerSeconds);
    let endElement = document.getElementById("secs_end");
    if (element) {
      if (selectedSecs != playerSeconds) console.log('set', selectedSecs, playerSeconds);
      if (selectedSecs != playerSeconds) setSelectedSecs(playerSeconds);
      if (autoPlay) {
        endElement?.scrollIntoView({ block: 'nearest', inline: 'center' });
        setTimeout(() => {
          element?.scrollIntoView({ block: 'nearest', inline: 'center' });
        }, 10);
      }
    }
  }, [playerSeconds]);


  const { data: subtitles, loading, error } = useGetSubtitles({
    courseId: course.id,
    resourceId: resource.id
  });

  const getLinksForSubtitle = (subtitle: Subtitle): Link[] => {
    return links.filter(link => link.subtitle_id == subtitle.id);
  }

  if (loading) {
    return (
      <SubtitlesStyles.Container>
        <Loader />
      </SubtitlesStyles.Container>
    )
  }

  return (
    <SubtitlesStyles.Container ref={refList} id={"subtitles_list"} className={autoPlay ? "autoplay" : ""}>
      <div>
        {subtitles.map((subtitle, index) => (
          <SubtitleRow
            key={index}
            subtitle={subtitle}
            isSelected={subtitle.start_seconds == selectedSecs}
            links={getLinksForSubtitle(subtitle)}
          />
        ))}
      </div>
      <div id={"secs_end"} />
      {subtitles.length > 0 &&
        <SubtitlesStyles.AutoPlay className={'bg-blur'} as={'button'} onClick={() => setAutoPlay(!autoPlay)}>
          <p>Auto play</p>
          <Spacer />
          <FontAwesomeIcon icon={autoPlay ? faCheckSquare : faSquare} size={'1x'} color={'white'} />
        </SubtitlesStyles.AutoPlay>
      }
    </SubtitlesStyles.Container>
  )
}

export default SubtitleList