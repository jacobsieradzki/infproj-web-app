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
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    let element = document.getElementById("secs" + playerSeconds);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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
    <SubtitlesStyles.Container ref={refList} id={"subtitles-list"}>
      {subtitles.map((subtitle, index) => (
        <SubtitlesStyles.Item key={index} id={"secs" + subtitle.start_seconds}>
          <span>{formatHHMMSS(subtitle.start_seconds)}</span>
          <p>{subtitle.content}</p>
          <AddConnectionButton className={"add"} />
        </SubtitlesStyles.Item>
      ))}
    </SubtitlesStyles.Container>
  )
}

export default SubtitleList