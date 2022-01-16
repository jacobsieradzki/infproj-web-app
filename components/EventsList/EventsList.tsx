import useGetCourse from 'api/useGetCourse'
import React from 'react'
import useGetEvents from 'api/useGetEvents'
import EventBox from 'components/EventsList/EventBox'
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import { CaptionUppercase, Grid, Spacer } from 'components/GlobalStyles'
import Loader from 'components/Loader/Loader'
import CoursesListStyles from 'components/CoursesList/CoursesList.style'
import useGetOrganisation from 'api/useGetOrganisation'
import Event from 'models/Event'

type EventsListProps = {
  organisationId: string;
  courseId: string;
}

const EventsList: React.FC<EventsListProps> = ({ organisationId, courseId }) => {

  const {
    data: organisation,
    loading: organisationLoading,
    error: organisationError
  } = useGetOrganisation({ organisationId });
  const {
    data: course,
    loading: courseLoading,
    error: courseError
  } = useGetCourse({ courseId });
  const {
    data: events,
    loading: eventsLoading,
    error: eventsError
  } = useGetEvents({ courseId });



  if (organisationLoading || courseLoading || eventsLoading) {
    return (
      <ContentCenterInPage>
        <Loader />
      </ContentCenterInPage>
    )
  }

  return (
    <CoursesListStyles.Container>
      <CaptionUppercase>{organisation.name}</CaptionUppercase>
      <h2>{course.name}</h2>
      <CaptionUppercase>{course.id}</CaptionUppercase>

      <Spacer height={32} />

      <Grid.Container>
        {events?.map(event =>
          <EventBox key={event.id} organisation={organisation} event={new Event(event)} />
        )}
      </Grid.Container>
    </CoursesListStyles.Container>
  )
}

export default EventsList