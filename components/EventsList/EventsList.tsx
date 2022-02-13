import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'
import React from 'react'
import Alert from 'components/Alert/Alert'
import useAuthContext from 'contexts/AuthContext'
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

  const { authState, membership } = useAuthContext();

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

      <pre>{JSON.stringify(authState, null, 2)}</pre>

      {membership.hasStaffPermissionForCourse(course) && (
        <Alert title={"You have staff permission to edit this course."} icon={faClipboard}>
          <p>You have permission to add events, resources and links, and manage discussion within this course.</p>
        </Alert>
      )}

      {membership.hasStudentMembershipToCourse(course) && (
        <Alert title={"You are enrolled in this course."} icon={faGraduationCap}>
          <p>You are enrolled in this course. You can comment in discussions and events will display in your feed.</p>
        </Alert>
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