import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Organisation from 'models/Organisation'
import React from 'react'
import { generateEventRoute } from 'constants/navigation'
import Event from 'models/Event'
import CoursesListStyles, { BoxContent, LecturePreview } from 'components/CoursesList/CoursesList.style'

type EventBoxProps = {
  organisation: Organisation;
  event: Event;
}

const EventBox: React.FC<EventBoxProps> = ({ organisation, event }) => {
  return (
    <CoursesListStyles.Box as={"a"} href={generateEventRoute(organisation.id, event.course_id, event.id)}>
      <LecturePreview>
        <p>{event.name}</p>
      </LecturePreview>
      <BoxContent>
        <p><b>
          <FontAwesomeIcon icon={event.getIcon()} />&nbsp;&nbsp;
          {event.getTypeLabel()}
        </b></p>
        <p>{event.description}</p>
        {/*<CaptionUppercase>{event.getStartDate()} - {event.getEndDate()}</CaptionUppercase>*/}
      </BoxContent>
    </CoursesListStyles.Box>
  )
}

export default EventBox