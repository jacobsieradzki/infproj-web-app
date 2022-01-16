import useGetSubtitles from 'api/useGetSubtitles'
import AddConnectionButton from 'components/AddConnectionButton'
import Loader from 'components/Loader/Loader'
import { formatHHMMSS } from 'helper/time'
import Course from 'models/Course'
import Resource from 'models/Resource'
import React, { useEffect, useRef, useState } from 'react'
import SubtitlesStyles from 'components/Subtitles/SubtitleList.style'

type SubtitleListProps = {
  course: Course;
  resource: Resource;
  playerSeconds: number;
}

export const SubtitleList: React.FC<SubtitleListProps> = ({ course, resource, playerSeconds }) => {

  const refList = useRef(null);
  const [selectedSecs, setSelectedSecs] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    let element = document.getElementById("secs_" + playerSeconds);
    let endElement = document.getElementById("secs_end");
    if (element) {
      setSelectedSecs(playerSeconds);
      endElement?.scrollIntoView({ block: 'nearest', inline: 'center' });
      setTimeout(() => {
        element?.scrollIntoView({ block: 'nearest', inline: 'center' });
      }, 10);
    }
  }, [playerSeconds]);



  const { data: subtitles, loading, error } = useGetSubtitles({
    courseId: course.id,
    resourceId: resource.id
  });

  if (loading) {
    return (
      <SubtitlesStyles.Container>
        <Loader />
      </SubtitlesStyles.Container>
    )
  }

  return (
    <SubtitlesStyles.Container ref={refList} id={"subtitles_list"}>
      <div>
        {subtitles.map((subtitle, index) => (
          <SubtitlesStyles.Item
            key={index}
            className={subtitle.start_seconds == selectedSecs ? "selected" : ""}
          >
            <div id={"secs_" + subtitle.start_seconds} style={{ height: 24 }} />
            <span>{formatHHMMSS(subtitle.start_seconds)}</span>
            <p>{subtitle.content}</p>
            <AddConnectionButton className={"add"} />
          </SubtitlesStyles.Item>
        ))}
      </div>
      <div id={"secs_end"} />
    </SubtitlesStyles.Container>
  )
}

export default SubtitleList