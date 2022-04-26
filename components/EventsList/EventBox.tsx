import { formatCourseDate } from 'helper/time'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CaptionUppercase } from 'components/GlobalStyles'
import Organisation from 'models/Organisation'
import { generateEventRoute } from 'constants/navigation'
import Event from 'models/Event'
import CoursesListStyles, { BoxContent, LecturePreview } from 'components/CoursesList/CoursesList.style'

type EventBoxProps = {
  organisation: Organisation;
  event: Event;
}

const EventBox: React.FC<EventBoxProps> = ({ organisation, event }) => {

  let secs = Math.round((event.getEndDate().getTime() - event.getStartDate().getTime()) / 1000);
  let duration = null;
  if (secs > 0) {
    if (secs > 3599) {
      let n = Math.round((secs/3600)*100)/100;
      duration = `${n} hour${n === 1 ? "" : "s"}`;
    } else if (secs < 3600) {
      duration = `${Math.round((secs/60)*100)/100} mins`;
    } else {
      duration = `${secs} secs`;
    }
  }

  return (
    <CoursesListStyles.Box as={"a"} href={generateEventRoute(organisation.id, event.course_id, event.id)}>
      <LecturePreview>
        <span><b>
          <FontAwesomeIcon icon={event.getIcon()} size={"sm"} />&nbsp;&nbsp;
          <>{event.getTypeLabel()}</>
        </b></span>
        <p>{event.name}</p>
      </LecturePreview>
      <BoxContent>
        <CaptionUppercase><b>{formatCourseDate(event.getStartDate())} ({duration})</b></CaptionUppercase>
        <p>{event.description}</p>
      </BoxContent>
    </CoursesListStyles.Box>
  )
}

export default EventBox