import useAuthContext from 'contexts/AuthContext'
import React from 'react'
import useGetCourse from 'classroomapi/useGetCourse'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { generateOrganisationRoute, HOME_ROUTE } from 'constants/navigation'
import useGetEvents from 'classroomapi/useGetEvents'
import EventBox from 'components/EventsList/EventBox'
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import { CaptionUppercase, Grid, Spacer } from 'components/GlobalStyles'
import Loader from 'components/Loader/Loader'
import CoursesListStyles from 'components/CoursesList/CoursesList.style'
import useGetOrganisation from 'classroomapi/useGetOrganisation'
import Event from 'models/Event'

type EventsListProps = {
  organisationId: string;
  courseId: string;
}

const EventsList: React.FC<EventsListProps> = ({ organisationId, courseId }) => {

  const { membership } = useAuthContext();

  const {
    data: organisation,
    loading: organisationLoading
  } = useGetOrganisation({ organisationId });
  const {
    data: course,
    loading: courseLoading
  } = useGetCourse({ courseId });
  const {
    data: events,
    loading: eventsLoading
  } = useGetEvents({ courseId });

  if (organisationLoading || courseLoading || eventsLoading) {
    return (
      <ContentCenterInPage>
        <Loader />
      </ContentCenterInPage>
    )
  }

  if (!organisation || !course || !events) {
    return (
      <ContentCenterInPage>
        <p>Error</p>
      </ContentCenterInPage>
    )
  }

  return (
    <CoursesListStyles.Container>
      <Breadcrumbs items={[
        { label: "Home", url: HOME_ROUTE },
        { label: organisation.name, url: generateOrganisationRoute(organisation.id) },
        { label: "Courses" },
      ]} />
      <h2>{course.name}</h2>
      <CaptionUppercase>{course.id}</CaptionUppercase>

      {membership.hasStaffPermissionForCourse(course) && (
        <p>You have staff permission to edit this course.</p>
      )}
      {membership.hasStudentMembershipToCourse(course) && (
        <p>You are registered as a student to this course.</p>
      )}

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