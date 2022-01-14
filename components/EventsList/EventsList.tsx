import useGetEvents from 'api/useGetEvents'
import EventBox from 'components/EventsList/EventBox'
import React from 'react'
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import CourseBox from 'components/CoursesList/CourseBox'
import { Grid } from 'components/GlobalStyles'
import Loader from 'components/Loader/Loader'
import CoursesListStyles from 'components/CoursesList/CoursesList.style'
import useGetCoursesForOrganisation from 'api/useGetCoursesForOrganisation'
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
    data: events,
    loading: eventsLoading,
    error: eventsError
  } = useGetEvents({ courseId });



  if (organisationLoading || eventsLoading) {
    return (
      <ContentCenterInPage>
        <Loader />
      </ContentCenterInPage>
    )
  }

  return (
    <CoursesListStyles.Container>
      <h2>{organisation.name}</h2>
      <Grid.Container>
        {events?.map(event =>
          <EventBox key={event.id} organisation={organisation} event={new Event(event)} />
        )}
      </Grid.Container>
    </CoursesListStyles.Container>
  )
}

export default EventsList