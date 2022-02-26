import React, { useState } from 'react'
import CourseAddButton from 'components/CoursesList/CourseAddButton'
import useAuthContext from 'contexts/AuthContext'
import useGetCourse from 'classroomapi/useGetCourse'
import EventsList from 'components/EventsList/EventsList'
import { StaffCourseMembershipAlert, StudentCourseEnrollmentAlert } from 'components/Membership/MembershipAlerts'
import useGetOrganisation from 'classroomapi/useGetOrganisation'
import { ContentCenterInPage } from 'components/AppLayout/AppLayout.style'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { HorizontalStack, Spacer } from 'components/GlobalStyles'
import Loader from 'components/Loader/Loader'
import { TabItem } from 'components/Resource/ResourceContainer'
import ResourceStyles from 'components/Resource/ResourceContainer.style'
import { generateOrganisationRoute, HOME_ROUTE } from 'constants/navigation'

interface CourseScreen {
  organisationId: string;
  courseId: string;
}

const CourseScreen: React.FC<CourseScreen> = ({ organisationId, courseId }) => {

  const { isLoggedIn, membership } = useAuthContext();

  const [tab, setTab] = useState("EVENTS");

  const {
    data: organisation,
    loading: organisationLoading
  } = useGetOrganisation({ organisationId });
  const {
    data: course,
    loading: courseLoading
  } = useGetCourse({ courseId });

  if (organisationLoading || courseLoading) {
    return (
      <ContentCenterInPage>
        <Loader />
      </ContentCenterInPage>
    )
  }

  if (!organisation || !course) {
    return (
      <ContentCenterInPage>
        <p>Error</p>
      </ContentCenterInPage>
    )
  }

  let showAdd = membership.hasStaffPermissionForCourse(course);

  return (
    <ResourceStyles.Container>
      <ResourceStyles.Content>
        <ResourceStyles.Header>
          <Breadcrumbs items={[
            { label: "Home", url: HOME_ROUTE },
            { label: organisation.name, url: generateOrganisationRoute(organisation.id) },
            { label: "Courses", url: generateOrganisationRoute(organisation.id) },
            { label: course?.id },
          ]} />

          <h1>{course.name}</h1>

          <HorizontalStack gap={16}>
            <TabItem compact tabId={"EVENTS"} {...{ tab, setTab }}>
              Events
            </TabItem>
            <TabItem compact tabId={"RESOURCES"} {...{ tab, setTab }}>
              Resources
            </TabItem>
            <Spacer />
            {showAdd && <CourseAddButton {...{ organisationId, courseId }} />}
          </HorizontalStack>

          {tab === "EVENTS" && <EventsList organisation={organisation} course={course} />}

        </ResourceStyles.Header>
      </ResourceStyles.Content>

      {isLoggedIn && <ResourceStyles.Column>
        <ResourceStyles.ColumnContent>
          <StudentCourseEnrollmentAlert value={course} />
          <StaffCourseMembershipAlert value={course} />
        </ResourceStyles.ColumnContent>
      </ResourceStyles.Column>}
    </ResourceStyles.Container>
  )
}

export default CourseScreen