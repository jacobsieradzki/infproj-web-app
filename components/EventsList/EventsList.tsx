import React from 'react'
import useAuthContext from 'contexts/AuthContext'
import useGetEvents from 'classroomapi/useGetEvents'
import NewEventBox from 'components/EventsList/NewEventBox'
import EventBox from 'components/EventsList/EventBox'
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import CoursesListStyles from 'components/CoursesList/CoursesList.style'
import Organisation from 'models/Organisation'
import Course from 'models/Course'
import Event from 'models/Event'
import Loader from 'components/Loader/Loader'

type EventsListProps = {
  organisation: Organisation;
  course: Course;
}

const EventsList: React.FC<EventsListProps> = ({ organisation, course }) => {

  const { isLoggedIn } = useAuthContext();

  const { data: events, loading } = useGetEvents({ courseId: course.id });

  if (loading) {
    return (
      <ContentCenterInPage>
        <Loader />
      </ContentCenterInPage>
    )
  }

  if (!events) {
    return (
      <ContentCenterInPage>
        <p>Error</p>
      </ContentCenterInPage>
    )
  }

  return (
    <CoursesListStyles.Container>
      <CoursesListStyles.Grid>
        {events?.map(event =>
          <EventBox key={event.id} organisation={organisation} event={new Event(event)} />
        )}
      </CoursesListStyles.Grid>
    </CoursesListStyles.Container>
  )
}

export default EventsList