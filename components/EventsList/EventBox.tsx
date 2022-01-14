import Organisation from 'models/Organisation'
import React from 'react'
import { Spacer, Grid, CaptionUppercase } from 'components/GlobalStyles'
import { EVENT_ROUTE } from 'constants/navigation'
import Event from 'models/Event'
import CoursesListStyles, { BoxContent, LecturePreview } from 'components/CoursesList/CoursesList.style'

type EventBoxProps = {
  organisation: Organisation;
  // course: Course;
  event: Event;
}

const EventBox: React.FC<EventBoxProps> = ({ organisation, event }) => {

  let href = EVENT_ROUTE
    .replace('[organisationId]', organisation.id)
    .replace('[courseId]', event.course_id)
    .replace('[eventId]', event.id);

  return (
    <CoursesListStyles.Box as={"a"} href={href}>
      <LecturePreview>
        <p>{event.name}</p>
      </LecturePreview>
      <BoxContent>
        <p>{event.description}</p>
        {/*<CaptionUppercase>{event.getStartDate()} - {event.getEndDate()}</CaptionUppercase>*/}
      </BoxContent>
    </CoursesListStyles.Box>
  )
}

export default EventBox